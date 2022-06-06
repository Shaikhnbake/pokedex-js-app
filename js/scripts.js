// pokemonRepository is the overcompassing IIFE for this POKEDEX
let pokemonRepository = (function(){

// pokemonList is the Array the holds all the pokemon objects
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
  ];

// Add allows user to input new pokemon as long as data type is correct.
  function add(pokemon){
    if (typeof pokemon === "object" &&
    "name" in pokemon &&
    "height" in pokemon &&
    "weight" in pokemon &&
    "types" in pokemon){
    pokemonList.push(pokemon);
  } else {
    console.log("input is wrong");
  }
}

// getAll returns all objects in pokemonList Array
  function getAll(){
    return pokemonList;
  }

// Creates the structure of pokedex
  function addListItem(pokemon){
    // assigns variable to HTML class
    let pokedex = document.querySelector('.pokemon-list');
    // creates a list html object
    let pokedexItem = document.createElement('li');
    // creates a button per each List object
    let button = document.createElement('button');
    // adds pokemon name to list and gives each button a specific class
    button.innerText = pokemon.name;
    button.classList.add('pokemon-list-button');
    // adds the button to pokedexItem list
    pokedexItem.appendChild(button);
    // adds the list item to the whole pokedex
    pokedex.appendChild(pokedexItem);
    addEvent(button, pokemon)
  }
// will log pokemon details in console if User clicks on button!
  function addEvent(button, pokemon){
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon){
    console.log(pokemon);
  }

  return{
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

console.log(pokemonRepository.getAll());

// forEach loop goes through pokemonList and creates Pokedex.
pokemonRepository.getAll().forEach(function (pokemon){
  pokemonRepository.addListItem(pokemon);
});
