const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags including their associated Product data
router.get('/', (req, res) => {
  try {
    const tags = Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id` including its associated Product data
router.get('/:id', (req, res) => {
  try {
    const tag = Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if (!tag) {
      res.status(404).json({ message: 'No tag found with that id' });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', (req, res) => {
  try {
    const tag = Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  try {
    const tag = Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        },
      });
    if (!tag[0]) {
      res.status(404).json({ message: 'No tag with this id' });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const tag = Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found with that id' });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
