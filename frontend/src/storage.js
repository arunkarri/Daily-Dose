
function set(key, value) {
  return sessionStorage.setItem(key, value);
}

function get(key) {
  return sessionStorage.getItem(key);
}

function remove(key) {
  return sessionStorage.removeItem(key);
}

function clear() {
  return sessionStorage.clear();
}

export default { set, get, remove, clear };
