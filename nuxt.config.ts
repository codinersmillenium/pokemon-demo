// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    '~/assets/css/style.css',
    '~/assets/css/tailwind.css'
  ],
  vite: {    
    plugins: [      
      tailwindcss(),    
    ],  
  },
  app: {
    head: {
      title: 'Pokemon - Web Demo',
      meta: [
        { name: 'description', content: 'Demo website showcasing a list of 151 Pokémon from Region 1, complete with types, abilities, and moves using the PokeAPI.' },
        { name: 'keywords', content: 'pokemon, pokedex, region 1, pokémon demo, pokémon api, pokeapi, game, pokémon web' },
        { name: 'robots', content: 'index, follow' },

        { property: 'og:title', content: 'Pokemon - Web' },
        { property: 'og:description', content: 'Pokemon' },
        { property: 'og:image', content: '/logo/logo.png' },
        { property: 'og:type', content: 'website' },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Pokémon Region 1 | Demo Pokedex' },
        { name: 'twitter:description', content: 'Website demo daftar 151 Pokémon Region 1 by ABCD Studio.' },
        { name: 'twitter:image', content: '/favicon.png' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/logo/pokeball.png',
        },
      ],
    },
  },
})
