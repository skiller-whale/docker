import pg from 'pg'
const { Client } = pg

const initialWhales = [
    "Skiller Whale",
    "Blue Whale",
    "Christian Whale",
    "Minke Whale",
    "Grey Whale"
  ]

let pgClient, pgConfig

async function getPgClient()
{
    if (!pgClient)
    {
        pgClient = new Client(pgConfig)

        try {
            await pgClient.connect()

            // Set up the error handling for the connection being terminated at some point in the future.
            pgClient.on('error', (error) => {
                console.error(error)
                console.info('Lost DB connection')
                pgClient = undefined
            })

            await createWhalesTable()
            await populateWhalesTable()

            console.info('Now storing whales in postgres database.')
        } catch (error) {
            console.info('Failed to get DB connection')
            pgClient = undefined
            throw error //Without this, we get reference errors elsewhere in the DAO. This should be throw up to whatever is using the dao so it can handle appropriately.
        }
    }
    return pgClient
}

function configure(configuration) {
    pgConfig = configuration
}

async function start()
{
    await getPgClient()
}

async function getAllWhales()
{
    const client = await getPgClient()
    const resultSet = await client.query('SELECT whale_name FROM whales')

    return resultSet.rows.map(row => row.whale_name)
}

async function resetWhales()
{
    const client = await getPgClient()
    await client.query(`TRUNCATE whales`)

    const initialWhalesValuesString = initialWhales.map((whale, index) => `($${index + 1})`).join(',') //($1),($2),($3),...
    await client.query(`
        INSERT INTO whales
        VALUES ${initialWhalesValuesString}
        `,
        initialWhales
    )
}

async function addWhale(whale)
{
    const client = await getPgClient()
    await client.query(`
        INSERT INTO whales
        VALUES ($1)`,
        [whale]
    )
}

async function stop()
{
    console.info("Disconnecting postgres client")
    pgClient.end()
    console.info('No longer storing whales in postgres database.')
}

async function createWhalesTable() {
    const client = await getPgClient()
    await client.query('CREATE TABLE IF NOT EXISTS whales ( whale_name VARCHAR(50) )')
}

async function populateWhalesTable() {
    const client = await getPgClient()
    const resultSet = await client.query('SELECT COUNT(*) AS whale_count FROM whales')
    const whaleCount = Number(resultSet.rows[0].whale_count)
    if (whaleCount === 0) {
        await resetWhales()
    }
}

export default {
    configure, start, stop, getAllWhales, addWhale, resetWhales
}
