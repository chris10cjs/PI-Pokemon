const { Pokemon, Type } = require("../db.js");
const axios = require("axios");
//----- API -----
const URL = "https://pokeapi.co/api/v2/pokemon/";
const LIMIT = 40;

//----- GET LIST API & DB -----

//-- DB --
const getDB = async () => {
  try {
    const pokemonsDB = await Pokemon.findAll({
      // attributes: ["name", "image"],
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
    return pokemonsDB;
  } catch (error) {
    res.send(error);
  }
};

//-- API --
const getAPI = async () => {
  try {
    const data = (await axios.get(`${URL}?limit=${LIMIT}`)).data.results;
    const arrayData = await Promise.all(data.map((e) => axios.get(e.url)));

    const pokemonsAPI = arrayData.map((e) => {
      return {
        id: e.data.id,
        name: e.data.name,
        image: e.data.sprites.other.dream_world.front_default,
        hp: e.data.stats[0].base_stat,
        attack: e.data.stats[1].base_stat,
        defense: e.data.stats[2].base_stat,
        speed: e.data.stats[5].base_stat,
        height: e.data.height,
        weight: e.data.weight,
        type: e.data.types.map((e) => ({ name: e.type.name })),
      };
    });
    return pokemonsAPI;
  } catch (error) {
    res.send(error);
  }
};

//----- ROUTES -----

//----- GET ALL -----
const getAll = async (req, res) => {
  const { name } = req.query;

  try {
    //-- API + DB --
    //const pokemons = Promise.all([getDB(), getAPI()]);
    const pokemons = [...(await getDB()), ...(await getAPI())];

    //query by name
    if (name) {
      const pokemonFound = pokemons.find((p) => p.name === name);

      if (!pokemonFound) {
        res.status(404).json({ Error: "The pokemon doesn't exist" });
      } else {
        const { name, image, type } = pokemonFound;
        res.send({ name, image, type: type.map((e) => e.name) });
      }
    }
    //all pokemons
    res.send(
      pokemons.map((e) => ({
        name: e.name,
        image: e.image,
        type: e.type.map((e) => e.name),
      }))
    );
  } catch (error) {
    res.send(error);
  }
};

//----- GET BY ID -----
const getById = async (req, res) => {
  const { id } = req.params;

  try {
    //-- API + DB --
    const pokemons = [...(await getDB()), ...(await getAPI())];

    const pokemonFound = await pokemons.find((e) => e.id == id);
    if (!pokemonFound)
      return res.status(404).json({ Error: "The pokemon doesn't exist" });
    return res.send(pokemonFound);
  } catch (error) {
    res.send(error);
  }
};

//----- POST -----
const addPokemon = async (req, res) => {
  const { name, image, hp, attack, defense, speed, height, weight, type } =
    req.body;

  try {
    const newPokemon = await Pokemon.create({
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    res.send(await newPokemon.setTypes(type));
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getAll, getById, addPokemon };
