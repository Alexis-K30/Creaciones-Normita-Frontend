import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8082/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = {
          nombre: data.username,
          role: data.role
        };
        login(userData, data.token);
        navigate(data.role === "Administrador" ? "/admin" : "/");
      } else {
        setError(data.message || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl shadow-pink-100 border border-pink-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full -mr-16 -mt-16 z-0"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-50 rounded-full -ml-12 -mb-12 z-0"></div>
        
        <div className="relative z-10 text-center">
          <div className="mx-auto w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-pink-200 mb-6">
            N
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Bienvenida de nuevo</h2>
          <p className="mt-2 text-slate-500 font-medium">Ingresa tus credenciales para continuar</p>
        </div>

        <form className="mt-8 space-y-6 relative z-10" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-bold border border-red-100 animate-pulse">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Email</label>
              <input
                type="email"
                required
                className="block w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-slate-700 font-medium focus:ring-2 focus:ring-pink-500 transition-all outline-none"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Contraseña</label>
              <input
                type="password"
                required
                className="block w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-slate-700 font-medium focus:ring-2 focus:ring-pink-500 transition-all outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-slate-300 rounded cursor-pointer"
              />
              <label className="ml-2 block text-slate-500 font-medium cursor-pointer">Recordarme</label>
            </div>
            <a href="#" className="font-bold text-pink-600 hover:text-pink-700 transition">¿Olvidaste tu contraseña?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black uppercase tracking-widest rounded-2xl text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all shadow-xl shadow-pink-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>

          <p className="text-center text-sm font-medium text-slate-500">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="font-black text-pink-600 hover:text-pink-700 transition">
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
