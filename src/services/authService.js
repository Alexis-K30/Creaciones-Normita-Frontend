/**
 * Servicio de autenticación simulado usando localStorage
 * Permite registrar y hacer login sin necesidad de backend
 */

const USERS_KEY = "creaciones_normita_users";

// Obtener todos los usuarios almacenados
const getStoredUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Guardar usuarios en localStorage
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Registrar un nuevo usuario
export const registerUser = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getStoredUsers();

      // Validar que el username no exista
      if (users.some((u) => u.username === userData.username)) {
        reject(new Error("El nombre de usuario ya existe"));
        return;
      }

      // Validar que el email no exista
      if (users.some((u) => u.email === userData.email)) {
        reject(new Error("El email ya está registrado"));
        return;
      }

      // Crear nuevo usuario
      const newUser = {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        password: userData.password, // En producción debería estar hasheada
        nombre: userData.nombre,
        pais: userData.pais,
        role: "Usuario",
        fechaCreacion: new Date().toISOString(),
      };

      users.push(newUser);
      saveUsers(users);

      resolve({
        message: "Usuario registrado exitosamente",
        username: newUser.username,
      });
    }, 500); // Simular delay de red
  });
};

// Login
export const loginUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getStoredUsers();
      const user = users.find((u) => u.email === email);

      if (!user) {
        reject(new Error("Usuario o contraseña incorrecta"));
        return;
      }

      if (user.password !== password) {
        reject(new Error("Usuario o contraseña incorrecta"));
        return;
      }

      // Simular un token JWT
      const token = btoa(`${user.email}:${Date.now()}`);

      resolve({
        token,
        username: user.username,
        nombre: user.nombre,
        role: user.role,
        expiration: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      });
    }, 500); // Simular delay de red
  });
};
