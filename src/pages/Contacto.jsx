import React, { useState } from "react";

const Contacto = () => {
  const [mensaje, setMensaje] = useState({
    Nombre: "",
    Correo: "",
    Contenido: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMensaje((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    console.log("Enviando formulario:", mensaje);
    // Aquí iría la lógica de envío (fetch/axios)
    setEnviado(true);
    setMensaje({ Nombre: "", Correo: "", Contenido: "" });
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <div className="py-20 text-center">
      <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">
        Contacto
      </h1>
      <p className="mt-4 text-slate-500 uppercase tracking-widest font-bold">
        Estamos para servirte
      </p>

      <div className="flex flex-wrap justify-center gap-6 mb-10 text-lg">
        <a
          href="https://wa.me/50376970004"
          target="_blank"
          className="flex items-center gap-2 text-gray-700 hover:text-green-500 transition"
        >
          <i className="bi bi-whatsapp text-2xl"></i> WhatsApp
        </a>
        <a
          href="https://www.facebook.com/creacionesnormita.sv"
          target="_blank"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
        >
          <i className="bi bi-facebook text-2xl"></i> Facebook
        </a>
        <a
          href="https://www.instagram.com/creacionesnormita.sv"
          target="_blank"
          className="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition"
        >
          <i className="bi bi-instagram text-2xl"></i> Instagram
        </a>
        <a
          href="https://www.tiktok.com/@creacionesnormitasv"
          target="_blank"
          className="flex items-center gap-2 text-gray-700 hover:text-black transition"
        >
          <i className="bi bi-tiktok text-2xl"></i> TikTok
        </a>
        <a
          href="mailto:contacto@creacionesnormita.sv"
          className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition"
        >
          <i className="bi bi-envelope-fill text-2xl"></i> Correo
        </a>
      </div>

      <section className="bg-pink-50 py-12 mt-16">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">
            Información adicional
          </h3>
          <p className="text-gray-600">
            Puedes visitarnos en nuestra boutique o escribirnos en cualquier
            momento.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h4 className="font-semibold text-pink-600 mb-2">📍 Dirección</h4>
              <p className="text-gray-600">
                1a Norte y 19 Calle Pte. 11, San Salvador CP 1101
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h4 className="font-semibold text-pink-600 mb-2">⏰ Horarios</h4>
              <p className="text-gray-600">
                Lunes a Sábado
                <br />
                9:00 AM – 5:00 PM
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h4 className="font-semibold text-pink-600 mb-2">📞 Teléfono</h4>
              <p className="text-gray-600">+503 7697 0004</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 max-w-6xl mx-auto px-6">
          <div className="bg-white shadow-md rounded-xl p-8 text-left">
            <form onSubmit={enviarFormulario} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  name="Nombre"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  value={mensaje.Nombre}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Correo
                </label>
                <input
                  type="email"
                  name="Correo"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  value={mensaje.Correo}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Mensaje
                </label>
                <textarea
                  name="Contenido"
                  required
                  rows="5"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  value={mensaje.Contenido}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-pink-500 text-white px-5 py-3 rounded-lg font-bold hover:bg-pink-600 transition uppercase tracking-widest text-xs shadow-lg shadow-pink-100"
              >
                Enviar Mensaje
              </button>
            </form>

            {enviado && (
              <div className="mt-4 bg-green-100 text-green-800 px-4 py-3 rounded-lg animate-fade-in">
                ¡Gracias por contactarnos! Te responderemos pronto.
              </div>
            )}
          </div>

          <div className="bg-white overflow-hidden rounded-xl shadow-md h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.1578052685393!2d-89.19205882491427!3d13.708114186679152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f63316a6c29e2ab%3A0x456f594886a42248!2sCreaciones%20Normita%20El%20Salvador!5e0!3m2!1ses!2ssv!4v1758001985717!5m2!1ses!2ssv"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;

