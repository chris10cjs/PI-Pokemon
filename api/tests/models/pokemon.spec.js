const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Pokemon.create({ name: "Pikachu" });
      });
    });
    //
    describe("hp", () => {
      it("should throw an error if hp is not integer", (done) => {
        Pokemon.create({ name: "test", hp: "numero" })
          .then(() => done(new Error("It requires a valid hp. It´s a integer")))
          .catch(() => done());
      });
      it("should work when its a valid hp", () => {
        Pokemon.create({ name: "test", hp: 10 });
      });
    });
    //
  });
});
