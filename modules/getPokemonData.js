require('dotenv').config();
const axios = require('axios');
const cache = require('./cache.js');
const QueryPokemon = require('./queryPokemon');
const PokemonConstructor = require('./pokemonConstructor.js');



const getPokemonData = async (req, res) => {

  let key = process.env.PKMN_151;
  let objectKey = process.env.PKMN_OBJECTKEY;

      if(!cache[key]){
        console.log("key = " + key);
        let queryData = await QueryPokemon(); //pull data from pokeApi

        let pokemonArr = queryData.results;
        
        cache[key] = pokemonArr; //put array into cache
        console.log(cache[key]);
        
        PokemonConstructor(); //cache data is then processed into a constructor class to extract pertinent data

        console.log(cache[objectKey]);
        res.send(cache[objectKey]);
      }
      else{
        console.log('cache found');
        res.send(cache[key]);
      }
}




module.exports = getPokemonData;

