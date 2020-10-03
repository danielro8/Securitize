const express = require('express')
const router = new express.Router()
const mainRouter = new express.Router()


router.get('/addresses/:id', async (req, res) => {
  res.send("test")
})

mainRouter.use('/wallet', router)

module.exports = mainRouter