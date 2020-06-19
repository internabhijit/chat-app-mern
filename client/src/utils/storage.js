export function getFromStorage(key) {
  if (!key) return null;

  const valueStr = localStorage.getItem(key);
  if (valueStr) {
    let key = JSON.parse(valueStr);

    return key?.token;
  }

  return null;
}

export function setInStorage(key, obj) {
  if (!key) {
    console.error("Error: Key is missing");
  }

  localStorage.setItem(key, JSON.stringify(obj));
}
