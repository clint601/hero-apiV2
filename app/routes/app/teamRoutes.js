const router = require('express').Router(); // Import the express router
// writing it on one line 

const { teamDao: dao } = require('../../daos/dao') // Import the teamDao from the dao module

router.get('/', (req, res) =>  {
    dao.findAll(res, dao.table) // Call the findAll method from teamDao to get all teams
})


router.get('/count', (req, res) => {
    dao.countAll(res, dao.table) // Call the countAll method from teamDao to get the count of all teams
})

router.get('/team/:team', (req, res) => {
    dao.findByTeam(res, dao.table, req.params.team) // Call the findByTeam method from teamDao to get teams by name
})





router.get('/:id', (req, res) => {
    dao.findById(res, dao.table, req.params.id) // Call the findById method from teamDao to get a team by its ID
})














module.exports = router;    