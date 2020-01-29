const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, onlyHouse('gryffindor'), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function onlyHouse(house) {
  return function(req, res, next) {
    if(req.user && req.user.house && req.user.house.toLowerCase() === house) {
      next();
    } else {
      res.status(403).json({ spell: 'Expelliarmus'})    
    }
  }
}

module.exports = router;
