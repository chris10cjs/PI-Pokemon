const { Router } = require("express");
const { Pokemon, Type } = require("../db.js");
const router = Router();

//----- API -----
const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon/";
const LIMIT = 40;

//--- API ---
const getAPI = async () => {
  const data = (await axios.get(`${URL}?limit=${LIMIT}`)).data.results;
  const arrayData = await Promise.all(data.map((e) => axios.get(e.url)));

  return arrayData.map((e) => {
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
      types: e.data.types.map((e) => ({ name: e.type.name })),
      created: false,
    };
  });
};

//--- DB ---
const getDB = async () => {
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
};

//----- GETs -----
router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    //--- DB ---
    const pokemonsDB = await getDB();
    //--- API ---
    const pokemonsAPI = await getAPI();

    //-- API + DB --
    const pokemons = [...pokemonsDB, ...pokemonsAPI];

    //-- QUERY BY NAME --
    if (name) {
      const pokemonFound = pokemons.find(
        (p) => p.name.toUpperCase() === name.toUpperCase()
      );

      if (!pokemonFound) {
        res.status(404).send("The pokemon doesn't exist");
      } else {
        const { id, name, image, types, attack, created } = pokemonFound;
        res.send({
          id,
          name,
          image,
          attack,
          created,
          types: types.map((e) => e.name),
        });
      }
    } else {
      //-- ALL POKEMONS --
      res.send(
        pokemons.map((e) => ({
          id: e.id,
          name: e.name,
          image: e.image,
          types: e.types.map((e) => e.name),
          attack: e.attack,
          created: e.created,
        }))
      );
    }

    //res.send(pokemonsDB);
  } catch (error) {
    return console.log(error);
  }
});

//----- GETbyID -----
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    //--- DB ---
    const pokemonsDB = await getDB();
    //--- API ---
    const pokemonsAPI = await getAPI();
    //-- API + DB --
    const pokemons = [...pokemonsDB, ...pokemonsAPI];

    const pokemonFound = await pokemons.find((e) => e.id == id);
    if (!pokemonFound)
      return res.status(404).json({ Error: "The pokemon doesn't exist" });
    return res.send(pokemonFound);
  } catch (error) {
    res.send(error);
  }
});

//----- POST -----
router.post("/", async (req, res) => {
  const { name, image, hp, attack, defense, speed, height, weight, types } =
    req.body;
  const newPokemon = await Pokemon.create({
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    types, //arrays de Strings
    //types, //arrays de ID´s
  });

  const typeDB = await Type.findAll({
    where: { name: types },
  });

  res.send(await newPokemon.addType(typeDB)); //agreaga por arrays de Strings
  //res.send(await newPokemon.setTypes(type)); //setea por arrays de ID´s
});

module.exports = router;
