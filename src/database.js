const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testDB',
  password: 'root',
  port: 5432,
});


const saveHistory = (city,data) => {
  return new Promise(function(reject) {
      pool.query('INSERT INTO history_query (title,lat,lon,pollution_data,datetime) VALUES ($1, $2, $3, $4, $5)', [city,data.coord.lat,data.coord.lon,data.list[0],new Date().toLocaleString()], (error) => {
      if (error) {
          reject(error)
      }
    })
  }) 
}

const registrationUser = (body) => {
return new Promise(function(reject) {
    pool.query('INSERT INTO users (login,password,email) VALUES ($1, $2, $3)', [body.login,body.pass,body.email], (error) => {
    if (error) {
        reject(error)
    }
  })
}) 
}

const getUser = (body) => {
return new Promise(function(resolve, reject) {
  pool.query('SELECT id FROM users WHERE login = $1 AND password = $2',[body.login,body.pass], (error, results) => {
    if (error) {
      reject(error)
    }
    resolve(results.rows);
  })
}) 
}

module.exports = {
  saveHistory,
  registrationUser,
  getUser
}