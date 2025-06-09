import Item from '../models/itemModel.js';

// @desc    Get all items
// @route   GET /api/items
// @access  Public
export const getItems = async (req, res) => {
  try {
    const items = await Item.find({}).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single item by ID
// @route   GET /api/items/:id
// @access  Public
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new item
// @route   POST /api/items
// @access  Public
export const createItem = async (req, res) => {
  try {
    const { name, description, category, price, inStock, imageUrl } = req.body;
    
    const newItem = await Item.create({
      name,
      description,
      category,
      price,
      inStock,
      imageUrl,
    });
    
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Public
export const updateItem = async (req, res) => {
  try {
    const { name, description, category, price, inStock, imageUrl } = req.body;
    
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    item.name = name || item.name;
    item.description = description || item.description;
    item.category = category || item.category;
    item.price = price !== undefined ? price : item.price;
    item.inStock = inStock !== undefined ? inStock : item.inStock;
    item.imageUrl = imageUrl || item.imageUrl;
    
    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Public
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    await Item.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};