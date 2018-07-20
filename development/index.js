const express = require('express')
const app = express()
const port = 8080

// if this is on, redirect the user to the teaser page.
// they shouldn't be able to see anything else.
const showTeaser = true

if (showTeaser) {
  // show the teaser page until ready.
  app.use("/", express.static(__dirname + '/public/teaser'));
} else {
  // display our WIP website.
  app.get('/', (request, response) => {
    response.send('Hello from Express!')
  })
}

app.listen(port, (err) => {
  if (err) {
    // return response to user..
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})