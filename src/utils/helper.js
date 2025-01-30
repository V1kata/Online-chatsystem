export function toTitleCase(str) {
    const text = str.split("/")[2];
    return text
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}
