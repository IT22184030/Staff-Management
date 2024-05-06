const Item = require("../models/itemModel");

// Controller to handle getting all items
const getItemController = async (_req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Controller to handle adding a new item
const addItemController = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json({ message: "Item added successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Bad request" });
  }
};

//update item
const editItemController = async(req, res) => {
  try {
      const {itemId } = req.body;
      console.log(itemId);
      await Item.findOneAndUpdate({ _id: itemId }, req.body ,{
        new:true,
      });
      res.status(201).send("Item updated successfully");
  } catch (error) {
      res.status(400).send(error);
      console.error(error);
  }
};

//delete item
const deleteItemController = async(req, res) => {
  try {
      const {itemId } = req.body;
      await Item.findOneAndDelete({ _id: itemId });
      res.status(200).send("Item deleted successfully");
  } catch (error) {
      res.status(400).send(error);
      console.error(error);
  }
};


module.exports = {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController
};
