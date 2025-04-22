const express = require('express');
const router = express.Router();



const { speciesDao: dao } = require('../../daos/dao'); // Import the speciesDao from the dao module

router.use('/', (req, res) => {
    dao.findAll(res, dao.table); // Call the findAll method from speciesDao to get all speciess
})

router.get('/count', (req, res) => {
    dao.countAll(res, dao.table); // Call the countAll method from speciesDao to get the count of all 
}) 



router.get('/species/:species', (req, res) => {
    dao.findBySpecies(res, dao.table, req.params.species); // Call the findBySpecies method from speciesDao to get speciess by species
})

router.get('/species/:species/alignment/:alignment', (req, res) => { 
    dao.findBySpeciesAndAlignment(res, dao.table, req.params.species, req.params.alignment); // Call the findBySpeciesAndAlignment method from speciesDao to get speciess by species and alignment
}
)

router.get('/:id', (req, res) => {
    dao.findById(res, dao.table, req.params.id); // Call the findById method from speciesDao to get a species by its ID
})


module.exports = router; // Export the router for use in other parts of the application