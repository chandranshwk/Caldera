import { Mark, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    inlineBullet: {
      toggleInlineBullet: () => ReturnType;
    };
  }
}

export const InlineBullet = Mark.create({
  name: "inlineBullet",

  parseHTML() {
    return [{ tag: 'span[data-type="inline-bullet"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-type": "inline-bullet",
        class: "inline-bullet",
      }),
      0,
    ];
  },

  addCommands() {
    return {
      toggleInlineBullet:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});
