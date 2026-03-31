import { Mark, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    inlineList: {
      /**
       * Toggle an inline list mark
       */
      toggleInlineList: () => ReturnType;
    };
  }
}

export const InlineList = Mark.create({
  name: "inlineList",

  parseHTML() {
    return [{ tag: 'span[data-type="inline-list"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-type": "inline-list",
        class: "inline-list-item",
      }),
      0,
    ];
  },

  addCommands() {
    return {
      toggleInlineList:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});
