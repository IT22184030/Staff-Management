const express = require("express");
const {getItemController,addItemController,editItemController,deleteItemController}  = require ("./../controllers/itemController");
const router = express.Router();

//routes
//method
router.get("/get-item", getItemController);

//Method post
router.post("/add-item", addItemController);

//Method put
router.post("/edit-item", editItemController);

//Method Delete
router.post("/delete-item", deleteItemController);

module.exports = router;
