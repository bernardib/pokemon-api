class Pokemon{
    constructor(name, id, description, sprites, moves, stats, type){

        this.name = name;

        this.id = id;

        this.description = description;
        
        this.sprites = sprites;

        this.moves = moves;

        // this.sprites = sprites;

        this.stats = stats;

        this.type = type;
    }
}

module.exports = Pokemon;