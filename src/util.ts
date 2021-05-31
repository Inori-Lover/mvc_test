export function id() {
  return `${Date.now()}` + `${Math.random()}`.replace("0.", "");
}
