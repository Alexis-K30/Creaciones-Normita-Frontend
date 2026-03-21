import React, { useState, useEffect } from 'react';

const CotizarModal = ({ mostrar, producto, onClose }) => {
    const [tallaSeleccionada, setTallaSeleccionada] = useState("M");
    const [nombreCliente, setNombreCliente] = useState("");
    const [telefonoCliente, setTelefonoCliente] = useState("");
    const [mostrarErrores, setMostrarErrores] = useState(false);
    const [indiceImagenActual, setIndiceImagenActual] = useState(0);

    const whatsAppPhone = "50376831744";
    const maxImagenes = 3;

    useEffect(() => {
        if (mostrar) {
            setIndiceImagenActual(0);
            setMostrarErrores(false);
        }
    }, [mostrar]);

    if (!mostrar || !producto) return null;

    const imagenes = (producto.imagenUrls || []).slice(0, maxImagenes);

    const esNombreValido = (nombre) => nombre.trim().length > 0;
    const esTelefonoValido = (tel) => /^[0-9+ ]{8,15}$/.test(tel.trim());

    const enviarCotizacion = () => {
        const nombreOk = esNombreValido(nombreCliente);
        const telOk = esTelefonoValido(telefonoCliente);

        if (!nombreOk || !telOk) {
            setMostrarErrores(true);
            return;
        }

        const msg = `Hola, quisiera cotizar: 
*${producto.nombre}*
Precio: $${producto.precio}
Talla: ${tallaSeleccionada}
Descripción: ${producto.descripcion}

Imagen: ${imagenes[0] || ""}

Mis datos:
Nombre: ${nombreCliente}
Teléfono: ${telefonoCliente}`;

        const url = `https://wa.me/${whatsAppPhone}?text=${encodeURIComponent(msg)}`;
        
        window.open(url, "_blank");
        
        // Fallback copy to clipboard
        navigator.clipboard.writeText(msg).then(() => {
            console.log("Mensaje copiado al portapapeles");
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col lg:flex-row transform transition-all animate-in fade-in zoom-in duration-300">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md text-gray-400 hover:text-gray-900 w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Left: Images */}
                <div className="w-full lg:w-1/2 bg-gray-50 relative aspect-square lg:aspect-auto">
                    {imagenes.length > 0 ? (
                        <>
                            <div className="absolute inset-0">
                                <img 
                                    src={imagenes[indiceImagenActual]} 
                                    alt={producto.nombre} 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                            
                            {imagenes.length > 1 && (
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-2 bg-black/20 backdrop-blur-md rounded-full">
                                    {imagenes.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setIndiceImagenActual(i)}
                                            className={`w-2.5 h-2.5 rounded-full transition-all ${i === indiceImagenActual ? 'bg-white w-6' : 'bg-white/40'}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6.75a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6.75v10.5a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Right: Details & Form */}
                <div className="w-full lg:w-1/2 p-8 lg:p-12 overflow-y-auto max-h-[60vh] lg:max-h-none">
                    <span className="text-pink-500 font-bold tracking-widest text-xs uppercase mb-2 block">Cotización en línea</span>
                    <h2 className="text-3xl font-black text-gray-900 mb-2 leading-tight uppercase tracking-tighter">
                        {producto.nombre}
                    </h2>
                    <p className="text-gray-500 leading-relaxed mb-6">{producto.descripcion}</p>
                    
                    <div className="flex items-center gap-3 mb-8 bg-pink-50 p-4 rounded-2xl border border-pink-100/50">
                        <span className="text-gray-400 font-medium">Precio estimado:</span>
                        <span className="text-3xl font-black text-pink-500">${producto.precio}</span>
                    </div>

                    <div className="space-y-6">
                        {/* Talla */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-3">Selecciona tu talla</label>
                            <div className="grid grid-cols-5 gap-2">
                                {["XS", "S", "M", "L", "XL"].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTallaSeleccionada(t)}
                                        className={`py-3 rounded-xl font-bold transition-all border-2 ${
                                            tallaSeleccionada === t 
                                            ? 'bg-pink-600 border-pink-600 text-white shadow-md' 
                                            : 'bg-white border-gray-100 text-gray-400 hover:border-pink-200 hover:text-pink-400'
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Form Inputs */}
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Tu Nombre</label>
                                <input 
                                    type="text"
                                    placeholder="Nombre completo"
                                    value={nombreCliente}
                                    onChange={(e) => setNombreCliente(e.target.value)}
                                    className={`w-full bg-gray-50 border rounded-2xl px-5 py-4 focus:ring-4 focus:outline-none transition-all ${
                                        mostrarErrores && !esNombreValido(nombreCliente) 
                                        ? 'border-red-300 focus:ring-red-100' 
                                        : 'border-transparent focus:ring-pink-100 focus:bg-white'
                                    }`}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Tu Teléfono (WhatsApp)</label>
                                <input 
                                    type="tel"
                                    placeholder="Ej: +503 7766-1122"
                                    value={telefonoCliente}
                                    onChange={(e) => setTelefonoCliente(e.target.value)}
                                    className={`w-full bg-gray-50 border rounded-2xl px-5 py-4 focus:ring-4 focus:outline-none transition-all ${
                                        mostrarErrores && !esTelefonoValido(telefonoCliente) 
                                        ? 'border-red-300 focus:ring-red-100' 
                                        : 'border-transparent focus:ring-pink-100 focus:bg-white'
                                    }`}
                                />
                            </div>
                        </div>

                        {/* Note */}
                        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex gap-3 items-start">
                            <span className="text-xl">📋</span>
                            <p className="text-xs text-amber-800 leading-relaxed font-medium">
                                El mensaje se copiará automáticamente al portapapeles. Si el chat abre vacío, solo pega (Ctrl+V) el mensaje.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button 
                            onClick={enviarCotizacion}
                            className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-pink-600 transition-all shadow-lg active:scale-[0.98]"
                        >
                            Confirmar y Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CotizarModal;
