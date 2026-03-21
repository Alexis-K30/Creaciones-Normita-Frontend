import React, { useState } from 'react';

const ProductCard = ({ producto, onCotizar }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const hasImages = producto.imagenUrls && producto.imagenUrls.length > 0;

    const nextImage = (e) => {
        e.stopPropagation();
        if (!hasImages) return;
        setCurrentIndex((prev) => (prev + 1) % producto.imagenUrls.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        if (!hasImages) return;
        setCurrentIndex((prev) => (prev - 1 + producto.imagenUrls.length) % producto.imagenUrls.length);
    };

    const selectIndex = (e, index) => {
        e.stopPropagation();
        setCurrentIndex(index);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-pink-50 overflow-hidden
                    hover:shadow-xl transform hover:-translate-y-1
                    transition duration-300 group">
            
            {/* Image Container with Carousel */}
            <div className="aspect-[3/4] w-full overflow-hidden relative bg-gray-50">
                {hasImages ? (
                    <>
                        <img 
                            src={producto.imagenUrls[currentIndex]} 
                            alt={producto.nombre} 
                            className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
                        />
                        
                        {/* Navigation Arrows */}
                        {producto.imagenUrls.length > 1 && (
                            <>
                                <button 
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm hover:bg-white text-gray-700 transition-all opacity-0 group-hover:opacity-100"
                                    aria-label="Anterior"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                                    </svg>
                                </button>
                                <button 
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm hover:bg-white text-gray-700 transition-all opacity-0 group-hover:opacity-100"
                                    aria-label="Siguiente"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                                    </svg>
                                </button>

                                {/* Pagination Dots */}
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-2 py-1 bg-black/20 backdrop-blur-md rounded-full">
                                    {producto.imagenUrls.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={(e) => selectIndex(e, i)}
                                            className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                                            aria-label={`Ir a imagen ${i + 1}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-20 h-20">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6.75a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6.75v10.5a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        <p className="text-xs mt-2 uppercase tracking-widest font-medium">Sin imagen</p>
                    </div>
                )}
                
                {/* Overlay Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-pink-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    Nuevo
                </div>
            </div>

            <div className="p-5 flex flex-col justify-between h-52">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-pink-600 transition-colors uppercase tracking-tight">{producto.nombre}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mt-1 leading-relaxed">{producto.descripcion}</p>
                </div>
                
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-gray-900 tracking-tighter">
                                ${producto.precio}
                            </span>
                            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">+ Envío internacional</span>
                        </div>
                    </div>

                    <button 
                        onClick={() => onCotizar(producto)}
                        className="w-full bg-pink-100 text-pink-700 py-3 rounded-xl text-sm font-bold 
                               hover:bg-pink-600 hover:text-white transition-all duration-300 active:scale-95 shadow-sm"
                    >
                        LO QUIERO
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
