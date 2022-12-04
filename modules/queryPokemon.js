const express = require('express');
require('dotenv').config();
const axios = require('axios');

const key = process.env.PKMN_151;
const queryURL = process.env.PKMN_URL

const QueryPokemon = async (req, res) => {
    let response;
    let data;

    response = await axios.get(queryURL + key);

    if(response === undefined){
        res.status(400).send("Error with response. No pokemon were found.");
    }else{
        data = response.data;
        return data;
    }
}

module.exports = QueryPokemon;