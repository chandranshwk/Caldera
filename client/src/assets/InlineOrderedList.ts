import { Mark, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    inlineOrderedList: {
      /** Toggle an inline numbered list mark */
      toggleInlineOrderedList: () => ReturnType;
    };
  }
}

export const InlineOrderedList = Mark.create({
  name: "inlineOrderedList",

  parseHTML() {
    return [{ tag: 'span[data-type="inline-ol"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-type": "inline-ol",
        class: "inline-ol-item",
      }),
      0,
    ];
  },

  addCommands() {
    return {
      toggleInlineOrderedList:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});
