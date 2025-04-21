const daoCommon = require('./common/daoCommon')


const heroDao = {
    ...daoCommon, // this will import all the functions from daoCommon
    ...require('./api/heroDao'), // this will import all the functions from heroDao
}

const powerDao = {
    ...daoCommon,
    ...require('./api/powerDao')
}

const speciesDao = {
    ...daoCommon,
    ...require('./api/speciesDao')
}   


module.exports = {
    heroDao,
    powerDao,
    speciesDao

}