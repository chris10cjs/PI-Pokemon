const { Router } = require('express');
const { Pokemon, Type } = require('../db.js');
const router = Router();
const { getAll, getDB, searchByIdAPI, searchByNameAPI } = require('../controllers/index.js');

//----- GETs -----
router.get('/', async (req, res, next) => {
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
        })),
      );
    }
    //-- QUERY BY NAME --
    else {
      //--- DB ---
      const pokemonsDB = await getDB();
      const pokemonFoundDB = pokemonsDB.find(
        (p) => p.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
      );
      if (pokemonFoundDB) {
        return res.status(200).send({
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
          ? res.status(200).send(pokemonFoundAPI)
          : res.status(404).send("The pokemon doesn't exist");
      }
    }
  } catch (error) {
    next(error);
  }
});

//----- GETbyID -----
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id.includes('-')) {
      const pokemonAPI = await searchByIdAPI(id);
      return pokemonAPI
        ? res.status(200).send(pokemonAPI)
        : res.status(404).send("The pokemon doesn't exist");
    }
    //--- DB ---
    else {
      const pokemonDB = await Pokemon.findByPk(id, {
        include: {
          model: Type,
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      });
      return pokemonDB
        ? res.status(200).send({
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
router.post('/', async (req, res, next) => {
  try {
    const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;
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
  } catch (error) {
    next(error);
  }
});

module.exports = router;
