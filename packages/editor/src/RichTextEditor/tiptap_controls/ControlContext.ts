import type { Editor } from "@tiptap/react";
import { createSafeContext } from "@rtdui/core";
import type { ControlLabels } from "./constrolLabels";

interface ControlContext {
  editor: Editor;
  labels: ControlLabels;
}

export const [EditorProvider, useEditorContext] =
  createSafeContext<ControlContext>("Editor was not found in tree");
