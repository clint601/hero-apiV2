const express = require('express')
const router = express.Router()

const { heroDao: dao } = require('../../daos/dao')

//localhost:3000/api/hero
router.get('/', (req, res) => {
    dao.findHeroes(res, dao.table)
})


//localhost:3000/api/hero/:id
router.get('/:id', (req, res) => {
    dao.fineHeroById(res, dao.table, id)
})
















module.exports = router