# Rtdui

[![NPM license](https://img.shields.io/npm/l/@rtdui/core)](https://github.com/rtdui/rtdui/blob/main/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/rtdui/rtdui)](https://github.com/rtdui/rtdui/graphs/contributors)
[![NPM version](https://img.shields.io/npm/v/@rtdui/core)](https://www.npmjs.com/package/@rtdui/core)
[![NPM downloads](https://img.shields.io/npm/dm/@rtdui/hooks)](https://www.npmjs.com/package/@rtdui/hooks)
[![Help wanted](https://img.shields.io/github/labels/rtdui/rtdui/help%20wanted?label=Contribute)](https://github.com/rtdui/rtdui/labels/help%20wanted)

## Links

- [Documentation](https://rtdui.com/)
- [Ask question or give feedback](https://github.com/rtdui/rtdui/discussions)
- [Changelog](https://rtdui.com/changelog)

## Packages

This monorepo with a collection of packages:

- `@rtdui/hooks` – collection of 50+ hooks for state and UI management
- [`@rtdui/core`](https://rtdui.com/) – core components library – 100+ components, exports everything from `@rtdui/core`
- `@rtdui/code-highlight` – [deprecated] code highlight built with `prism.js`
- [`@rtdui/shiki-highlight`](https://rtdui.com/components/shikihighlight) – code highlight built with `shiki`
- [`@rtdui/dates`](https://rtdui.com/components/dates_about) – date,time,datetime,month,year pickers
- [`@rtdui/datatable`](https://rtdui.com/components/datatable_about) – a fully featured data table
- [`@rtdui/dialogs`](https://rtdui.com/components/dialog) – a fully featured imperative dialogs system
- [`@rtdui/notifications`](https://rtdui.com/components/notification) – a fully featured imperative notifications system
- [`@rtdui/editor`](https://rtdui.com/components/editor) – a rich text editor
- [`@rtdui/md-editor`](https://rtdui.com/components/mdeditor) – a Markdown editor component like VSCode built-in markdown editor and a viewer component for rendering markdown
- [`@rtdui/qr-code`](https://rtdui.com/components/qrcode) – qr code generator
- [`@rtdui/signature-pad`](https://rtdui.com/components/signaturepad) – handwritten signature pad
- [`@rtdui/tailwind-plugin`](https://rtdui.com/install) – tailwindCSS plugin

## v6 使用react v19新语法

v6 版本最低支持的React版本为 v19,

react v19 除引入服务端组件和服务端函数功能外, 对于客户端组件开发:

- `ref`直接作为属性, 不再需要`forwardRef`包装
- `<Context>`直接作为提供器, 不再需要`<Context.Provider>`
- 新Hooks
  - `const [isPending, startTransition] = useTransition()`
    `useTransition`是自动化的处理非表单形式的通用Action的过渡, 自动化的处理更新时的过渡状态(pending states)
  - `const [state, dispatchAction, isPending] = useActionState(reducerAction, initialState, permalink?);`
    `useActionState`是专门针对form表单Action的`useTransition`的易用形式, 自动化的处理表单提交时的过渡时的状态: 待定状态(pending states), 提交错误(errors), 乐观更新(optimistic updates)
- 新API
  - `const value = use(resource);`
    `use`API用于读取 Promise 或 context 的值,`use`可以替代`useContext`hook
    `use`是 API 不是 hooks, `use`可以在循环中或条件语句中调用。但只能在 render 中调用, 且只能在组件或 Hook 的直接范围内调用(间接不行, 如在嵌套函数内), `use`不能在try-catch块中调用
- `<title>`、`<link>`、`<meta>`会自动提升到文档的`<head>`节
  也就是说`<title>`、`<link>`、`<meta>`可以放置在任意组件的任意位置, 最终React会把它们放置到合适的位置

## Contributors

<a href="https://github.com/rtdui/rtdui/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=rtdui/rtdui" />
</a>

## License

MIT
