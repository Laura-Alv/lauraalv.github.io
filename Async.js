const pokemonCache = new Map();
const team = [];

const form = document.getElementById("pokemonForm");
const input = document.getElementById("nameOrId");
const statusEl = document.getElementById("status");
const card = document.getElementById("pokemonCard");
const pokemonNameEl = document.getElementById("pokemonName");
const pokemonImageEl = document.getElementById("pokemonImage");
const pokemonCryEl = document.getElementById("pokemonCry");
const addToTeamBtn = document.getElementById("addToTeamBtn");
const teamList = document.getElementById("teamList");
const moveSelects = [
  document.getElementById("move1"),
  document.getElementById("move2"),
  document.getElementById("move3"),
  document.getElementById("move4")
];

let currentPokemon = null;

form.addEventListener("submit", handlePokemonSubmit);
addToTeamBtn.addEventListener("click", handleAddToTeam);

async function handlePokemonSubmit(event) {
  event.preventDefault();
  const query = input.value.trim().toLowerCase();

  if (!query) {
    setStatus("Please enter a Pokemon name or ID.", true);
    return;
  }

  try {
    const pokemon = await getPokemon(query);
    currentPokemon = pokemon;
    renderPokemon(pokemon);
    setStatus("");
  } catch (error) {
    currentPokemon = null;
    setStatus(error.message, true);
  }
}

async function getPokemon(query) {
  if (pokemonCache.has(query)) {
    return pokemonCache.get(query);
  }

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error("Pokemon not found. Try a different name or ID.");
  }

  const data = await response.json();

  // Cache by the user's query and by canonical identifiers.
  pokemonCache.set(query, data);
  pokemonCache.set(String(data.id), data);
  pokemonCache.set(data.name, data);

  return data;
}

function renderPokemon(pokemon) {
  const name = formatName(pokemon.name);
  pokemonNameEl.textContent = `${name} (#${pokemon.id})`;

  const imageUrl =
    pokemon.sprites.front_default ||
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    "";

  pokemonImageEl.src = imageUrl;
  pokemonImageEl.alt = `${name} sprite`;

  const cryUrl = pokemon.cries?.latest || pokemon.cries?.legacy || "";
  pokemonCryEl.src = cryUrl;
  pokemonCryEl.load();

  fillMoveDropdowns(pokemon.moves);
  card.classList.remove("hidden");
}

function fillMoveDropdowns(moves) {
  const moveNames = moves.map((item) => item.move.name);

  moveSelects.forEach((select) => {
    select.innerHTML = "";

    moveNames.forEach((moveName) => {
      const option = document.createElement("option");
      option.value = moveName;
      option.textContent = formatName(moveName);
      select.appendChild(option);
    });
  });
}

function handleAddToTeam() {
  if (!currentPokemon) {
    setStatus("Load a Pokemon before adding to team.", true);
    return;
  }

  const selectedMoves = moveSelects.map((select) => select.value);

  if (selectedMoves.some((move) => !move)) {
    setStatus("Please choose all 4 moves.", true);
    return;
  }

  const teamEntry = {
    id: currentPokemon.id,
    name: currentPokemon.name,
    image: pokemonImageEl.src,
    moves: selectedMoves
  };

  team.push(teamEntry);
  renderTeam();
  setStatus(`${formatName(currentPokemon.name)} added to team.`);
}

function renderTeam() {
  teamList.innerHTML = "";

  team.forEach((entry) => {
    const item = document.createElement("li");
    const row = document.createElement("div");
    row.className = "team-entry";

    const thumb = document.createElement("img");
    thumb.src = entry.image;
    thumb.alt = `${formatName(entry.name)} thumbnail`;
    thumb.width = 76;
    thumb.height = 76;

    const moveList = document.createElement("ul");
    entry.moves.forEach((move) => {
      const moveItem = document.createElement("li");
      moveItem.textContent = formatName(move);
      moveList.appendChild(moveItem);
    });

    row.appendChild(thumb);
    row.appendChild(moveList);
    item.appendChild(row);
    teamList.appendChild(item);
  });
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

function formatName(text) {
  return text
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
