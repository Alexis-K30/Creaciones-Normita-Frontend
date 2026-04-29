import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nombre: "",
    pais: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Error al registrarse");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl shadow-pink-100 border border-pink-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full -mr-16 -mt-16 z-0"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-50 rounded-full -ml-12 -mb-12 z-0"></div>
        
        <div className="relative z-10 text-center">
          <div className="mx-auto w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-pink-200 mb-6">
            N
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Crea tu cuenta</h2>
          <p className="mt-2 text-slate-500 font-medium">Únete a nuestra comunidad de elegancia</p>
        </div>

        <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10" onSubmit={handleSubmit}>
          {error && (
            <div className="col-span-full bg-red-50 text-red-500 p-4 rounded-xl text-sm font-bold border border-red-100 animate-pulse">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Nombre Completo</label>
              <input
                name="nombre"
                type="text"
                required
                className="block w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-slate-700 font-medium focus:ring-2 focus:ring-pink-500 transition-all outline-none"
                placeholder="Ej. María Pérez"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Usuario</label>
              <input
                name="username"
                type="text"
                required
                className="block w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-slate-700 font-medium focus:ring-2 focus:ring-pink-500 transition-all outline-none"
                placeholder="mariap"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Email</label>
              <input
                name="email"
                type="email"
                required
                className="block w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-slate-700 font-medium focus:ring-2 focus:ring-pink-500 transition-all outline-none"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">País</label>
              <input
                name="pais"
                type="text"
                required
                className="block w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-slate-700 font-medium focus:ring-2 focus:ring-pink-500 transition-all outline-none"
                placeholder="Ej. El Salvador"
                value={formData.pais}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Contraseña</label>
              <input
                name="password"
                type="password"
                required
                className="block w-full px-5 py-4 bg-slate-50 border-none rounded-2xl text-slate-700 font-medium focus:ring-2 focus:ring-pink-500 transition-all outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-span-full pt-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black uppercase tracking-widest rounded-2xl text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all shadow-xl shadow-pink-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registrando..." : "Crear Cuenta"}
            </button>

            <p className="mt-6 text-center text-sm font-medium text-slate-500">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="font-black text-pink-600 hover:text-pink-700 transition">
                Inicia Sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
