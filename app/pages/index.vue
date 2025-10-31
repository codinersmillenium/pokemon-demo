<template>
  <div class="min-h-screen p-6">
    <div v-if="isLoading" class="text-center text-gray-600 text-lg mt-10">
      Loading Pokemon...
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <PokemonCard
        v-for="p in pokemons"
        :key="p.id"
        :pokemon="p"
        @select="openDetail"
      />
    </div>

    <div class="flex justify-center mt-10 gap-2 flex-wrap">
      <button
        class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >Prev</button>

      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :disabled="page === currentPage"
        class="px-3 py-1 rounded font-semibold"
        :class="page === currentPage ? 'bg-indigo-500 text-white' : 'bg-gray-200 hover:bg-gray-300'"
      >
        {{ page }}
      </button>

      <button
        class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >Next</button>
    </div>

    <PokemonModal
      v-if="selectedPokemon"
      :show="showModal"
      :pokemon="selectedPokemon"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
    import { usePokemon } from '~/composable/usePokemon'
    import PokemonCard from '~/component/ui/Card.vue'
    import PokemonModal from '~/component/ui/Popup.vue'

    const {
        pokemons,
        currentPage,
        totalPages,
        visiblePages,
        selectedPokemon,
        showModal,
        isLoading,
        loadPokemons,
        openDetail,
        closeModal,
        goToPage,
    }: any = usePokemon()

    onMounted(loadPokemons)
</script>
