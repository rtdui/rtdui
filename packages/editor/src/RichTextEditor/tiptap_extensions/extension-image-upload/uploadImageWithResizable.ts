import { Node, mergeAttributes, nodeInputRule } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageResizeComponent from "./ImageResizableComponent";

export interface ImageOptions {
  inline: boolean;
  /**
   * 用户是否可以拖拉缩放图片
   */
  resizable: boolean;
  /**
   * 上传的url
   */
  url: string;
  /**
   * 文件上传时使用的HTTP Method
   */
  method: string;
  /**
   * 图片的最大宽度约束, 原图片超出该宽度会自动压缩, 默认320
   */
  maxWidth: number;
  /**
   * 图片的最大高度约束, 原图片超出该高度会自动压缩, 默认180
   */
  maxHeight: number;
  /**
   * 压缩后的文件的输出质量, 取值范围0-1,默认0.7
   */
  quality: number;
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    image: {
      //外链图片
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
      }) => ReturnType;
      //上传本地图片
      uploadImage: (options: { alt?: string; title?: string }) => ReturnType;
    };
  }
}

/**
 * 根据约束条件计算并返回新的宽度和高度元组
 * @param img
 * @param maxWidth
 * @param maxHeight
 * @returns
 */
function calculateSize(
  img: HTMLImageElement,
  maxWidth: number,
  maxHeight: number
) {
  let width = img.naturalWidth;
  let height = img.naturalHeight;

  // 以原图中宽度和高度中最大的那个作为条件
  if (width > height) {
    // 原图宽度超出最大宽度时
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width); // 保持宽高比
      width = maxWidth;
    }
  } else if (height > maxHeight) {
    width = Math.round((width * maxHeight) / height); // 保持宽高比
    height = maxHeight;
  }
  return [width, height];
}

/**
 * 压缩图像尺寸
 * @param file 原始文件
 * @param options 扩展配置选项
 */
function processImage(
  file: File,
  options: ImageOptions,
  cb: (file: File, newWidth: number, newHeight: number) => void
) {
  const { maxWidth, maxHeight, quality } = options;
  const fileObjectURL = URL.createObjectURL(file); //创建ObjectURL

  const img = new Image(); // 等价于document.createElement('img')
  img.src = fileObjectURL;
  img.onerror = () => {
    URL.revokeObjectURL(fileObjectURL); //释放掉ObjectURL
    // eslint-disable-next-line no-console
    console.log("无法加载图像");
  };
  img.onload = () => {
    URL.revokeObjectURL(fileObjectURL); //释放掉ObjectURL
    const [newWidth, newHeight] = calculateSize(img, maxWidth, maxHeight); //确定输出图片的尺寸

    // 未超出约束的最大尺寸则不作压缩处理.
    if (img.width === newWidth && img.height === newHeight) {
      cb(file, newWidth, newHeight);
      return;
    }

    // 超出最大尺寸进行压缩处理
    const canvas = document.createElement("canvas"); // 使用canvas压缩图片尺寸
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, newWidth, newHeight); // 将img元素画到canvas
    // 将canvas输出为blod, canvas会使用图片的显示尺寸输出, 从而实现了压缩图片的目的
    canvas.toBlob(
      (blob) => {
        const newFile = new File([blob!], file.name, { type: file.type });
        cb(newFile, newWidth, newHeight);
      },
      file.type,
      quality
    );
  };
}

let input: HTMLInputElement;

// Markdown嵌入图片的语法: ![图片alt](图片链接 "图片title")
export const inputRegex =
  /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

export const UploadImageWithResizable = Node.create<ImageOptions>({
  name: "image",

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: true,

  // 扩展配置选项
  addOptions() {
    return {
      inline: false,
      resizable: true,
      url: "", // 上传的地址
      method: "post",
      maxWidth: 320,
      maxHeight: 180,
      quality: 0.7,
      HTMLAttributes: {},
    };
  },
  // node特性
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img[src]", // 没有src特性的img标签, 由于没有任何Node可以接收它. 因此会被编辑器忽略.
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageResizeComponent);
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
      uploadImage:
        (options) =>
        ({ chain }) => {
          if (!input) {
            input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = async (ev: Event) => {
              const file = (ev.target as HTMLInputElement).files![0];
              if (file) {
                // 在上传前对图片进行压缩处理
                processImage(
                  file,
                  this.options,
                  async (newFile, newWidth, newHeight) => {
                    const formData = new FormData();
                    formData.append("upload", newFile);
                    if (!this.options.url)
                      throw new Error(
                        "no configure 'url' for UploadImage extension"
                      );
                    // 上传
                    const res = await fetch(this.options.url, {
                      method: this.options.method,
                      body: formData,
                    });
                    const result = await res.json();
                    this.editor
                      .chain()
                      .focus()
                      .insertContent({
                        type: this.name,
                        attrs: {
                          src: result.imageUrl,
                          alt: options.alt ?? newFile.name,
                          title: options.title ?? newFile.name,
                          width: newWidth,
                          height: newHeight,
                        },
                      })
                      .run();
                  }
                );
              }
            };
          }
          input.click();
          return true;
        },
    };
  },

  // 支持 MarkDown 图片语法输入规则
  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title] = match;

          return { src, alt, title };
        },
      }),
    ];
  },
});
