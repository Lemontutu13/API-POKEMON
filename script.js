const formularioBusqueda = document.getElementById("formularioBusqueda"); //formulario donde el user ingresa el nombre del pokemon
const campoBusqueda = document.getElementById("campoBusqueda"); //campo de texto donde se escribe el nombre del pokemon
const divResultados = document.getElementById("resultadosPokemon"); //contenedor donde se mostrara los resultados
const recuadroResultado = document.getElementById("cuadroResultado"); //recuadro estilizado para los resultados

formularioBusqueda.addEventListener("submit", function(evento) { //cada vez que el formulario sea enviado se ejecuta la funcion 
  evento.preventDefault();  //evita que el formulario recargue la pagina al enviarse 
  const nombrePokemon = campoBusqueda.value.toLowerCase(); // obtiene el valor que ingrese el usuario 
  fetch("https://pokeapi.co/api/v2/pokemon/" + nombrePokemon)
    .then(function(respuesta) {
      if (!respuesta.ok) { //si la busqueda no es exitosa 
        divResultados.innerHTML = "<p>No encontramos ese Pokémon. Intenta con otro nombre.</p>";
        recuadroResultado.style.display = "none";  
        return;
      }
      return respuesta.json();// convierte la respues en json
    })
    .then(function(pokemon) { // si la busqueda es exitosa
      const tipos = pokemon.types.map(function(tipo) { 
        return tipo.type.name; 
      }).join(", ");  //se usa .join con la coma para unir los nombres y separarlos por comas
      const habilidades = pokemon.abilities.map(function(habilidad) {
        return habilidad.ability.name;  
      }).join(", ");  
      divResultados.innerHTML = `
        <h3>${pokemon.name.toUpperCase()}</h3>
        <p><strong>Tipos:</strong> ${tipos}</p>
        <p><strong>Habilidades:</strong> ${habilidades}</p>
        <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
        <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" width="200">
      `;
      recuadroResultado.style.display = "block";  
      
    })});
