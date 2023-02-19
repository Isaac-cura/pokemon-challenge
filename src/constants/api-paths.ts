const apiBase = process.env.VUE_APP_API_BASE;

export const apiPaths = {
    getAllPokemons: (limit: number, offset: number) =>
        `${apiBase}/pokemon?limit=${limit}&offset=${offset}`,
    pokemonImage: (pokemonId: number) =>
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`,
    getPokemonByName: (name: string) => 
        `https://pokeapi.co/api/v2/pokemon/${name}/`
}