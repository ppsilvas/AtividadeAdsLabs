const express = require("express");
const controller = require("../controllers/tarefa");
const middlewares = require("../middlewares/middlewares");

const router = express.Router();

router.get("/", controller.list);
//router.get("/filtro/", controller.filtros);
router.post("/", middlewares.checkConclusao, controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;