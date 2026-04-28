import React, { useState } from "react";
import { useFetch } from "../components/ProductosFetch.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Pagination from "../components/Pagination.jsx";
import Beneficios from "../components/Beneficios.jsx";
import CotizarModal from "../components/CotizarModal.jsx";

const Productos = () => {
  const [pagina, setPagina] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const { data, loading, error } = useFetch(
    `http://localhost:8082/api/productos?pagina=${pagina}&porPagina=9`
  );

  const handleCotizar = (producto) => {
    setProductoSeleccionado(producto);
    setModalOpen(true);
  };

  const handleCambiarPagina = (nuevaPagina) => {
    setPagina(nuevaPagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="animate-fade-in">
          <span className="text-pink-500 font-bold tracking-[0.3em] text-xs uppercase mb-3 block">Colección {new Date().getFullYear()}</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-none uppercase tracking-tighter">
            Catálogo de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">Vestidos</span>
          </h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-100 p-8 rounded-3xl text-center animate-fade-in">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008h-.008v-.008Z" />
            </svg>
          </div>
          <h2 className="text-red-900 font-bold text-xl mb-2">Error de Conexión</h2>
          <p className="text-red-600 max-w-md mx-auto">No pudimos conectar con el servidor. Por favor, asegúrate de que el API esté corriendo </p>
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="bg-white rounded-3xl h-[500px] border border-slate-100 shadow-sm"></div>
          ))}
        </div>
      )}

      {data?.items && data.items.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {data.items.map((producto, idx) => (
              <div key={producto.id} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <ProductCard producto={producto} onCotizar={handleCotizar} />
              </div>
            ))}
          </div>

          <Pagination 
            pagina={pagina} 
            totalPaginas={data.totalPaginas} 
            onCambiarPagina={handleCambiarPagina} 
          />
        </>
      ) : (
        !loading && !error && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
             <p className="text-slate-400 font-bold uppercase tracking-[0.2em]">No se encontraron productos</p>
          </div>
        )
      )}

      <Beneficios />

      <CotizarModal 
        mostrar={modalOpen} 
        producto={productoSeleccionado} 
        onClose={() => setModalOpen(false)} 
      />
    </main>
  );
};

export default Productos;
