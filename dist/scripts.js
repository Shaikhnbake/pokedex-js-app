let pokemonRepository=function(){let e=[];function a(a){"object"==typeof a&&"name"in a&&"detailsUrl"in a?e.push(a):console.log("input is wrong")}function b(){return e}function c(a){d(a).then(function(){f(a)})}function d(a){return fetch(a.detailsUrl).then(function(a){return a.json()}).then(function(b){a.imageUrl=b.sprites.front_default,a.name=b.name,a.height=b.height,a.weight=b.weight;let c=[];b.types.forEach(a=>c.push(a.type.name)),a.types=c}).catch(function(a){console.error(a)})}function f(a){let b=$(".modal-body"),c=$(".modal-title");$(".modal-header"),c.empty(),b.empty();let e=$("<h1>"+a.name+"</h1>"),f=$("<p>Height: "+a.height+" m</p>"),g=$("<p>Weight: "+a.weight+" lbs</p>"),h=$("<p>Type(s): "+a.types.join(", ")+"</p>"),d=$('<img class="modal-img">');d.attr("src",a.imageUrl),b.append(d),c.append(e),b.append(f),b.append(g),b.append(h)}return{add:a,getAll:b,addListItem:function(d){let e=document.querySelector(".list-group"),b=document.createElement("li");b.classList.add("group-list-item");let a=document.createElement("button");a.innerText=d.name,a.classList.add("btn","btn-lg","btn-danger","pokemon-list-button"),a.setAttribute("data-toggle","modal"),a.setAttribute("data-target",".modal"),b.appendChild(a),e.appendChild(b),a.addEventListener("click",function(a){c(d)})},loadList:function(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(a){return a.json()}).then(function(b){b.results.forEach(function(b){a({name:b.name,detailsUrl:b.url})})}).catch(function(a){console.error(a)})},loadDetails:d,showDetails:c}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(a){pokemonRepository.addListItem(a)})})
