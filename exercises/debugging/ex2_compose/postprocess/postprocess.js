//POSTGRES CODE
const { Client } = require('pg')
const fs = require('node:fs')

async function main() {
    // NOTE: This is global, which is not recommended in production
    let password = "123"
    
    if (process.env.DB_PASSWORD) {
        password = process.env.DB_PASSWORD
    } else {
        console.info('No DB password specified via DB_PASSWORD. Using default password.')
    }

    // Solution -- use correct environment variable
    // if (process.env.DATABASE_PASSWORD) {
    //     password = process.env.DATABASE_PASSWORD
    // } else {
    //     console.info('No DB password specified via DATABASE_PASSWORD. Using default password.')
    // }

    config = {
        user:     "postgres",
        password: password,
        host:     process.env.DATABASE_HOST,
        port:     process.env.DATABASE_PORT
    }

    try{
        client = new Client(config)
        await client.connect()
    } catch(e) {
        console.error(`DB connection failed with ${e}`)
        return
    }

    const resultSet = await client.query('SELECT * FROM employees')

    console.log('List of Employees')
    console.log(resultSet['rows'])

    await client.end()
}

main()
