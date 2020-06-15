const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');


const Dictionary = require('../../model/Dictionary');


// Get many - limit results to 10
router.get('/', async (req, res) => {
    try {
        const terms = await Dictionary.find().limit(10);
        res.json(terms);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get one by term
router.get('/:term', async (req, res) => {
    try {
        const def = req.params.term;
        const term = await Dictionary.findOne({ definition: def.toLowerCase() });
        if (!term) return res.status(400).json({ msg: 'Term not found' });
        res.json(term);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// Insert one 
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
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let term = await Dictionary.findOne({ definition });
        if (term) return res.status(400).json({ errors: [{ msg: 'Term already exists' }] });

        term = await Dictionary.create({ definition, description, completed: true, username, userSocialMedia });
        res.json(term);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;