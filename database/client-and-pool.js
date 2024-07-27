const { Client, Pool } = require('pg')
require('dotenv').config()

const client = new Client({
  connectionString: process.env.CONNECTION_URL
})

const pool = new Pool({
  connectionString: process.env.CONNECTION_URL
})

module.exports = { client, pool }
