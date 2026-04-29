import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
    } catch (err) {
      console.error("Error calling logout API", err);
    }
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-pink-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-pink-200">
            N
          </div>
          <span className="text-xl font-black text-slate-800 uppercase tracking-tighter">
            Creaciones Normita
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive
                  ? "text-pink-600 border-b-2 border-pink-500 pb-1"
                  : "text-slate-500 hover:text-pink-600"
              }`
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/productos"
            className={({ isActive }) =>
              `text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive
                  ? "text-pink-600 border-b-2 border-pink-500 pb-1"
                  : "text-slate-500 hover:text-pink-600"
              }`
            }
          >
            Productos
          </NavLink>
          <NavLink
            to="/nosotros"
            className={({ isActive }) =>
              `text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive
                  ? "text-pink-600 border-b-2 border-pink-500 pb-1"
                  : "text-slate-500 hover:text-pink-600"
              }`
            }
          >
            Nosotros
          </NavLink>
          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              `text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive
                  ? "text-pink-600 border-b-2 border-pink-500 pb-1"
                  : "text-slate-500 hover:text-pink-600"
              }`
            }
          >
            Contacto
          </NavLink>
          <NavLink
            to="/ordenar"
            className={({ isActive }) =>
              `text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive
                  ? "text-pink-600 border-b-2 border-pink-500 pb-1"
                  : "text-slate-500 hover:text-pink-600"
              }`
            }
          >
            Como Ordenar?
          </NavLink>
          {user?.role === "Administrador" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `text-sm font-bold uppercase tracking-widest transition-colors ${
                  isActive
                    ? "text-pink-600 border-b-2 border-pink-500 pb-1"
                    : "text-slate-500 hover:text-pink-600"
                }`
              }
            >
              Panel Admin
            </NavLink>
          )}
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm font-medium text-slate-700 hidden lg:inline-block">
                Hola, <span className="font-bold text-pink-600">{user.nombre}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-slate-800 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-md"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="bg-pink-500 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-pink-600 transition-all shadow-md"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
