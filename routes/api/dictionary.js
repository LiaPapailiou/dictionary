const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const Dictionary = require('../../model/Dictionary');

router.get('/add', (req, res) => {
  res.render('addTerm', { style: 'addTerm' });
});

router.get('/', async (req, res) => {
  try {
    const terms = await Dictionary.find({ approved: true }).limit(5).lean();
    if (!terms) return res.status(404).json({ msg: 'There are currently no terms in the database or no terms have been approved' });
 
    res.render('terms', { terms, style: 'style' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.get('/find/:term', async (req, res) => {
  try {
    const term = await Dictionary.find({ definition: req.params.term }).lean();
    if (!term) return res.status(404).json({ msg: 'Term not found' });
    res.render('term', { term, approved: true, style: 'style' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.post('/add', [
  check('definition', 'Term definition is required').not().isEmpty(),
  check('description', 'Term description is required').not().isEmpty(),
  check('username', 'Name is required').not().isEmpty(),
], async (req, res) => {
  const {
    definition,
    termType,
    phoneticSpelling,
    description,
    username,
    userSocialMedia,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    let term = await Dictionary.findOne({ definition });
    if (term) return res.status(400).json({ errors: [{ msg: 'Term already exists' }] });

    term = await Dictionary.create({
      definition,
      termType,
      phoneticSpelling,
      description,
      approved: false,
      username,
      userSocialMedia,
    });
    res.json(term);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
