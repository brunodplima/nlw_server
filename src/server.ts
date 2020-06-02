import express from 'express'

const app = express()

app.get('/users', (request, response) => {
  console.log('Users list')
  response.json('Hello World')
})

app.listen(3333)
