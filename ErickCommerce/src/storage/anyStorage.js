// src/storage/anyStorage.js

// ======================
// LIXEIRA (já existia)
// ======================
const DELETED_KEY = "deleted_products_v1";

// retorna lista de IDs deletados
export function getDeletedProducts() {
  return JSON.parse(localStorage.getItem(DELETED_KEY) || "[]");
}

// adiciona um ID à lixeira
export function addDeletedProduct(id) {
  const list = getDeletedProducts();
  const newList = [...new Set([...list, id])];
  localStorage.setItem(DELETED_KEY, JSON.stringify(newList));
}

// remove da lixeira
export function restoreProduct(id) {
  const list = getDeletedProducts().filter((x) => x !== id);
  localStorage.setItem(DELETED_KEY, JSON.stringify(list));
}

export function isDeleted(id) {
  return getDeletedProducts().includes(id);
}



// ======================
// SISTEMA DE USUÁRIOS
// ======================
const USERS_KEY = "users_db_v1";
const LOGGED_KEY = "user_logged_v1";

// lista de usuários
export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

// adiciona um usuário
export function addUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// salva usuário logado
export function setLoggedUser(user) {
  localStorage.setItem(LOGGED_KEY, JSON.stringify(user));
}

// retorna usuário logado
export function getLoggedUser() {
  return JSON.parse(localStorage.getItem(LOGGED_KEY) || "null");
}

// logout
export function logoutUser() {
  localStorage.removeItem(LOGGED_KEY);
}

// verifica login
export function isUserLogged() {
  return Boolean(localStorage.getItem(LOGGED_KEY));
}
