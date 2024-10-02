const { map } = require("rxjs");

const TOTAL_POKEMONS = 10;
const TOTAL_PAGES = 5;
(async () => {
  const fs = require("fs");
  const pokemonstIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

  // Pokemons by id
  let fileContent = pokemonstIds
    .map((id) => {
      return `/pokemons/${id}`;
    })
    .join("\n");

  // Pokemons by page
  fileContent += "\n";
  fileContent += pages
    .map((page) => {
      return `/pokemons/page/${page}`;
    })
    .join("\n");

  // Pokemons by name
  const pokemonsNameList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`
  ).then((res) => res.json());

  fileContent += "\n";
  fileContent += pokemonsNameList.results
    .map((pokemon) => {
      return `/pokemons/${pokemon.name}`;
    })
    .join("\n");

  fs.writeFileSync("routes.txt", fileContent);

  console.log(fileContent);
})();
