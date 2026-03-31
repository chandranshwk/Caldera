import { Mark, mergeAttributes } from "@tiptap/core";

/**
 * This block is essential for TypeScript to recognize your custom command
 * within the editor's command chain (editor.chain().focus()...)
 */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    inlineQuote: {
      /**
       * Toggle an inline quote mark
       */
      toggleInlineQuote: () => ReturnType;
    };
  }
}

export const InlineQuote = Mark.create({
  name: "inlineQuote",

  parseHTML() {
    return [{ tag: 'span[data-type="inline-quote"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-type": "inline-quote",
        class: "inline-quote",
      }),
      0,
    ];
  },

  addCommands() {
    return {
      toggleInlineQuote:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});
