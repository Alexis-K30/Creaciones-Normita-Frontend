import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import Whatsapp from "./components/Whatsapp.jsx";
import Ordenar from "./pages/Ordenar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import Header from "./components/Header.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50/50">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/ordenar" element={<Ordenar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPanel />} />
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
                      <a
                        href="/nosotros"
                        className="hover:text-pink-500 transition"
                      >
                        Nuestra historia
                      </a>
                    </li>
                    <li>
                      <a
                        href="/contacto"
                        className="hover:text-pink-500 transition"
                      >
                        Contáctenos
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 uppercase tracking-wide text-sm">
                    Preguntas frecuentes
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>
                      <a href="/ordenar" className="hover:text-pink-500 transition">
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
                        rel="noreferrer"
                        className="flex items-center gap-2 hover:text-pink-500 transition"
                      >
                        <i className="bi bi-facebook"></i> Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 hover:text-pink-500 transition"
                      >
                        <i className="bi bi-instagram"></i> Instagram
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://wa.me/50376970004"
                        target="_blank"
                        rel="noreferrer"
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
    </AuthProvider>
  );
}

export default App;
