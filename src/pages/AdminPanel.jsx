import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminPanel = () => {
  const { user } = useAuth();

  if (user?.role !== "Administrador") {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-pink-50">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Panel de Administración</h1>
            <p className="text-slate-500 font-medium mt-1">Gestiona los productos y pedidos de Creaciones Normita</p>
          </div>
          <div className="bg-pink-500 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
            Admin Mode
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100">
            <h3 className="text-pink-600 font-black text-xs uppercase tracking-widest mb-2">Total Productos</h3>
            <p className="text-4xl font-black text-slate-800">48</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
            <h3 className="text-purple-600 font-black text-xs uppercase tracking-widest mb-2">Pedidos Pendientes</h3>
            <p className="text-4xl font-black text-slate-800">12</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h3 className="text-blue-600 font-black text-xs uppercase tracking-widest mb-2">Usuarios Registrados</h3>
            <p className="text-4xl font-black text-slate-800">156</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Acciones Rápidas</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white border-2 border-pink-200 text-pink-600 px-6 py-3 rounded-xl text-sm font-bold hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all">
              Añadir Producto
            </button>
            <button className="bg-white border-2 border-slate-200 text-slate-600 px-6 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all">
              Ver Pedidos
            </button>
            <button className="bg-white border-2 border-slate-200 text-slate-600 px-6 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all">
              Configuración
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
