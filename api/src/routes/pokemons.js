const { Router } = require("express");
const { Pokemon, Type } = require("../db.js");
const router = Router();

//----- API -----
const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon/";
const LIMIT = "?limit=40";

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

//----- GETs -----
router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    //-- ALL POKEMONS --
    if (!name) {
      //-- API + DB --
      const pokemons = await getAll();
      return res.status(200).send(
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
    //-- QUERY BY NAME --
    else {
      //--- DB ---
      const pokemonsDB = await getDB();
      const pokemonFoundDB = pokemonsDB.find(
        (p) => p.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      );
      if (pokemonFoundDB) {
        return res.send({
          id: pokemonFoundDB.id,
          name: pokemonFoundDB.name,
          image: pokemonFoundDB.image,
          types: pokemonFoundDB.types.map((e) => e.name),
          attack: pokemonFoundDB.attack,
          created: pokemonFoundDB.created,
        });
      } else {
        const pokemonFoundAPI = await searchByNameAPI(name.toLocaleLowerCase());
        return pokemonFoundAPI
          ? res.send(pokemonFoundAPI)
          : res.status(404).send("The pokemon doesn't exist");
      }
    }
  } catch (error) {
    next(error);
  }
});

//----- GETbyID -----
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id.includes("-")) {
      const pokemonAPI = await searchByIdAPI(id);
      return pokemonAPI
        ? res.send(pokemonAPI)
        : res.status(404).send("The pokemon doesn't exist");
    }
    //--- DB ---
    else {
      const pokemonDB = await Pokemon.findByPk(id, {
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      return pokemonDB
        ? res.send({
            id: pokemonDB.id,
            name: pokemonDB.name,
            image: pokemonDB.image,
            hp: pokemonDB.hp,
            attack: pokemonDB.attack,
            defense: pokemonDB.defense,
            speed: pokemonDB.speed,
            height: pokemonDB.height,
            weight: pokemonDB.weight,
            types: pokemonDB.types.map((e) => e.name),
            created: pokemonDB.created,
          })
        : res.status(404).send("The pokemon doesn't exist");
    }
  } catch (error) {
    next(error);
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

/*

{
  id: pokemonDB.id,
  name: pokemonDB.name,
  image: pokemonDB.image,
  hp: pokemonDB.hp,
  attack: pokemonDB.attack,
  defense: pokemonDB.defense,
  speed: pokemonDB.speed,
  height: pokemonDB.height,
  weight: pokemonDB.weight,
  types: pokemonDB.types.map((e) => e.name),
  created: pokemonDB.created,
}

*/
