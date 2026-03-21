import React, { useState } from "react";
import { useFetch } from "./components/ProductosFetch.jsx";
import ProductCard from "./components/ProductCard.jsx";
import Pagination from "./components/Pagination.jsx";
import Beneficios from "./components/Beneficios.jsx";
import Whatsapp from "./components/Whatsapp.jsx";
import CotizarModal from "./components/CotizarModal.jsx";
import "./App.css";

function App() {
  const [pagina, setPagina] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Endpoint as requested
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
    <div className="min-h-screen bg-slate-50/50">
      {/* Header / Navbar Replacement */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-pink-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-pink-200">N</div>
            <span className="text-xl font-black text-slate-800 uppercase tracking-tighter">Creaciones Normita</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-bold text-slate-500 hover:text-pink-600 transition-colors uppercase tracking-widest">Inicio</a>
            <a href="#" className="text-sm font-bold text-pink-600 transition-colors uppercase tracking-widest border-b-2 border-pink-500 pb-1">Productos</a>
            <a href="#" className="text-sm font-bold text-slate-500 hover:text-pink-600 transition-colors uppercase tracking-widest">Nosotros</a>
            <a href="#" className="text-sm font-bold text-slate-500 hover:text-pink-600 transition-colors uppercase tracking-widest">Contacto</a>
          </nav>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-pink-600 transition-all shadow-md">Login</button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="animate-fade-in">
            <span className="text-pink-500 font-bold tracking-[0.3em] text-xs uppercase mb-3 block">Colección {new Date().getFullYear()}</span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-none uppercase tracking-tighter">
              Catálogo de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">Vestidos</span>
            </h1>
          </div>
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-pink-50 flex items-center gap-1 animate-fade-in">
             <div className="px-4 py-2 text-xs font-black text-slate-400 uppercase tracking-widest">Categorías</div>
             <button className="px-5 py-2.5 bg-pink-500 text-white rounded-xl text-xs font-bold shadow-md shadow-pink-100 uppercase tracking-widest">Todos</button>
             <button className="px-5 py-2.5 text-slate-500 hover:bg-slate-50 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">Coctel</button>
             <button className="px-5 py-2.5 text-slate-500 hover:bg-slate-50 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">Gala</button>
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
      </main>

      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
           <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center text-white font-black text-3xl mx-auto mb-6 shadow-xl shadow-pink-500/20">N</div>
           <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Creaciones Normita</h3>
           <p className="text-slate-400 text-sm max-w-sm mx-auto mb-8 uppercase tracking-widest font-bold">Diseños exclusivos hechos a mano en El Salvador.</p>
           <div className="flex justify-center gap-6 mb-12">
              <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all">FB</a>
              <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all">IG</a>
              <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all">TK</a>
           </div>
           <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.3em]">© {new Date().getFullYear()} Creaciones Normita. Todos los derechos reservados.</p>
        </div>
      </footer>

      <Whatsapp />
      
      <CotizarModal 
        mostrar={modalOpen} 
        producto={productoSeleccionado} 
        onClose={() => setModalOpen(false)} 
      />
    </div>
  );
}

export default App;
