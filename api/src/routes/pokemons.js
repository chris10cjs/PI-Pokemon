//const axios = require("axios");
const { Router } = require("express");
const { getAll, getById, addPokemon } = require("../controllers/pokemons.js");
const router = Router();

const { Pokemon } = require("../db.js");

//----- GETs -----

router.get("/", getAll);

router.get("/:id", getById);

//----- POST -----
router.post("/", addPokemon);

/*
  //----- PUT -----
  router.put("/:id", async function (req, res) {
    const { id } = req.params;
    const pokemon = req.body;
    try {
      const updatedPokemon = await Pokemon.update(pokemon, {
        where: {
          id,
        },
      });
      res.send(updatedPokemon);
    } catch (error) {
      res.send(error);
    }
  });

  //----- DELETE -----
  router.delete("/:id", async function (req, res) {
    const { id } = req.params;
    try {
      await Pokemon.destroy({
        where: {
          id,
        },
      });
      res.sendStatus(200);
    } catch (error) {
      res.send(error);
    }
  });
*/
module.exports = router;
