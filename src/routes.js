const routes = require("express").Router();

const authMiddleware = require("./app/middleware/auth");

const SessionController = require("./app/controllers/SessionController");

// routes.post("/session", (req, res) => {});

routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);

routes.get("/dashboard", (req, res) => {
  return res.status(200).send();
});
// const { User } = require("./app/models");

//Routas

/**Teste 
// User.create({
//   name: "Luan",
//   email: "bugvoid@gmail.com",
//   password_hash: "789w99s66"
// });
*/

module.exports = routes;
