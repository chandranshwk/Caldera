import { Mark, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    inlineNumber: {
      toggleInlineNumber: () => ReturnType;
    };
  }
}

export const InlineNumber = Mark.create({
  name: "inlineNumber",

  parseHTML() {
    return [{ tag: 'span[data-type="inline-number"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-type": "inline-number",
        class: "inline-number",
      }),
      0,
    ];
  },

  addCommands() {
    return {
      toggleInlineNumber:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});
