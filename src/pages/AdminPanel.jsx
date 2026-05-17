import React, { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const API = "http://localhost:8082/api/productos";

// ── helpers ──────────────────────────────────────────────
const authHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

const emptyForm = {
  nombre: "",
  descripcion: "",
  precio: "",
  imagenUrls: [""],
  activo: true,
};

// ── sub-components ────────────────────────────────────────

function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [msg]);
  if (!msg) return null;
  const colors =
    type === "ok"
      ? "bg-green-50 border-green-200 text-green-800"
      : "bg-red-50 border-red-200 text-red-700";
  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl border shadow-lg text-sm font-bold ${colors}`}
    >
      <span>{type === "ok" ? "✅" : "❌"}</span>
      <span>{msg}</span>
      <button onClick={onClose} className="ml-2 opacity-50 hover:opacity-100">
        ✕
      </button>
    </div>
  );
}

function ConfirmModal({ vestido, onConfirm, onCancel }) {
  if (!vestido) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🗑️</span>
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">
            ¿Eliminar vestido?
          </h2>
          <p className="text-slate-500 mb-1">
            Vas a eliminar permanentemente:
          </p>
          <p className="font-bold text-pink-600 text-lg mb-6">
            {vestido.nombre}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={() => onConfirm(vestido.id)}
              className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all"
            >
              Sí, eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function VestidoForm({ initial, onSave, onCancel, loading }) {
  const [form, setForm] = useState(initial || emptyForm);
  const [errors, setErrors] = useState({});
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);

  // Inicializar previews con URLs existentes en modo edición
  useEffect(() => {
    if (initial?.imagenUrls?.length) {
      setPreviews(initial.imagenUrls);
    }
  }, [initial]);

  const set = (field, value) =>
    setForm((p) => ({ ...p, [field]: value }));

  const handleFileSelect = (e) => {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;

  const validFiles = files.filter(file => {
    const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
    const isValidSize = file.size <= 10 * 1024 * 1024; // ⬅️ Aumentado a 10 MB
    if (!isValidType) alert(`Formato no soportado: ${file.name}`);
    if (!isValidSize) alert(`La imagen supera 10MB: ${file.name}`); // ⬅️ Mensaje actualizado
    return isValidType && isValidSize;
  });

    if (validFiles.length === 0) return;

    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setImageFiles(prev => [...prev, ...validFiles]);
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    if (previews[index] && previews[index].startsWith('blob:')) {
      URL.revokeObjectURL(previews[index]);
    }
    if (index < imageFiles.length) {
      setImageFiles(prev => prev.filter((_, i) => i !== index));
      setPreviews(prev => prev.filter((_, i) => i !== index));
    } else {
      const urlIndex = index - imageFiles.length;
      const newUrls = [...form.imagenUrls];
      newUrls.splice(urlIndex, 1);
      set('imagenUrls', newUrls);
      setPreviews(prev => prev.filter((_, i) => i !== index));
    }
  };

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio";
    else if (form.nombre.length > 100) e.nombre = "Máximo 100 caracteres";
    if (!form.descripcion.trim())
      e.descripcion = "La descripción es obligatoria";
    else if (form.descripcion.length > 500)
      e.descripcion = "Máximo 500 caracteres";
    const p = parseFloat(form.precio);
    if (!form.precio || isNaN(p)) e.precio = "Ingresa un precio válido";
    else if (p < 0.01 || p > 9999)
      e.precio = "El precio debe estar entre $0.01 y $9999";

    const totalImages = (form.imagenUrls?.filter(u => u.trim())?.length || 0) + imageFiles.length;
    if (totalImages === 0) {
      e.imagenes = "Debes agregar al menos una imagen";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  // Primero subir las imágenes nuevas al servidor
  const token = localStorage.getItem("token");
  const uploadedUrls = [];

  for (const file of imageFiles) {
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("http://localhost:8082/api/imagenes/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) throw new Error("Error al subir imagen");
      const data = await res.json();
      uploadedUrls.push(data.url);
    } catch (err) {
      alert("Error subiendo imagen: " + err.message);
      return;
    }
  }

  // Combinar URLs existentes con las nuevas subidas
  const existingUrls = form.imagenUrls?.filter(u => u.trim() && !u.startsWith("blob:")) || [];
  const allUrls = [...existingUrls, ...uploadedUrls];

  // Enviar el vestido como JSON
  onSave({
    ...form,
    precio: parseFloat(form.precio),
    imagenUrls: allUrls,
  });
};

  const isEdit = !!initial?.id;
  const allPreviews = [
    ...(form.imagenUrls?.filter(u => u.trim()) || []),
    ...previews.filter(p => p.startsWith('blob:'))
  ];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-pink-50 px-8 py-5 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <h2 className="text-2xl font-black text-slate-800">
              {isEdit ? "✏️ Editar vestido" : "✨ Añadir vestido"}
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">
              {isEdit
                ? "Modificá los datos del vestido"
                : "Completá los datos del nuevo vestido"}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-all"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
          {/* nombre */}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">
              Nombre del vestido *
            </label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => set("nombre", e.target.value)}
              placeholder="Ej: Vestido de quinceañera rosado"
              className={`w-full px-4 py-3.5 bg-slate-50 rounded-2xl text-slate-700 font-medium focus:ring-2 focus:outline-none transition-all ${
                errors.nombre
                  ? "ring-2 ring-red-300"
                  : "focus:ring-pink-300"
              }`}
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1 font-bold">
                {errors.nombre}
              </p>
            )}
            <p className="text-xs text-slate-400 mt-1 text-right">
              {form.nombre.length}/100
            </p>
          </div>

          {/* descripcion */}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">
              Descripción *
            </label>
            <textarea
              value={form.descripcion}
              onChange={(e) => set("descripcion", e.target.value)}
              rows={3}
              placeholder="Describe los materiales, colores, tallas disponibles..."
              className={`w-full px-4 py-3.5 bg-slate-50 rounded-2xl text-slate-700 font-medium focus:ring-2 focus:outline-none transition-all resize-none ${
                errors.descripcion
                  ? "ring-2 ring-red-300"
                  : "focus:ring-pink-300"
              }`}
            />
            {errors.descripcion && (
              <p className="text-red-500 text-xs mt-1 font-bold">
                {errors.descripcion}
              </p>
            )}
            <p className="text-xs text-slate-400 mt-1 text-right">
              {form.descripcion.length}/500
            </p>
          </div>

          {/* precio */}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">
              Precio (USD) *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                $
              </span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                max="9999"
                value={form.precio}
                onChange={(e) => set("precio", e.target.value)}
                placeholder="0.00"
                className={`w-full pl-8 pr-4 py-3.5 bg-slate-50 rounded-2xl text-slate-700 font-medium focus:ring-2 focus:outline-none transition-all ${
                  errors.precio
                    ? "ring-2 ring-red-300"
                    : "focus:ring-pink-300"
                }`}
              />
            </div>
            {errors.precio && (
              <p className="text-red-500 text-xs mt-1 font-bold">
                {errors.precio}
              </p>
            )}
          </div>

          {/* Imágenes: subida desde dispositivo + previsualización */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">
                Imágenes del vestido *
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="text-xs text-pink-500 font-bold hover:text-pink-700 transition-colors"
              >
                + Subir desde dispositivo
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
            />
            <div className="grid grid-cols-3 gap-3 mt-2">
              {allPreviews.map((src, idx) => (
                <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={src} alt={`preview ${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {allPreviews.length === 0 && (
                <div className="col-span-3 text-center py-8 bg-slate-50 rounded-xl text-slate-400 text-sm">
                  Haz clic en "+ Subir desde dispositivo" para agregar fotos
                </div>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1.5">
              Subí imágenes JPG, PNG o WebP (máx. 50MB cada una). Podés elegir varias a la vez.
            </p>
            {errors.imagenes && <p className="text-red-500 text-xs mt-1 font-bold">{errors.imagenes}</p>}
          </div>

          {/* activo */}
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-3.5 rounded-2xl">
            <input
              type="checkbox"
              id="activo"
              checked={form.activo}
              onChange={(e) => set("activo", e.target.checked)}
              className="w-5 h-5 text-pink-500 rounded focus:ring-pink-300 cursor-pointer"
            />
            <label
              htmlFor="activo"
              className="text-sm font-bold text-slate-700 cursor-pointer"
            >
              Vestido activo (visible en el catálogo)
            </label>
          </div>

          {/* actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-4 rounded-2xl border-2 border-slate-200 text-slate-600 font-black uppercase tracking-widest text-sm hover:bg-slate-50 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 rounded-2xl bg-pink-500 text-white font-black uppercase tracking-widest text-sm hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-pink-200"
            >
              {loading
                ? "Guardando..."
                : isEdit
                ? "Guardar cambios"
                : "Añadir vestido"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function VestidoRow({ vestido, onEdit, onDelete }) {
  const img = vestido.imagenUrls?.[0];
  return (
    <tr className="border-b border-slate-100 hover:bg-pink-50/40 transition-colors">
      <td className="py-3 pl-4 pr-2 w-16">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
          {img ? (
            <img
              src={img}
              alt={vestido.nombre}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300 text-xl">
              👗
            </div>
          )}
        </div>
      </td>
      <td className="py-3 px-3">
        <p className="font-bold text-slate-800 text-sm leading-tight">
          {vestido.nombre}
        </p>
        <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">
          {vestido.descripcion}
        </p>
      </td>
      <td className="py-3 px-3 text-sm font-black text-slate-800 whitespace-nowrap">
        ${vestido.precio}
      </td>
      <td className="py-3 px-3 text-xs text-slate-400 text-center">
        {vestido.imagenUrls?.length || 0} foto{vestido.imagenUrls?.length !== 1 ? "s" : ""}
      </td>
      <td className="py-3 px-3">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
            vestido.activo
              ? "bg-green-100 text-green-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {vestido.activo ? "Activo" : "Inactivo"}
        </span>
      </td>
      <td className="py-3 px-3 pr-4">
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => onEdit(vestido)}
            className="px-4 py-2 rounded-xl bg-pink-50 text-pink-600 text-xs font-bold hover:bg-pink-500 hover:text-white transition-all"
          >
            ✏️ Editar
          </button>
          <button
            onClick={() => onDelete(vestido)}
            className="px-4 py-2 rounded-xl bg-red-50 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
          >
            🗑️ Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}

// ── Main component AdminPanel ────────────────────────────────────────
const AdminPanel = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const [vestidos, setVestidos]       = useState([]);
  const [totalItems, setTotalItems]   = useState(0);
  const [pagina, setPagina]           = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [saveLoading, setSaveLoading]   = useState(false);

  const [showForm, setShowForm]         = useState(false);
  const [editingVestido, setEditingVestido] = useState(null);
  const [deleteTarget, setDeleteTarget]   = useState(null);

  const [toast, setToast] = useState({ msg: "", type: "ok" });

  const notify = (msg, type = "ok") => setToast({ msg, type });
  const clearToast = () => setToast({ msg: "", type: "ok" });

  const fetchVestidos = useCallback(async (page = 1) => {
    setFetchLoading(true);
    try {
      const res = await fetch(`${API}?pagina=${page}&porPagina=10`);
      if (!res.ok) throw new Error("Error al cargar vestidos");
      const data = await res.json();
      setVestidos(data.items || []);
      setTotalItems(data.totalItems || 0);
      setTotalPaginas(data.totalPaginas || 1);
      setPagina(page);
    } catch (err) {
      notify("No se pudo conectar con el servidor", "err");
    } finally {
      setFetchLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVestidos(1);
  }, [fetchVestidos]);

  const handleAdd = async (formDataOrObject) => {
    setSaveLoading(true);
    try {
      let res;
      if (formDataOrObject instanceof FormData) {
        res = await fetch(API, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataOrObject,
        });
      } else {
        res = await fetch(API, {
          method: "POST",
          headers: authHeaders(token),
          body: JSON.stringify(formDataOrObject),
        });
      }
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Error al añadir vestido");
      }
      notify("✨ Vestido añadido correctamente");
      setShowForm(false);
      fetchVestidos(pagina);
    } catch (err) {
      notify(err.message || "Error al añadir vestido", "err");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleEdit = async (formDataOrObject) => {
    setSaveLoading(true);
    try {
      const id = formDataOrObject instanceof FormData ? formDataOrObject.get('id') : formDataOrObject.id;
      let res;
      if (formDataOrObject instanceof FormData) {
        res = await fetch(`${API}/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataOrObject,
        });
      } else {
        res = await fetch(`${API}/${id}`, {
          method: "PUT",
          headers: authHeaders(token),
          body: JSON.stringify(formDataOrObject),
        });
      }
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Error al actualizar vestido");
      }
      notify("✅ Vestido actualizado correctamente");
      setEditingVestido(null);
      fetchVestidos(pagina);
    } catch (err) {
      notify(err.message || "Error al actualizar vestido", "err");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: authHeaders(token),
      });
      if (!res.ok) throw new Error("Error al eliminar vestido");
      notify("🗑️ Vestido eliminado");
      setDeleteTarget(null);
      const newPage = vestidos.length === 1 && pagina > 1 ? pagina - 1 : pagina;
      fetchVestidos(newPage);
    } catch (err) {
      notify(err.message || "Error al eliminar vestido", "err");
      setDeleteTarget(null);
    }
  };

  if (user?.role !== "Administrador") return <Navigate to="/" />;

  return (
    <div className="container mx-auto px-6 py-12">
      <Toast msg={toast.msg} type={toast.type} onClose={clearToast} />

      {showForm && (
        <VestidoForm
          initial={null}
          onSave={handleAdd}
          onCancel={() => setShowForm(false)}
          loading={saveLoading}
        />
      )}
      {editingVestido && (
        <VestidoForm
          initial={{
            ...editingVestido,
            imagenUrls:
              editingVestido.imagenUrls?.length
                ? editingVestido.imagenUrls
                : [""],
          }}
          onSave={handleEdit}
          onCancel={() => setEditingVestido(null)}
          loading={saveLoading}
        />
      )}
      <ConfirmModal
        vestido={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-pink-50 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Panel de Administración
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Gestiona el catálogo de vestidos · Creaciones Normita
            </p>
          </div>
          <span className="bg-pink-500 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
            Admin Mode
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100">
            <h3 className="text-pink-600 font-black text-xs uppercase tracking-widest mb-2">
              Total Vestidos
            </h3>
            <p className="text-4xl font-black text-slate-800">
              {fetchLoading ? "—" : totalItems}
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
            <h3 className="text-purple-600 font-black text-xs uppercase tracking-widest mb-2">
              Página actual
            </h3>
            <p className="text-4xl font-black text-slate-800">
              {pagina}/{totalPaginas}
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
            <h3 className="text-green-600 font-black text-xs uppercase tracking-widest mb-2">
              Vestidos activos
            </h3>
            <p className="text-4xl font-black text-slate-800">
              {fetchLoading ? "—" : vestidos.filter((v) => v.activo).length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-pink-50 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 px-8 py-5 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-800">
            Catálogo de vestidos
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-pink-600 transition-all shadow-md shadow-pink-200 active:scale-95"
          >
            <span className="text-lg leading-none">+</span>
            Añadir vestido
          </button>
        </div>

        {fetchLoading ? (
          <div className="py-20 text-center">
            <div className="inline-block w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
              Cargando vestidos...
            </p>
          </div>
        ) : vestidos.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-6xl mb-4">👗</p>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
              No hay vestidos todavía
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 bg-pink-500 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-pink-600 transition-all"
            >
              Añadir el primer vestido
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="py-3 pl-4 pr-2 text-left text-xs font-black text-slate-400 uppercase tracking-widest w-16">
                    Foto
                  </th>
                  <th className="py-3 px-3 text-left text-xs font-black text-slate-400 uppercase tracking-widest">
                    Vestido
                  </th>
                  <th className="py-3 px-3 text-left text-xs font-black text-slate-400 uppercase tracking-widest">
                    Precio
                  </th>
                  <th className="py-3 px-3 text-center text-xs font-black text-slate-400 uppercase tracking-widest">
                    Fotos
                  </th>
                  <th className="py-3 px-3 text-left text-xs font-black text-slate-400 uppercase tracking-widest">
                    Estado
                  </th>
                  <th className="py-3 px-3 pr-4 text-right text-xs font-black text-slate-400 uppercase tracking-widest">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {vestidos.map((v) => (
                  <VestidoRow
                    key={v.id}
                    vestido={v}
                    onEdit={setEditingVestido}
                    onDelete={setDeleteTarget}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPaginas > 1 && (
          <div className="flex items-center justify-center gap-4 px-8 py-5 border-t border-slate-100">
            <button
              onClick={() => fetchVestidos(pagina - 1)}
              disabled={pagina <= 1}
              className="w-10 h-10 rounded-xl border border-pink-100 text-pink-500 hover:bg-pink-50 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center"
            >
              ‹
            </button>
            <span className="text-sm font-bold text-slate-500">
              Página{" "}
              <span className="text-pink-600">{pagina}</span> de{" "}
              {totalPaginas}
            </span>
            <button
              onClick={() => fetchVestidos(pagina + 1)}
              disabled={pagina >= totalPaginas}
              className="w-10 h-10 rounded-xl border border-pink-100 text-pink-500 hover:bg-pink-50 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;