import React from "react";

const Home = () => {
  return (
    <section class="relative w-full h-[40vh] rounded-xl shadow-lg overflow-hidden bg-gradient-to-r from-pink-50 via-white to-purple-50">
      <div class="absolute inset-0 bg-white/30 backdrop-blur-sm flex flex-col items-center justify-center text-center px-4">
        <h1
          class="text-3xl md:text-5xl font-bold text-gray-900 drop-shadow-lg"
          tabindex="-1"
        >
          Creaciones Normita
        </h1>
        <p class="mt-3 text-lg md:text-xl text-gray-800">
          Viste tus momentos más especiales con elegancia ✨
        </p>
        <p class="mt-2 text-base md:text-lg text-pink-400 font-medium">
          Envíos internacionales a EE.UU. 🇺🇸 y Europa 🇪🇺
        </p>
        <button
          class="mt-5 bg-pink-200 text-gray-900 px-6 py-2 rounded-lg font-medium
                       hover:bg-purple-200 transition transform hover:scale-105 duration-300"
        >
          Ver catálogo completo
        </button>
      </div>
    </section>
  );
};

export default Home;
