const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');


const Dictionary = require('../../model/Dictionary');

// Render add-term form view
router.get('/add', (req, res) => {
    res.render('addTerm', { style: 'addTerm' });
});

// Render find-term input view
router.get('/find', (req, res) => {
    res.render('term', { style: 'style' });
});

// Get many - limit results to 10
router.get('/', async (req, res) => {
    try {
        const terms = await Dictionary.find({ approved: true }).limit(10).lean();
        if (!terms) return res.status(404).json({ msg: 'There are currently no terms in the database or no terms have been approved' });

        res.render('terms', { terms, style: 'style' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get one by term
router.get('/find/:term', async (req, res) => {
    try {
        const term = await Dictionary.findOne({ definition: req.params.term });
        if (!term) return res.status(404).json({ msg: 'Term not found' });
        res.json(term);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// Insert one term
router.post('/add', [
    check('definition', 'Term definition is required').not().isEmpty(),
    check('description', 'Term description is required').not().isEmpty(),
    check('username', 'Name is required').not().isEmpty(),
], async (req, res) => {
    const {
        definition,
        description,
        username,
        userSocialMedia
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        let term = await Dictionary.findOne({ definition });
        if (term) return res.status(400).json({ errors: [{ msg: 'Term already exists' }] });

        term = await Dictionary.create({ definition, description, approved: false, username, userSocialMedia });
        res.json(term);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;