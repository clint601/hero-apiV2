const express = require('express')
const router = express.Router()

const { heroDao: dao } = require('../../daos/dao') 

// localhost:3000/api/hero
router.get('/',( req, res)=> {
    dao.findHeroes(res, dao.table)
})

router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table)
})

//by alignment
router.get('/alignment/:alignment', (req, res)=> {
    dao.fineByAligment(res, dao.table, req.params.alignment)
})

//sort
router.get('/sort', (req, res)=> {
    dao.sort(res, dao.table)
})


// localhost:3000/api/hero/id
router.get('/:id', (req, res)=> {
    dao.fineHeroById(res, dao.table, req.params.id)
})


module.exports = router