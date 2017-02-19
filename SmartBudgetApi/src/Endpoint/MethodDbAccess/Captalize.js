function capitalize() {
  const text = this;
  return text
    ? [text[0].toUpperCase(), text.slice(1)].join('')
    : text;
}

String.prototype.capitalize = capitalize;
