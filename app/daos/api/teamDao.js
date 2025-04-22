const con = require('../../config/dbconfig')    
const { table } = require('./heroDao')

const teamDao = {
    table: 'team', // let it know what table I'm going to use
    findheroesByTeam: (res, table, team) => {
        `select h.hero_id h.hero_id, h.hero_name, h.alias, h.first_name, h.last_name, f.franchise, s.species, h.place_of_origin, h.first_app, h.alignment, h.img_url
        from hero h
        join franchise f using (franchise_id)
        join species s using (species_id)
        join hero_team ht on h.hero_id = ht.hero_id
        join team t on ht.team_id = t.team_id
        where t.team = '${team}'
        order by h.hero_id;`,
        (error, rows)=> {
            if (!error) {
                if (rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log(`DAO Error: , ${table}`, error)
            }
        }
    }
}




module.exports = teamDao















