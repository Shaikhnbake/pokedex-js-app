let pokemonRepository = (function(){
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
  function getAll(){
    return pokemonList;
  }

  return{
    add: add,
    getAll: getAll
  };
})();

//internal anonymous function
pokemonRepository.getAll().forEach(function(pokemonList){
  if (pokemonList.weight >= 60){
    document.write("<div class='pokemon'>" + pokemonList.name + " Height:(" + pokemonList.height + ")  -" + " That's a CHONKY pokemon! </div><br>");
  } else if (pokemonList.weight < 60 && pokemonList.weight > 25){
    document.write("<div class='pokemon'>" + pokemonList.name + " Height:(" + pokemonList.height + ")  -" + " What a Shmedium pokemon ew! </div><br>");
  } else{
    document.write("<div class='pokemon'>" + pokemonList.name + " Height:(" + pokemonList.height + ")  -" + "Thats a TINY BOI! </div><br>");
  }
});


console.log(pokemonRepository.getAll());
