export function sourceImg(source) {
  return `http://localhost:3100${source}`;
}
export function sourceImgUpload(source) {
  return `http://localhost:3100/upload/${source}`;
}
export function defaultImg() {
  return `http://localhost:3100/upload/default.jpg`;
}
