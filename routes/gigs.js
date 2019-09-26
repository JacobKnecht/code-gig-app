const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');
const Gig = require('../models/Gig');

router.get('/', (req, res) => {
    Gig.findAll()
      .then(gigs => {
          res.render('gigs', {
              gigs
          });
      })
      .catch(err => console.log(`Error: ${err}`));
});



module.exports = router;