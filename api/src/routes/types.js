const { Router } = require("express");
const { Type } = require("../db.js");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const types = await Type.findAll();
    res.status(200).send(types);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
