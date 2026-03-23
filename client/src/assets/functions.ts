export const getInitials = (name?: string) => {
  if (name) {
    const nameLength = name.length;
    let last = "";
    if (name.charAt(nameLength / 2) !== " ") last = name.charAt(nameLength / 2);
    else last = name.charAt(nameLength / 2 + 1);
    const first = name.charAt(0);
    return first + last;
  }
};
