// URL base de la API de The Movie DB
const API_SERVER = 'https://api.themoviedb.org/3'; 

// opciones del request
const options = {
    method: 'GET', 
    headers: {
        accept: 'application/json', // response JSON
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'
    }
};


// genera las cards de las peliculas de la seccion tendencias
// funcion ASYNC
const loadCardsTendencias = async (pagina = 1) => {

    try {
        const response = await fetch(`${API_SERVER}/movie/popular?page=${pagina}`, options);
        
        const data = await response.json(); // formatea response a JSON
        const peliculas = data.results; // obtiene de results las peliculas

        const contenedorCardsTendencias = document.getElementById('contenedorTendencias');
      
        contenedorCardsTendencias.innerHTML = '';
        let movies = [];

        peliculas.forEach(pelicula => {
            movies += `
                <div class="divPeliculas">
                  <a href="./pages/details.html">
                    <div class="cardPelicula">
                      <img class="imgPelicula" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="${pelicula.title}" loading="lazy">
                      <div class="tituloPelicula">
                        <h4>${pelicula.title}</h4>
                      </div>
                    </div>
                  </a>
                </div>
                `;
        });
        
        
        contenedorCardsTendencias.innerHTML = movies;

        // utilizo el attr data-page para conservar el valor de la pagina actual
        contenedorCardsTendencias.setAttribute('data-page', pagina);

    } catch (e) {
        console.log ("Error al cargar las peliculas tendencias");
    }
    
};


// genera el carrusel de las peliculas aclamadas
// funcion ASYNC
const loadCarruselAclamadas = async () => {

    try {
        const response = await fetch(`${API_SERVER}/movie/top_rated`, options);
        
        // Convertimos la respuesta a JSON
        const data = await response.json();  // formatea response a JSON
        const peliculas = data.results; // obtiene de results las peliculas

        const contenedorAclamadas = document.querySelector('.aclamadasContainer');

        contenedorAclamadas.innerHTML = '';
        let movies = [];

        peliculas.forEach(pelicula => {
            movies += `
            <div class="divPeliculaAclamada">
                <img class="imgPeliculaAclamada" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="${pelicula.title}" loading="lazy">
            </div>
            `;
        });

        contenedorAclamadas.innerHTML = movies;

    } catch (e) {
        console.log ("Error al cargar las peliculas aclamadas");
    }

};


// botón "Anterior"
document.querySelector('.anterior').addEventListener('click', () => {
    let paginaActual = Number(document.getElementById('contenedorTendencias').getAttribute('data-page'));
    if (paginaActual > 1) loadCardsTendencias(paginaActual - 1);
});

// botón "Siguiente"
document.querySelector('.siguiente').addEventListener('click', () => {
    let paginaActual = Number(document.getElementById('contenedorTendencias').getAttribute('data-page'));
    loadCardsTendencias(paginaActual + 1);
});

// espera que la pagina se haya generado por completo para ejecutar los scripts
document.addEventListener('DOMContentLoaded', () => {
    loadCardsTendencias();
    loadCarruselAclamadas();
});



