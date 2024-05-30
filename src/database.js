const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testDB',
  password: 'root',
  port: 5432,
});


const getHistory = (city,data) => {
    return new Promise(function(reject) {
        pool.query('INSERT INTO history_query (title,lat,lon,pollution_data) VALUES ($1, $2, $3, $4)', [city,data.coord.lat,data.coord.lon,data.list[0]], (error) => {
        if (error) {
            reject(error)
        }
      })
    }) 
}

module.exports = {
    getHistory
  }