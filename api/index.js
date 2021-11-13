//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const server = require("./src/app.js");

const { conn, Type } = require("./src/db.js");
const axios = require("axios");
//----- API -----
const URL = "https://pokeapi.co/api/v2/type/";

// Syncing all the models at once.
conn.sync({ force: false}).then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`%s listening at ${process.env.PORT}`); // eslint-disable-line no-console

    //----- PRELOAD TYPES -----
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

        const typesDB = await Type.findOrCreate({
          where: {
            name: typesAPI.map((e) => e.name),
          },
        });

        return typesDB;
      } catch (error) {
        console.log(error);
      }
    };

    getTypesAPI().then((response) => {
      return response;
    });
  });
});
