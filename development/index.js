const md = require('markdown').markdown;
const express = require('express')
const app = express()
const fs = require('fs');
const port = 8080

var teamProcess = require('./team.js');

// faq variables
const faqPath = __dirname + '/data/faq.md';
var faq = {}

// team variables
var team = require( __dirname + '/data/team.json');
var sponsors = require( __dirname + '/data/sponsors.json');

// parse the faq into json.
fs.readFile(faqPath, function (err, data) {
  if (err) {
    throw err;
  }
  var parsed = md.parse(data.toString());

  // parse the faq markdown into a json.
  var tail;
  for (var i = 1; i < parsed.length; i++) {
    var entry = parsed[i];
    if (entry[0] == "header") {
      tail = entry[2];
    } else {
      faq[tail] = md.toHTML(entry);
    }
  }
});

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

// faq json
app.get('/faq', (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.send(faq)
})

// team json
app.get('/team', (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.send(team)
})

// sponsor json
app.get('/sponsors', (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.send(sponsors)
})

app.get('/codeofconduct', (request, response) => {
  response.redirect('/dh18_code_of_conduct.pdf');
})


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