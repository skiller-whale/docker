//POSTGRES CODE
const { Client } = require('pg')
const fs = require('node:fs')

async function main() {
    // NOTE: This is global, which is not recommended in production
    let password = "123"
    try {
        password = fs.readFileSync(process.env.DATABASE_PASSWORD_FILE, 'utf8')
    } catch(err) {
        console.info('No DB password in password file or no password file specified. Using default password.')
    }

    config = {
        user:     "postgres",
        password: password,
        host:     process.env.DATABASE_HOST,
        port:     process.env.DATABASE_PORT
    }
    client = new Client(config)

    await client.connect()
    const resultSet = await client.query('SELECT * FROM employees')

    console.log('List of Employees')
    console.log(resultSet['rows'])

    await client.end()
}

main()
