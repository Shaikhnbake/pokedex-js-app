// pokemonRepository is the overcompassing IIFE for this POKEDEX
let pokemonRepository = (function(){

// pokemonList is the Array the holds all the pokemon objects
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');
  let dialogPromiseReject;

// Add allows user to input new pokemon as long as data type is correct.
  function add(pokemon){
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ){
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
// will log pokemon details in console if User clicks on button!
    button.addEventListener("click", function(event){
      showDetails(pokemon);
    });
  }


  function showDetails(item){
    loadDetails(item).then(function(){
      showModal(item);
    });
  }

  function loadList(){
    return fetch(apiUrl).then(function(response){
      return response.json();
    }).then(function(json){
      json.results.forEach(function(item){
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e){
      console.error(e);
    })
  }

  function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url).then(function(response){
      return response.json();
    }).then(function(details){
      // add details to item list
      item.imageUrl = details.sprites.front_default;
      item.name = details.name;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
    }).catch(function(e){
      console.error(e);
    });
  }

  function showModal(pokemon){
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButton = document.createElement('button');
    closeButton.classList.add('modal-close');
    closeButton.innerText = 'Close';
    closeButton.addEventListener('click',hideModal);

    let modalTitle = document.createElement('h1');
    modalTitle.innerText = pokemon.name;

    let modalBody = document.createElement('p');
    modalBody.innerText = 'Height: ' + pokemon.height + 'm '
                          + 'Weight: ' + pokemon.weight + 'lbs';
    //how would I add weight and other stats underneath this in list form?

    let pokePic = document.createElement('img');
    pokePic.src = pokemon.imageUrl;

    modal.appendChild(closeButton);
    modal.appendChild(modalTitle);
    modal.appendChild(modalBody);
    modal.appendChild(pokePic);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal(){
    modalContainer.classList.remove('is-visible');
    if(dialogPromiseReject){
      dialogPromiseReject();
      dialogPromiseReject = null;
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
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
pokemonRepository.loadList().then(function(){
// forEach loop goes through pokemonList and creates Pokedex.
  pokemonRepository.getAll().forEach(function (pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});



// OPTIONAL: WRITE FUNCTION THAT ADDS IMAGE URL from list items as actual images on HTML Page

// BONUS FUNCTIONS !
//  function showLoadingMessage(){} & function hideLoadingMessage(){ }
