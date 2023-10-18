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

    let whales
    try {
      whales = await dao.getAllWhales()
    } catch (error) {
      console.error("Failed to get whales from the database")
      res.sendStatus(500)
      return
    }

    const randomWhale = whales[Math.floor(Math.random() * whales.length)]
    res.send(randomWhale)
  })

  app.post("/whales", async (req, res) => {
    const whale = req.body.whale_name

    try {
      await dao.addWhale(whale)
    } catch (error) {
      console.error("Failed to add whales to the database")
      res.sendStatus(500)
      return
    }

    res.send(whale)
  })

  app.get("/whales", async (req, res) => {
    let whales
    try {
      whales = await dao.getAllWhales()
    } catch (error) {
      console.error("Failed to get whales from the database")
      res.sendStatus(500)
      return
    }

    res.send(whales)
  })
}

async function startServer() {
  //Start DAO (Data Access Object)
  try {
    await dao.start()
  } catch (error) {
    console.error("Failed to start DAO - continuing, but you may get 500 errors")
  }

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
