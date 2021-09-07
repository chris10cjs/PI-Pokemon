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
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console

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

        const typesDB = await Type.bulkCreate(typesAPI);

        return typesDB;
      } catch (error) {
        send(error);
      }
    };

    getTypesAPI().then((response) => {
      return response;
    });
  });
});
