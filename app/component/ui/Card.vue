<template>
  <div
    class="pokemon rounded-xl p-4 shadow-md transition duration-200 hover:scale-[1.02] cursor-pointer"
    :class="'border-2 ' + borderColorClass"
    @click="$emit('select', pokemon.id)"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm font-semibold">
        #{{ formattedNumber }}
      </span>
      <span
        class="type-icon w-4 h-4 shadow-md"
        :class="bgColorClass"
        :title="pokemon.types.join('/')"
      ></span>
    </div>

    <!-- Image -->
    <div class="flex justify-center items-center bg-gray-50 rounded-lg mb-3">
      <img
        loading="lazy"
        :src="pokemon.image"
        :alt="pokemon.name"
        class="w-24 h-24 object-contain"
      />
    </div>

    <!-- Info -->
    <div class="text-center">
      <h3 class="capitalize font-bold mb-1">
        {{ pokemon.name }}
      </h3>

      <div class="flex justify-around text-sm mb-2">
        <div>
          <small class="block">Weight</small>
          <span class="font-medium">{{ pokemon.weight }}</span>
        </div>
        <div>
          <small class="block">Height</small>
          <span class="font-medium">{{ pokemon.height }}</span>
        </div>
      </div>

      <div class="text-sm">
        <small>Type: </small>
        <span class="font-semibold text-gray-400">
          {{ pokemon.types.join('/') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import type { Pokemon } from '~/core/pokemon';
    import { typeClasses } from '~/utils/utils';

    const props = defineProps<{ pokemon: Pokemon }>()
        defineEmits(['select'])
        const formattedNumber = computed(() => props.pokemon.id.toString().padStart(3, '0')
    )
    const mainType = computed(() => props.pokemon.types[0] || 'normal')
    const borderColorClass = computed(() => typeClasses[mainType.value]?.border || 'border-gray-300')
    const bgColorClass = computed(() => typeClasses[mainType.value]?.bg || 'bg-gray-300')
</script>