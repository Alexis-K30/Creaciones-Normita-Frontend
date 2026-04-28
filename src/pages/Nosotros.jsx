import React from "react";
import Beneficios from "../components/Beneficios.jsx";

const Nosotros = () => {
  return (
    <div className="p-2 text-center">
      

      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <h2 class="text-3xl font-bold text-center text-gray-800 pb-15 ">
          Sobre Nosotros
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div class="text-center">
            <img
              src="public/nosotros.jpg"
              alt="Creaciones Normita"
              class="rounded-xl shadow-md w-full max-h-[400px] object-cover mx-auto"
            />
          </div>

          <div class="text-gray-700 space-y-4">
            <p class="text-lg">
              En <strong class="text-gray-900">Creaciones Normita</strong> nos
              especializamos en la confección de
              <strong class="text-gray-900">vestidos de quinceaños</strong> y
              trajes para ocasiones especiales.
            </p>
            <p>
              Nuestro objetivo es resaltar la belleza de cada joven en su día
              más especial, ofreciendo diseños únicos con detalles de calidad y
              elegancia.
            </p>
            <p>
              Con pasión, creatividad y dedicación, transformamos cada idea en
              un vestido soñado que quedará en el recuerdo para toda la vida.
            </p>
          </div>
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div class="text-center md:text-left order-2 md:order-1">
            <h3 class="text-2xl font-bold text-gray-800 mb-6">
              Nuestra Historia
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Creaciones Normita nació con el sueño de brindar a cada joven un
              vestido único para sus momentos más especiales. Desde nuestros
              inicios en <strong>El Salvador</strong>, hemos trabajado con
              pasión, cuidando cada detalle para ofrecer calidad y elegancia en
              cada diseño.
            </p>
          </div>

          <div class="text-center order-1 md:order-2">
            <img
              src="public/historia.jpg"
              alt="Nuestra historia Creaciones Normita"
              class="rounded-xl shadow-md w-full max-h-[350px] object-cover mx-auto"
            />
          </div>
        </div>
      </section>

      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h3 class="text-2xl font-bold text-center text-gray-800 mb-10">
          Nuestros Valores
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div class="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition">
            <h4 class="text-xl font-semibold text-pink-600 mb-3">✨ Pasión</h4>
            <p class="text-gray-600">
              Amamos lo que hacemos y cada vestido refleja nuestro compromiso.
            </p>
          </div>
          <div class="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition">
            <h4 class="text-xl font-semibold text-pink-600 mb-3">
              🎨 Creatividad
            </h4>
            <p class="text-gray-600">
              Diseños originales pensados para resaltar la belleza de cada
              cliente.
            </p>
          </div>
          <div class="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition">
            <h4 class="text-xl font-semibold text-pink-600 mb-3">🌟 Calidad</h4>
            <p class="text-gray-600">
              Cada detalle es cuidado para entregar elegancia y durabilidad.
            </p>
          </div>
        </div>
      </section>

      <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <Beneficios />
      </section>

      <section class="bg-pink-50 mt-16 py-12">
        <h3 class="text-2xl font-bold text-center text-gray-800 mb-10">
          Lo que dicen nuestras clientas
        </h3>
        <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <p class="text-gray-600 italic">
              “Mi vestido fue perfecto, todos quedaron encantados. Gracias por
              hacer mi día inolvidable.”
            </p>
            <h4 class="mt-4 font-semibold text-gray-900">— Ana, Quinceañera</h4>
          </div>
          <div class="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <p class="text-gray-600 italic">
              “Me encantó el trato y la dedicación. Se nota la pasión en cada
              detalle del vestido.”
            </p>
            <h4 class="mt-4 font-semibold text-gray-900">— Marcela, Madre</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
