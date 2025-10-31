export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  types: string[]
  image: string
  abilities?: string[]
  moves?: string[]
}