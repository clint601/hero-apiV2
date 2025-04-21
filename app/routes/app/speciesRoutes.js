const express = require('express');
const router = express.Router();



const { powerDao: dao } = require('../../daos/dao'); // Import the powerDao from the dao module

router.use('/', (req, res, next) => {
    dao.findAll(res, dao.table); // Call the findAll method from powerDao to get all powers
})

router.get('/count', (req, res) => {
    dao.countAll(res, dao.table); // Call the countAll method from powerDao to get the count of all powers
}) 



router.get('/species/:species', (req, res) => {
    dao.findBySpecies(res, dao.table, req.params.species); // Call the findBySpecies method from powerDao to get powers by species
})

router.get('/species/:species/alignment/:alignment', (req, res) => { 
    dao.findBySpeciesAndAlignment(res, dao.table, req.params.species, req.params.alignment); // Call the findBySpeciesAndAlignment method from powerDao to get powers by species and alignment
}
)

router.get('/:id', (req, res) => {
    dao.findById(res, dao.table, req.params.id); // Call the findById method from powerDao to get a power by its ID
})


module.exports = router; // Export the router for use in other parts of the application