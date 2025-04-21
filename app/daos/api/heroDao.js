const con = require('../../config/dbconfig')

const heroDao = {
    table: 'hero', // let it know what table I'm going to use

    findHeroes: (res, table) => {
        con.execute( // we can put ${table} if we want for the table name.
            `select h.hero_id, h.hero_name, h.alias, h.first_name, h.last_name, f.franchise, s.species, h.place_of_origin, h.first_app, h.alignment, h.img_url
            from hero h
            join franchise f using (franchise_id)
            join species s using (species_id);`,
            (error, rows) => {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows);
                    } else {
                        res.json(rows);
                    }
                } else {
                    console.log('DAO error', error);
                }
            }
        )
    },

    fineHeroById: (res, table, id) => {
        let powers = []
        let rivals = []

        con.execute(
            `SELECT h.hero_id, p.power
            FROM hero h
            JOIN hero_to_power hp ON h.hero_id = hp.hero_id
            JOIN power p ON p.power_id = hp.power_id
            WHERE h.hero_id = ${id};`,
            (error, rows)=> {
                if (!error) {
                    Object.values(rows).forEach(obj => {
                        powers.push(obj.power)
                    })
                    con.execute(
                        `SELECT h1.hero_name hero, h2.hero_name rival
                        FROM hero_to_rival hr 
                        JOIN hero h1 ON h1.hero_id = hr.hero_id
                        JOIN hero h2 ON h2.hero_id = hr.rival_id
                        WHERE h1.hero_id = ${id};`,
                        (error, rows)=> {
                            if (!error) {
                                Object.values(rows).forEach(obj => {
                                    rivals.push(obj.rival)
                                })

                                con.execute(
                                    `SELECT h.hero_id, 
                                    h.hero_name, h.first_name,
                                    h.last_name, h.alias, 
                                    f.franchise, s.species, h.place_of_origin, 
                                    h.first_app, h.alignment, h.img_url
                                    FROM hero h
                                    JOIN franchise f USING (franchise_id)
                                    JOIN species s USING (species_id)
                                    WHERE h.hero_id = ${id};`,
                                    (error, rows)=> {
                                        rows.forEach(row => {
                                            row.powers = powers
                                            row.rivals = rivals
                                        })

                                        if (!error) {
                                            if (rows.length === 1) {
                                                res.json(...rows)
                                            } else {
                                                res.json(rows)
                                            }
                                        } else {
                                            console.log(`DAO Error: ${table} `, error)
                                        }
                                    }
                                )
                            }
                        }
                    )
                } else {
                    console.log(error)
                }
            }
        )
    }
}

module.exports = heroDao;