const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items-controller");

// Create, read, update, and delete items
router.post("/", itemsController.createItem);
router.get("/", itemsController.readItems);
router.get("/:itemId", itemsController.readItem);
router.put("/:itemId", itemsController.updateItem);
router.delete("/:itemId", itemsController.deleteItem);

module.exports = router;
