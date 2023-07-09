"use strict"

import express from 'express'
import cors from 'cors'

/**
 * Data Access Object Configuration
 */
import dao from './databaseDao.js'
dao.configure({
  user:     "postgres",
  password: "123",
  host:     "db",
  port:     5432
})

// App Constants
const APP_PORT = 8080
const APP_HOST = "0.0.0.0"

let app

function configureEndpoints(app)
{
  app.get("/whales/random", async (req, res) => {
    const whales = await dao.getAllWhales()
    const randomWhale = whales[Math.floor(Math.random() * whales.length)]
    res.send(randomWhale)
  })

  app.post("/whales", async (req, res) => {
    const whale = req.body.whale_name
    await dao.addWhale(whale)
    res.send(whale)
  })

  app.get("/whales", async (req, res) => {
    const whales = await dao.getAllWhales()
    res.send(whales)
  })
}

async function startServer() {
  //Start DAO (Data Access Object)
  await dao.start()

  // App
  app = express()
  app.use(cors())
  app.use(express.json())

  configureEndpoints(app)

  app.listen(APP_PORT, APP_HOST)
  console.info(`Listening on port ${APP_PORT}`)

  process.on("SIGINT", handleShutdown)
  process.on("SIGTERM", handleShutdown)
  process.on("SIGHUP", handleShutdown)
}

async function handleShutdown() {
  await dao.stop()

  console.info("Stopping server")
  app.close(() => {
    console.info("Server stopped - exiting...")
    process.exit(0)
  })
}

startServer()
