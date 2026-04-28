import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import Whatsapp from "./components/Whatsapp.jsx";
import Ordenar from "./pages/Ordenar.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50/50">
        {/* Header / Navbar */}
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
            </nav>
            <button className="bg-pink-500 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-pink-600 transition-all shadow-md">
              Login
            </button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/ordenar" element={<Ordenar/>} />
        </Routes>

        <footer>
          <div className="bg-gradient-to-r from-pink-50 via-white to-purple-50 border-t border-pink-100 mt-20">
            <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-5 gap-12 text-gray-700 items-start">
              <div className="lg:col-span-2 space-y-4 text-center lg:text-left">
                <img
                  src="/logo.png"
                  alt="Creaciones Normita"
                  className="h-24 w-auto mx-auto lg:mx-0"
                />

                <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                  Creaciones Normita es una boutique especializada en vestidos
                  únicos y elegantes, pensados para resaltar tu belleza en cada
                  momento especial ✨.
                </p>

                <p className="text-xs text-gray-400 mt-6">
                  © Creaciones Normita 
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4 uppercase tracking-wide text-sm">
                  Acerca de
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <NavLink
                      href="nosotros"
                      className="hover:text-pink-500 transition"
                    >
                      Nuestra historia
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      href="contacto"
                      className="hover:text-pink-500 transition"
                    >
                      Contáctenos
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4 uppercase tracking-wide text-sm">
                  Preguntas frecuentes
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="#" className="hover:text-pink-500 transition">
                      Cómo ordenar
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-500 transition">
                      Localizador de tiendas
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-500 transition">
                      Guía de tallas
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4 uppercase tracking-wide text-sm">
                  Conéctate
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>
                    <a
                      href="https://www.facebook.com/creacionesnormita.sv"
                      target="_blank"
                      className="flex items-center gap-2 hover:text-pink-500 transition"
                    >
                      <i className="bi bi-facebook"></i> Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      className="flex items-center gap-2 hover:text-pink-500 transition"
                    >
                      <i className="bi bi-instagram"></i> Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/50376970004"
                      target="_blank"
                      className="flex items-center gap-2 hover:text-pink-500 transition"
                    >
                      <i className="bi bi-whatsapp"></i> WhatsApp
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:contacto@creacionesnormita.sv"
                      className="flex items-center gap-2 hover:text-pink-500 transition"
                    >
                      <i className="bi bi-envelope-fill"></i> Email
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>

        <Whatsapp />
      </div>
    </Router>
  );
}

export default App;
