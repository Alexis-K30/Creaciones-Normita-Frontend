import React from 'react';

const Pagination = ({ pagina, totalPaginas, onCambiarPagina }) => {
    if (totalPaginas <= 1) return null;

    return (
        <div className="mt-12 flex items-center justify-center gap-4">
            <button 
                onClick={() => onCambiarPagina(pagina - 1)} 
                disabled={pagina <= 1}
                className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-pink-100 text-pink-500 shadow-sm hover:bg-pink-50 hover:border-pink-200 transition-all disabled:opacity-30 disabled:pointer-events-none group"
                aria-label="Página anterior"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            
            <div className="flex items-center bg-white border border-pink-100 rounded-2xl px-6 py-3 shadow-sm">
                <span className="text-gray-400 font-medium">Página</span>
                <span className="mx-2 text-pink-600 font-bold text-lg">{pagina}</span>
                <span className="text-gray-400 font-medium">de {totalPaginas}</span>
            </div>

            <button 
                onClick={() => onCambiarPagina(pagina + 1)}
                disabled={pagina >= totalPaginas}
                className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-pink-100 text-pink-500 shadow-sm hover:bg-pink-50 hover:border-pink-200 transition-all disabled:opacity-30 disabled:pointer-events-none group"
                aria-label="Siguiente página"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-0.5 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;
