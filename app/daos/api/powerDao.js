const con = require('../../config/dbconfig')

const powerDao = {
    table: 'power', // let it know what table I'm going to use

    fineHeroByPower: (res, table, power) => {
            con.execute( // we can put ${table} if we want for the table name.
                `select h.hero_id, h.hero_name, h.alias, h.first_name, h.last_name, f.franchise, s.species, h.place_of_origin, h.first_app, h.alignment, h.img_url
                from hero h
                join franchise f using (franchise_id)
                join species s using (species_id)
                join hero_to_power hp on hero_id = hp.hero_id
                join power p on hp.power_id = p.power_id
                where p.power = '${power}'
                order by h.hero_id;`,
                error, rows => {
                    if (!error) {
                        if (rows.length === 1) {
                            res.json(...rows);
                        } else {
                            res.json(rows);
                        }
                    } else {
                        console.log(`DAO Error: ${table} `, error);
                    }
                }
        )
    }
}

    module.exports = powerDao