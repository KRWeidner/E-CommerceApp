const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories including their associated Products
router.get('/', (req, res) => {
  try{
    const categories = Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value including its associated Products
router.get('/:id', (req, res) => {
  try {
    const category = Category.findByPk( req.params.id, {
      include: [{model: Product}],
    })
    if (!category) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', (req, res) => {
  try {
    const category = Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  try {
    const category = Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        },
    });
    if(!category[0]){
      res.status(404).json({ message: 'No category with this id' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const category = Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
