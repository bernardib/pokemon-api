const express = require('express');
const app = express();
const getPokemonData = require('./modules/getPokemonData');
const cache = require('./modules/cache.js')
const cors = require('cors')
require('dotenv').config();


let PORT = process.env.PORT;
let objectKey = process.env.PKMN_OBJECTKEY

app.use(
  cors({
    origin: 'http://localhost:3000', 
  })
)


app.get('/', getPokemonData); //cache is generated will the data processed into a class constructor

app.get('/151', (req, res) => {res.send(cache[objectKey])
    console.log('cache sent!')}); //cache is sent upon request

app.listen(PORT, () => (
  console.log(`listening on port ${PORT}`)
));
