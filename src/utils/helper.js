export function toTitleCase(str) {
    const text = str.split("/")[2] ?? str.split("/")[1];
    return text
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}
