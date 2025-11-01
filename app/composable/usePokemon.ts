import { ref, computed } from 'vue'
import { fetchPokemonList, fetchPokemonDetail } from '~/service/pokemonService'
import type { Pokemon } from '~/core/pokemon'


export function usePokemon() {
  const pokemons = ref<Pokemon[]>([])
  const currentPage = ref(1)
  const totalPokemons = 151
  const pageSize = 10
  const selectedPokemon = ref<Pokemon | null>(null)
  const showModal = ref(false)
  const isLoading = ref(false)

  const totalPages = Math.ceil(totalPokemons / pageSize)

  async function loadPokemons() {
    isLoading.value = true
    const offset = (currentPage.value - 1) * pageSize
    pokemons.value = await fetchPokemonList(offset, pageSize)
    isLoading.value = false
  }

  async function openDetail(id: number) {
    selectedPokemon.value = await fetchPokemonDetail(id)
    showModal.value = true
  }

  function closeModal() {
    showModal.value = false
  }

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      currentPage.value = page
      loadPokemons()
    }
  }

  const visiblePages = computed(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (currentPage.value <= 3) return [1, 2, 3, 4, 5]
    if (currentPage.value >= totalPages - 2)
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [currentPage.value - 2, currentPage.value - 1, currentPage.value, currentPage.value + 1, currentPage.value + 2]
  })

  return {
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
  }
}
