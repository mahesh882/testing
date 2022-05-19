const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/test', (req, res) => {
  res.send('Test route')
})

app.listen(5000, () => {
  console.log('server is running on port 5000')
})
