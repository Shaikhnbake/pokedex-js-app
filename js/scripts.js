let pokemonList = [
  {
    name: 'Charmander',
    height: 0.6,
    weight: 8.5,
    types: ['Lizard','Fire'],
  },

  {
    name: 'Charizard',
    height: 1.7,
    weight: 90.5,
    types: ['Lizard','Fire','Flying'],
  },

  {
    name: 'Raichu',
    height: 0.8,
    weight: 30,
    types: ['Mouse','Electric'],
  },

  {
    name: 'Pikachu',
    height: 0.4,
    weight: 6,
    types: ['Mouse','Electric'],
  },

  {
    name: 'Zubat',
    height: 0.8,
    weight: 7.5,
    types: ['Bat','Poison','Flying'],
  },

  {
    name: 'Dugtrio',
    height: 0.7,
    weight: 33.3,
    types: ['Mole','Ground'],
  }
]


  // Creates a loop that displays all pokemon names and height on Index page
  for (let i = 0; i < pokemonList.length; i++){

  // Creates conditional that checks pokemon weight and displays funny message!
    if (pokemonList[i].weight >= 60){
      document.write("<div class='pokemon'>" + pokemonList[i].name + " Height:(" + pokemonList[i].height + ")  -" + " That's a CHONKY pokemon! </div><br>");
    } else if (pokemonList[i].weight < 60 && pokemonList[i].weight > 25){
      document.write("<div class='pokemon'>" + pokemonList[i].name + " Height:(" + pokemonList[i].height + ")  -" + " What a Shmedium pokemon ew! </div><br>");
    } else{
      document.write("<div class='pokemon'>" + pokemonList[i].name + " Height:(" + pokemonList[i].height + ")  -" + "Thats a TINY BOI! </div><br>");
    }
  }

// need to figure out how to style JS output!!
