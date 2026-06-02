import type { Editor } from "@tiptap/react";
import { createSafeContext } from "@rtdui/core";
import type { ControlLabels } from "./constrolLabels";

interface EditorContextValue {
  editor: Editor;
  labels: ControlLabels;
}

export const [EditorContext, useEditorContext] =
  createSafeContext<EditorContextValue>("Editor was not found in tree");
