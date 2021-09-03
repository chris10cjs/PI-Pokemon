const { Router } = require("express");

const router = Router();

const pokemonsRouter = require("./pokemons.js");
const typesRouter = require("./types.js");

//----- Routes Config -----
router.use("/pokemons", pokemonsRouter);
router.use("/types", typesRouter);

module.exports = router;
