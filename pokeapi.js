const buscador$$ = document.querySelector("input");
const botonBuscador$$ = document.querySelector("button");

//1.Promesa para traer los pokemons
async function getPokemons(){ 
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=120") 
    const resPokemons = await res.json(); 
    getDetailPokemons(resPokemons.results); 
} 

//2.Promesa para traer los detalles de los pokemons a la vez
async function getDetailPokemons(pokemons){ 
    const pokemonsPromises = pokemons.map(pokemon => fetch(pokemon.url).then(res => res.json())) 
    const detailPokemons = await Promise.all(pokemonsPromises); /*console.log(detailPokemons)*/ 
    printPokemons(detailPokemons);
} 
getPokemons()

//6. Para que los botones de tipo filtren 
const botonGrass = document.querySelector(".Grass");
const botonPoison = document.querySelector(".Poison");
const botonFire = document.querySelector(".Fire");
const botonFlying = document.querySelector(".Flying");
const botonWater = document.querySelector(".Water");
const botonBug = document.querySelector(".Bug");
const botonNormal = document.querySelector(".Normal");
const botonElectric = document.querySelector(".Electric");
const botonGround = document.querySelector(".Ground");
const botonFairy = document.querySelector(".Fairy");
const botonFighting = document.querySelector(".Fighting");
const botonPsychic = document.querySelector(".Psychic");
const botonRock = document.querySelector(".Rock");
const botonSteel = document.querySelector(".Steel");
const botonIce = document.querySelector(".Ice");
const botonGhost = document.querySelector(".Ghost");

const filtrarBoton = (boton, tarjeta) =>{
    let tipos = tarjeta.querySelectorAll("h4");
    let botonTipos = boton.textContent.toLowerCase();
    tarjeta.style.display = "none";
    for (const tipo of tipos) {
        let valorTipo = tipo.innerText;
        if (valorTipo.includes(botonTipos)) {
            tarjeta.style.display = "flex"; 
        }
    }
}

//3.Una vez que tenemos el array de los datos podemos empezar a imprimirlos
const printPokemons = (detailPokemons) => {
    const pokemons = detailPokemons;
    for (const pokemon of pokemons) {
        const tarjeta$$ = document.createElement("li");
        const contenedor$$ = document.querySelector("#pokedex");
        tarjeta$$.classList.add("main__tarjeta")
        const tipos = pokemon.types;
        tarjeta$$.innerHTML = `
        <img class= "main__img" src="${pokemon.sprites.front_default}">
        <h3 class="main__nombre"> ${pokemon.name} </h3>
        <div class="main__footer">
        <p class= "main__id"> ${pokemon.id} </p>
        </div>`
        contenedor$$.appendChild(tarjeta$$);
        for (const arrayTipo of tipos) {
            const tipo = arrayTipo.type.name;
            const tipos$$ = document.createElement("h4");
            tipos$$.classList.add("main__tipo");
            tipos$$.textContent = tipo;
            const footerPokemon$$ = tarjeta$$.querySelector(".main__footer");
            footerPokemon$$.appendChild(tipos$$);
        }
        botonGrass.addEventListener("click", () => filtrarBoton(botonGrass,tarjeta$$));
        botonPoison.addEventListener("click", () => filtrarBoton(botonPoison,tarjeta$$));
        botonFire.addEventListener("click", () => filtrarBoton(botonFire,tarjeta$$));
        botonFlying.addEventListener("click", () => filtrarBoton(botonFlying,tarjeta$$));
        botonWater.addEventListener("click", () => filtrarBoton(botonWater,tarjeta$$));
        botonBug.addEventListener("click", () => filtrarBoton(botonBug,tarjeta$$));
        botonNormal.addEventListener("click", () => filtrarBoton(botonNormal,tarjeta$$));
        botonElectric.addEventListener("click", () => filtrarBoton(botonElectric,tarjeta$$));
        botonGround.addEventListener("click", () => filtrarBoton(botonGround,tarjeta$$));
        botonFairy.addEventListener("click", () => filtrarBoton(botonFairy,tarjeta$$));
        botonFighting.addEventListener("click", () => filtrarBoton(botonFighting,tarjeta$$));
        botonPsychic.addEventListener("click", () => filtrarBoton(botonPsychic,tarjeta$$));
        botonRock.addEventListener("click", () => filtrarBoton(botonRock,tarjeta$$));
        botonSteel.addEventListener("click", () => filtrarBoton(botonSteel,tarjeta$$));
        botonIce.addEventListener("click", () => filtrarBoton(botonIce,tarjeta$$));
        botonGhost.addEventListener("click", () => filtrarBoton(botonGhost,tarjeta$$));    
    }    
}
    
//4. Añadimos el filtro con el valor introducido al hacer clic
const filtrarElementos = () =>{
    let filtro = document.querySelector("input").value.toLowerCase();
    let elementos = document.querySelectorAll(".main__nombre");
    for (const elemento of elementos) {
        let contenido = elemento.textContent.toLowerCase();
        if(contenido.includes(filtro)){
            elemento.parentNode.style.display = "flex";
        } else {
            elemento.parentNode.style.display = "none"; 
        }
        buscador$$.value = "";
    }
}
botonBuscador$$.addEventListener("click", filtrarElementos);

//5.Añadimos que al hacer la busqueda se desplace la página
const scrollBucador = () => {
    const destino = document.querySelector(".main__div");
    destino.scrollIntoView({ behavior: 'smooth' });
} 
botonBuscador$$.addEventListener("click", scrollBucador);