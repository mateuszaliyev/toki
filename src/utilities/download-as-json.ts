export const downloadAsJson = <Value>(value: Value, fileName: string) => {
  const data = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(value)
  )}`;
  const anchor = document.createElement("a");
  anchor.download = fileName;
  anchor.href = data;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
};
