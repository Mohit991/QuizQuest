const Category = require('../models/Category')
const asyncHandler = require('express-async-handler')

// @desc Get all categories 
// @route GET /api/categories
// @access Private
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.findAll()
    if (!categories?.length) {
        return res.status(400).json({ message: 'No categories found' })
    }
    res.json(categories)
})

// @desc Get add categories
// @route POST /api/categories
// @access Private
const addCategories = async (req, res) => {
    try {
      const { category_name } = req.body;
  
      if (!category_name) {
        return res.status(400).json({ message: 'Category name is required' });
      }

      const newCategory = await Category.create({ category_name });

      res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
};

// @desc Update a category
// @route PUT /api/categories/:id
// @access Private
const updateCategories = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: `Category with ID ${req.params.id} not found` });
        }

        if (!req.body.category_name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        await category.update(req.body);
        res.status(200).send(category);
    } catch (error) {
        res.status(400).json({ message: 'An error occurred while updating the category', error: error.message });
    }
};


// @desc Delete a category
// @route delete /api/categories/:id
// @access Private
const deleteCategories = async (req, res) => {
    try {
        const id = req.params.id; 
        
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Delete the category
        await category.destroy();

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllCategories,
    addCategories,
    updateCategories,
    deleteCategories
}
