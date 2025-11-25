
const ADMIN_USER = {
    username: "Erick",
    password: "123",
    role: "admin"
  };
  

  export function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
  }
  
  export function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }
  
  
  export function createUser(username, password) {
    const users = getUsers();
  
    if (users.find(u => u.username === username)) {
      return { error: "Nome de usuário já existe." };
    }
  
    const newUser = {
      username,
      password,
      cart: []
    };
  
    users.push(newUser);
    saveUsers(users);
  
    return { success: true };
  }
  

  export function loginUser(username, password) {
  
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      localStorage.setItem("currentUser", JSON.stringify(ADMIN_USER));
      return { success: true, admin: true };
    }
  
  
    const users = getUsers();
    const user = users.find(
      u => u.username === username && u.password === password
    );
  
    if (!user) return { error: "Usuário ou senha inválidos." };
  
    localStorage.setItem("currentUser", JSON.stringify(user));
  
    return { success: true, admin: false };
  }
  

  export function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  }
  
  export function logoutUser() {
    localStorage.removeItem("currentUser");
  }
  

  export function getUserCart(username) {
    if (username === "Erick") return [];
  
    const users = getUsers();
    const user = users.find(u => u.username === username);
  
    return user ? user.cart || [] : [];
  }
  
  export function saveUserCart(username, cart) {
    if (username === "Erick") return;
  
    const users = getUsers();
    const user = users.find(u => u.username === username);
  
    if (user) {
      user.cart = cart;
      saveUsers(users);
    }
  }
  
  export function getActiveCart() {
    const current = getCurrentUser();
    if (!current) return [];
  
    return getUserCart(current.username);
  }
  
  export function saveActiveCart(cart) {
    const current = getCurrentUser();
    if (!current) return;
  
    saveUserCart(current.username, cart);
  }
  