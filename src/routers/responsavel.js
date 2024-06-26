const express = require("express");
const controller = require("../controllers/responsavel");
const middlewares = require("../middlewares/middlewares");

const router = express.Router();

router.get("/", controller.list);
router.get("/concluido", controller.concluido)
router.post("/", middlewares.checkNomeCreate, middlewares.checkDataCreate, controller.create);
router.put("/:id", middlewares.checkUpdate, controller.update);
router.delete("/:id", controller.remove);

module.exports = router;