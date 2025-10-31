import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/component/**/*.{vue,js,ts}',
    './app/layouts/**/*.{vue,js,ts}',
    './app/pages/**/*.{vue,js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
