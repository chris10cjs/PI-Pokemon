const { Type } = require("../db.js");
const axios = require("axios");
//----- API -----
const URL = "https://pokeapi.co/api/v2/type/";

//----- GET TYPES API -----

const getTypesAPI = async () => {
  try {
    //-- API --
    const data = (await axios.get(URL)).data.results;
    const arrayData = await Promise.all(data.map((e) => axios.get(e.url)));

    const typesAPI = arrayData.map((e) => {
      return {
        id: e.data.id,
        name: e.data.name,
      };
    });

    return typesAPI;
  } catch (error) {
    send(error);
  }
};

const addTypesDB = async () => {
  try {
    const types = await getTypesAPI();
    const typesDB = await Type.bulkCreate(types);

    return typesDB;
  } catch (error) {
    send(error);
  }
};

const getTypes = async (req, res) => {
  try {
    const types = await addTypesDB();
    res.send(types);
  } catch (error) {
    send(error);
  }
};

module.exports = getTypes;
