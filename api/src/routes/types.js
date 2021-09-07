const { Router } = require("express");
const { Type } = require("../db.js");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const types = await Type.findAll();
    res.send(types);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
