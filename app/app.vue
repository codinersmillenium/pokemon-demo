<template>
  <div class="font-sans min-h-screen">
    <div class="flex justify-center">
      <img src="/logo/logo.png" alt="Pokemon Logo" class="pokemon-logo"></img>
      <div class="title mt-8">
        <img src="/logo/pokeball.png" alt="" class="pokeball">
        <h1>Pokemon - Web Demo</h1>
      </div>
    </div>

    <!-- Page Content -->
    <main class="max-w-6xl mx-auto px-6 py-5">
      <NuxtLoadingIndicator color="#6366f1" :height="3" />
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="mt-20 border-t border-gray-200 py-6 text-center text-gray-500 text-sm px-4">
      {{ new Date().getFullYear() }} .Pokemon - Web Demo. Built with using Nuxt + Vite + TailwindCSS.
    </footer>
  </div>
</template>