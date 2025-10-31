<template>
  <transition name="fade-zoom">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        class="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 max-w-md w-full border border-gray-200 dark:border-gray-700 transform transition-all duration-300 scale-100 hover:scale-[1.01] animate-fade-in overflow-y-auto max-h-[90vh]"
        :class="borderColorClass"
      >
        <!-- Close Button -->
        <button
          class="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition"
          @click="$emit('close')"
        >
          x
        </button>

        <!-- Pokemon Image -->
        <div class="flex flex-col items-center text-center">
          <div
            class="relative w-36 h-36 mb-4 rounded-full shadow-lg flex items-center justify-center"
            :class="bgColorClass"
          >
            <img
              :src="pokemon.image"
              alt="Pokemon"
              class="w-28 h-28 object-contain drop-shadow-md transition-transform duration-300 hover:scale-110"
            />
          </div>

          <!-- Name & ID -->
          <h2 class="text-2xl font-bold capitalize text-gray-800 dark:text-white">
            {{ pokemon.name }}
          </h2>
          <span class="text-white text-xl px-3 py-1">
            #{{ pokemon.id.toString().padStart(3, '0') }}
          </span>        
        </div>

        <div class="flex justify-center items-center gap-10 mt-2">
            <div class="text-center">
                <p class="text-md uppercase text-gray-500 dark:text-gray-400">Height</p>
                <p class="font-semibold text-gray-800 dark:text-white">{{ pokemon.height }}</p>
            </div>
            <div class="text-center">
                <p class="text-md uppercase text-gray-500 dark:text-gray-400">Weight</p>
                <p class="font-semibold text-gray-800 dark:text-white">{{ pokemon.weight }}</p>
            </div>
        </div>
        <!-- Info Section -->
        <div class="mt-4 grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-200">
          <div class="col-span-2">
            <p class="text-xs uppercase text-gray-500 dark:text-gray-400">Type</p>
            <div class="flex gap-2 justify-start mt-2">
              <span
                v-for="type in pokemon.types"
                :key="type"
                class="text-white text-xs px-3 py-1 rounded-full shadow"
                :class="getTypeColor(type)"
              >
                {{ type }}
              </span>
            </div>
          </div>
        </div>

        <!-- Abilities -->
        <div class="mt-5">
          <p class="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">
            Abilities
          </p>
          <p class="text-sm text-gray-700 dark:text-gray-300">
            {{ pokemon.abilities?.join(', ') || '-' }}
          </p>
        </div>

        <!-- Moves -->
        <div class="mt-4">
            <p class="text-xs uppercase text-gray-500 dark:text-gray-400 mb-1">
                Moves
            </p>
            <span class="text-sm text-gray-700 dark:text-gray-300">
                {{ displayedMoves.join(', ') }}
                <span v-if="(pokemon.moves?.length ?? 0) > 20">
                {{ showAllMoves ? '' : '...' }}
                </span>
            </span>
            <div v-if="(pokemon.moves?.length ?? 0) > 20" class="mt-1">
                <button
                class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                @click="toggleShowMoves"
                >
                {{ showAllMoves ? 'Show Less' : 'Show More' }}
                </button>
            </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
    import { ref, computed } from "vue";
    import type { Pokemon } from "~/core/pokemon";
    import { typeClasses } from '~/utils/utils';

    const props = defineProps<{ show: boolean; pokemon: Pokemon }>();
    defineEmits(["close"]);

    const getTypeColor = (type: string) => typeClasses[type.toLowerCase()] || "bg-gray-300";
    const showAllMoves = ref(false)
    const toggleShowMoves = () => {
        showAllMoves.value = !showAllMoves.value
    }
    const displayedMoves = computed(() => {
        if (!props.pokemon?.moves) return []
        return showAllMoves.value ? props.pokemon.moves : props.pokemon.moves.slice(0, 20)
    })

    const mainType = computed(() => props.pokemon.types[0] || 'normal')
    const borderColorClass = computed(() => typeClasses[mainType.value]?.border || 'border-gray-300')
    const bgColorClass = computed(() => typeClasses[mainType.value]?.bg || 'bg-gray-300')
</script>

<style scoped>
    .fade-zoom-enter-active,
    .fade-zoom-leave-active {
        transition: all 0.35s ease;
    }
    .fade-zoom-enter-from {
        opacity: 0;
        transform: scale(0.9);
    }
    .fade-zoom-leave-to {
        opacity: 0;
        transform: scale(0.9);
    }
</style>
