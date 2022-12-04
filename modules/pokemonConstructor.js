require('dotenv').config();
const axios = require('axios');
const cache = require('./cache.js');
const queryPokemon = require('./queryPokemon')
const Pokemon = require('./pokemonClass.js')


let key = process.env.PKMN_OBJECTKEY; //this will store object
let resultsKey = process.env.PKMN_151; //this will store name/url from cache

const PokemonConstructor = async (req, res) => {
    if(!cache[key]){
        console.log('Constructor cache missing');

        let pokemonArray = [];
        let counter = 0;


        let pokeFromCache = cache[resultsKey];

        pokeFromCache.forEach(async (pokedata) => {

            let response = await axios.get(pokedata.url);

            let statObject = response.data; //At this point I should have the stat object of a pokemon

            let descriptionQuery = await axios.get(statObject.species.url); //gets description data for pokemon

            let descriptionData = descriptionQuery.data; 

            // console.log(descriptionData);


            let name = statObject.name;

            let id = statObject.id;

            let description = descriptionData.flavor_text_entries[0].flavor_text.replace(/[\r\n\f]/gm, ' ').toUpperCase();;

            let sprites = statObject.sprites.other['official-artwork'].front_default;

            let type = statObject.types.map((types) => ({name: types.type.name.toUpperCase()}));

            let stat = statObject.stats.map((stats) => ({name: stats.stat.name, statNumber: stats.base_stat}));

            let moves = statObject.moves.map((moves) => ({name: moves.move.name.toUpperCase()}));

            let pokemonObject = new Pokemon(name,id,description,sprites,moves,stat,type);

            pokemonArray.push(pokemonObject);
            counter++;
            
            if(counter == pokeFromCache.length){
                pokemonArray.sort((a,b) => { //sorts the pokemon in pokedex order
                    if( a.id > b.id){
                        return 1
                    }else{
                        return -1
                    }
                })
                cache[key] = pokemonArray;
                console.log('counter reached array limit');
                console.log(cache[key]);
                return cache[key];
            }

        })

    }
    else{
        console.log('cache found!');
        console.log(cache[key]);
        return cache[key];
    }
}


module.exports = PokemonConstructor;