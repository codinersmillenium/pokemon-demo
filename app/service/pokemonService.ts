import type { Pokemon } from '~/core/pokemon'

const API_BASE = 'https://pokeapi.co/api/v2'
const cache = new Map<number, Pokemon>()

export async function fetchPokemonList(offset = 0, limit = 10): Promise<Pokemon[]> {
  limit = (offset === 150) ? 1 : limit
  const res = await fetch(`${API_BASE}/pokemon?offset=${offset}&limit=${limit}`)
  const data = await res.json()

  const results = await Promise.all(
    data.results.map(async (p: any) => {
      const detail = await fetch(p.url).then((r) => r.json())
      const pokemon: Pokemon = {
        id: detail.id,
        name: detail.name,
        height: detail.height,
        weight: detail.weight,
        types: detail.types.map((t: any) => t.type.name),
        image: detail.sprites.other['official-artwork'].front_default,
      }
      cache.set(detail.id, pokemon)
      return pokemon
    })
  )

  return results
}

export async function fetchPokemonDetail(id: number): Promise<Pokemon> {
  if (cache.has(id)) {
    const cached = cache.get(id)!
    if (cached.abilities && cached.moves) return cached
  }

  const res = await fetch(`${API_BASE}/pokemon/${id}`)
  const data = await res.json()
  const pokemon: Pokemon = {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    types: data.types.map((t: any) => t.type.name),
    image: data.sprites.other['official-artwork'].front_default,
    abilities: data.abilities.map((a: any) => a.ability.name),
    moves: data.moves.map((m: any) => m.move.name),
  }

  cache.set(id, pokemon)
  return pokemon
}