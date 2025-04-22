const express = require('express');
const router = express.Router();


const { franchiseDao: dao } = require('../../daos/dao'); // Import the franchiseDao from the dao module     



// localhost:3000/api/franchise
router.get('/', (req, res) => {
    dao.findAll(res, dao.table) // Call the findAll method from franchiseDao to get all franchises
})

router.get('/count', (req, res) => {
    dao.countAll(res, dao.table) // Call the countAll method from franchiseDao to get the count of all franchises
})

router.get('/fran/:franchise' , (req, res) => {    
    dao.fineHeroesByFranchise(res, dao.table, req.params.franchise) // Call the findByFranchise method from franchiseDao to get franchises by name
}   
)


router.get('/:id', (req, res) => {
    dao.findById(res, dao.table, req.params.id) // Call the findById method from franchiseDao to get a franchise by its ID
})

module.exports = router;