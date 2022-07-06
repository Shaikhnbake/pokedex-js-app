// pokemonRepository is the overcompassing IIFE for this POKEDEX
let pokemonRepository = (function() {
  // pokemonList is the Array the holds all the pokemon objects
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // Add allows user to input new pokemon as long as data type is correct.
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("input is wrong");
    }
  }

  // getAll returns all objects in pokemonList Array
  function getAll() {
    return pokemonList;
  }

  // Creates the structure of pokedex
  function addListItem(pokemon) {
    // assigns variable to HTML class
    let pokedex = document.querySelector(".list-group");
    // creates a list html object
    let pokedexItem = document.createElement("li");
    pokedexItem.classList.add("group-list-item");

    // creates a button per each List object
    let button = document.createElement("button");
    // adds pokemon name to list and gives each button a specific class
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-lg", "btn-danger", "pokemon-list-button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", ".modal");

    // adds the button to pokedexItem list
    pokedexItem.appendChild(button);
    // adds the list item to the whole pokedex
    pokedex.appendChild(pokedexItem);
    // will log pokemon details in console if User clicks on button!
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  function showDetails(item) {
    loadDetails(item).then(function() {
      showModal(item);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // add details to item list
        item.imageUrl = details.sprites.front_default;
        item.name = details.name;
        item.height = details.height;
        item.weight = details.weight;

        let types = [];
        details.types.forEach(item => types.push(item.type.name));
        item.types = types;
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    modalTitle.empty();
    modalBody.empty();
    let namePoke = $("<h1>" + item.name + "</h1>");
    let heightPoke = $("<p>" + "Height: " + item.height + " m" + "</p>");
    let weightPoke = $("<p>" + "Weight: " + item.weight + " lbs" + "</p>");
    let typePoke = $("<p>" + "Type(s): " + item.types.join(", ") + "</p>");
    let pokeImage = $('<img class="modal-img">');
    pokeImage.attr("src", item.imageUrl);

    modalBody.append(pokeImage);
    modalTitle.append(namePoke);
    modalBody.append(heightPoke);
    modalBody.append(weightPoke);
    modalBody.append(typePoke);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

//loads data from api
pokemonRepository.loadList().then(function() {
  // forEach loop goes through pokemonList and creates Pokedex.
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// OPTIONAL: WRITE FUNCTION THAT ADDS IMAGE URL from list items as actual images on HTML Page

// BONUS FUNCTIONS !
//  function showLoadingMessage(){} & function hideLoadingMessage(){ }
