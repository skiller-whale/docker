"use strict"

const express = require("express")
const cors = require("cors")

// Constants
const PORT = 8080
const HOST = "0.0.0.0"

const whales = [
  "Skiller Whale",
  "Blue Whale",
  "Christian Whale",
  "Minke Whale",
  "Grey Whale",
]

// App
const app = express()
app.use(cors())
app.get("/whale", (req, res) => {
  const randomWhale = whales[Math.floor(Math.random() * whales.length)]
  res.send(randomWhale)
})

app.listen(PORT, HOST)
console.log(`Listening on port ${PORT}`)
