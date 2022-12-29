const routes = require("express").Router();
const passwordController = require("../controllers/PasswordController");

// Aqui acontece o controle das rotas da API.

routes.get("/api", passwordController.getApi);
routes.post("/verify", passwordController.verify);


module.exports = routes;