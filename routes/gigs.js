const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Op = Sequelize.Op;
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

router.get('/add', (req, res) => res.render('add'));

router.post('/add', (req, res) => {
    let { title, technologies, description, budget, contact_email } = req.body;
    let errors = [];
    if(!title) {
        errors.push({ text: "Gigs require a title"});
    }
    if(!technologies) {
        errors.push({ text: "Gigs require a list of technologies"});
    }
    if(!description) {
        errors.push({ text: "Gigs require a description"});
    }
    if(!contact_email) {
        errors.push({ text: "Gigs require a contact email"});
    }
    if(errors.length > 0) {
        res.render('add', {
            errors,
            title,
            technologies,
            description,
            budget,
            contact_email
        });
    } else {
        if(!budget) {
            budget = "Unknown";
        } else {
            budget = `$${budget}`;
        }
        technologies = technologies.toLowerCase().replace(/, /g, ',');
        Gig.create({
            title,
            technologies,
            description,
            budget,
            contact_email
        })
          .then(gig => res.redirect('/gigs'))
          .catch(err => console.log(`Error: ${err}`));
    }
});

router.get('/search', (req, res) => {
    let { term } = req.query;
    term = term.toLowerCase();
    Gig.findAll({ where: { technologies: { [Op.like]: `%${term}%` } } })
      .then(gigs => res.render('gigs', {
          gigs
      }))
      .catch(err => console.log(`Error: ${err}`));
});

module.exports = router;