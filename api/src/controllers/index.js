const { LIMIT, URL } = require("../configs/constants.js");
const { Pokemon, Type } = require("../db.js");
const axios = require("axios");

//--- POKEMONS API ---
const getAPI = async () => {
  try {
    const data = (await axios.get(`${URL}${LIMIT}`)).data.results;
    const arrayData = await Promise.all(data.map((e) => axios.get(e.url)));

    return arrayData.map((e) => {
      return {
        id: e.data.id,
        name: e.data.name,
        image: e.data.sprites.other["official-artwork"].front_default,
        hp: e.data.stats[0].base_stat,
        attack: e.data.stats[1].base_stat,
        defense: e.data.stats[2].base_stat,
        speed: e.data.stats[5].base_stat,
        height: e.data.height,
        weight: e.data.weight,
        types: e.data.types.map((e) => ({ name: e.type.name })),
        created: false,
      };
    });
  } catch (error) {
    console.error(error);
  }
};

//--- POKEMONS DB ---
const getDB = async () => {
  try {
    return await Pokemon.findAll({
      include: [
        {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
};

//-- API + DB --
const getAll = async () => {
  try {
    const pokemonsDB = await getDB();
    const pokemonsAPI = await getAPI();

    return [...pokemonsDB, ...pokemonsAPI];
  } catch (error) {
    console.error(error);
  }
};

//-- SEARCH POKEMON API BY NAME--
const searchByNameAPI = async (name) => {
  try {
    const pokemonFound = (await axios.get(`${URL}${name}`)).data;
    if (pokemonFound) {
      return {
        id: pokemonFound.id,
        name: pokemonFound.name,
        image: pokemonFound.sprites.other["official-artwork"].front_default,
        hp: pokemonFound.stats[0].base_stat,
        attack: pokemonFound.stats[1].base_stat,
        defense: pokemonFound.stats[2].base_stat,
        speed: pokemonFound.stats[5].base_stat,
        height: pokemonFound.height,
        weight: pokemonFound.weight,
        types: pokemonFound.types
          .map((e) => ({ name: e.type.name }))
          .map((e) => e.name),
        created: false,
      };
    }
  } catch (error) {
    console.error(error);
  }
};

//-- SEARCH POKEMON API BY ID--
const searchByIdAPI = async (id) => {
  const pokemonFound = (await axios.get(`${URL}${id}`)).data;

  if (pokemonFound) {
    return {
      id: pokemonFound.id,
      name: pokemonFound.name,
      image: pokemonFound.sprites.other["official-artwork"].front_default,
      hp: pokemonFound.stats[0].base_stat,
      attack: pokemonFound.stats[1].base_stat,
      defense: pokemonFound.stats[2].base_stat,
      speed: pokemonFound.stats[5].base_stat,
      height: pokemonFound.height,
      weight: pokemonFound.weight,
      types: pokemonFound.types
        .map((e) => ({ name: e.type.name }))
        .map((e) => e.name),
      created: false,
    };
  }
};

module.exports = {
  getAPI,
  getDB,
  getAll,
  searchByNameAPI,
  searchByIdAPI,
};
