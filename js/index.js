const colors = {
    fire: '#ed5e4e',
    grass: '#70cc76',
    electric: '#ccbb68',
    water: '#abd6eb',
    ground: '#dbc0a4',
    rock: '#b3b3aa',
    fairy: '#FCEAFF',
    poison: '#93c29d',
    bug: '#f2cd99',
    dragon: '#97B3E6',
    psychic: '#EAEDA1',
    flying: '#baa8a8',
    fighting: '#E6E0D4',
    normal: '#8b6da3'
};
const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");
let limit = 898;
let offset = 1;
function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            createPokemon(data);
            spinner.style.display = "none";
        });
}
function fetchPokemons(offset, limit) {
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++) {
        fetchPokemon(i);
    }
}
function createPokemon(pokemon) {
    const type = pokemon.types[0].type.name;
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
    flipCard.appendChild(cardContainer);
    const card = document.createElement("div");
    card.classList.add("pokemon-block");
    card.style.backgroundColor = colors[type];
    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");
    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;
    spriteContainer.appendChild(sprite);
    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;
    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;
    const typeShown = document.createElement("p");
    typeShown.classList.add("name");
    typeShown.textContent = `Tipo: ${type}`;
    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);
    card.appendChild(typeShown);
    const cardBack = document.createElement("div");
    cardBack.classList.add("pokemon-block-back");
    cardBack.style.backgroundColor = colors[type];
    cardBack.appendChild(progressBars(pokemon.stats));
    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);
}

function progressBars(stats) {
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");
    for (let i = 0; i < 6; i++) {
        const stat = stats[i];
        const statPercent = stat.base_stat / 2 + "%";
        const statContainer = document.createElement("stat-container");
        statContainer.classList.add("stat-container");
        const statName = document.createElement("p");
        statName.classList.add("barra-de-progreso");
        statName.textContent = stat.stat.name;
        const progress = document.createElement("div");
        progress.classList.add("progress");
        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
        progressBar.setAttribute("aria-valuenow", stat.base_stat);
        progressBar.setAttribute("aria-valuemin", 0);
        progressBar.setAttribute("aria-valuemax", 200);
        progressBar.style.width = statPercent;
        progressBar.textContent = stat.base_stat;
        progress.appendChild(progressBar);
        statContainer.appendChild(statName);
        statContainer.appendChild(progress);
        statsContainer.appendChild(statContainer);
    }
    return statsContainer;
}
function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
fetchPokemons(offset, limit);