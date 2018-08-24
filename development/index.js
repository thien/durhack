const express = require('express')
const app = express()
const port = 8080

// if this is on, redirect the user to the teaser page.
// they shouldn't be able to see anything else.
const showTeaser = false;
const showSplash = true;

if (showTeaser) {
  // show the teaser page until ready.
  app.use("/", express.static(__dirname + '/public/teaser'));
} else if (showSplash) {
  // show the splash page until ready.
  app.use("/", express.static(__dirname + '/public/preview'));
} else {
  // display our WIP website.
  app.get('/', (request, response) => {
    response.send('Hello from Express!')
  })
}

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (request, response) => {
  response.status(404).sendFile(__dirname + '/public/preview/404.html');
})

app.listen(port, (err) => {
  if (err) {
    // return response to user..
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})