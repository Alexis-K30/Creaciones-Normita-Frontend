import React from 'react';

const Beneficios = () => {
    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">Nuestros Beneficios</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                
                <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition border border-pink-50">
                    <h4 className="text-xl font-semibold text-pink-600 mb-3">🌍 Envíos internacionales</h4>
                    <p className="text-gray-600">Llegamos a cualquier parte del mundo</p>
                </div>
                
                <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition border border-pink-50">
                    <h4 className="text-xl font-semibold text-pink-600 mb-3">💬 Cotiza fácilmente</h4>
                    <p className="text-gray-600">Respuesta rápida por WhatsApp</p>
                </div>
                
                <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition border border-pink-50">
                    <h4 className="text-xl font-semibold text-pink-600 mb-3">👗 Diseños exclusivos</h4>
                    <p className="text-gray-600">Vestidos hechos a mano</p>
                </div>
                
                <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition border border-pink-50">
                    <h4 className="text-xl font-semibold text-pink-600 mb-3">⭐ Clientes felices</h4>
                    <p className="text-gray-600">En todo el mundo</p>
                </div>
                
            </div>
        </section>
    );
};

export default Beneficios;
