import {generosNovela, generosManga, generosDoujinshi, btnInicio, btnNovela, btnManga, btnDoujinshi, genresSection, bookShelfInicio, bookShelfNovela, bookShelfManga, bookShelfDoujinshi } from '../js/ConstGlobales.js'; 
import { Iniciar } from '../js/mainNovela.js';

document.addEventListener('DOMContentLoaded', async function () {
    function mostrarSeccion(idSeccion,bookShelfElement) {
        const secciones = document.querySelectorAll('.section-container');
        secciones.forEach(seccion => {
            seccion.style.display = 'none';
        });
        const seccionMostrar = document.getElementById(idSeccion);
        if (seccionMostrar) {
            seccionMostrar.style.display = 'flex';
    
            if (idSeccion === 'SeccionInicio') {
                ocultarGenresSection(bookShelfElement);
            } else {
                mostrarGenresSection(bookShelfElement);
            }
        }
    }
    function mostrarGenresSection(bookShelfElement) {
        genresSection.style.display = "block";
        bookShelfElement.style.display = "block";
    }
    function ocultarGenresSection(bookShelfElement) {
        genresSection.style.display = "none";
        bookShelfElement.style.display = "none";
    }
    btnInicio.addEventListener("click", () => {
        mostrarGenresSection(bookShelfInicio)
        mostrarSeccion('SeccionInicio',bookShelfInicio);
    });
    btnNovela.addEventListener("click", () => {
        Iniciar(2,generosNovela);
        mostrarGenresSection(bookShelfNovela);
        mostrarSeccion('SeccionNovela',bookShelfNovela);
    });
    btnManga.addEventListener("click", () => {
        Iniciar(3,generosManga);
        mostrarGenresSection(bookShelfManga);
        mostrarSeccion('SeccionManga',bookShelfManga);
    });
    btnDoujinshi.addEventListener("click", () => {
        Iniciar(4,generosDoujinshi);
        mostrarGenresSection(bookShelfDoujinshi);
        mostrarSeccion('SeccionDoujinshi',bookShelfDoujinshi);
    });
});

//Listo
function realizarBusqueda(libros,bookShelf) {
    const generosSeleccionados = Array.from(document.querySelectorAll('input[name="generos[]"]:checked')).map(checkbox => checkbox.value.toLowerCase());

    // Filtra los libros que cumplen con los géneros requeridos
    const librosFiltrados = libros.filter(libro => {
        const generosElemento = libro.generos.map(g => g.toLowerCase());
        return generosSeleccionados.length === 0 || generosSeleccionados.every(genero => generosElemento.includes(genero));
    });
    organizarLibrosEnEstante(librosFiltrados,bookShelf);

    // Mostrar u ocultar elementos según el estado de filtrado
    mostrarUocultarLibros(libros,librosFiltrados);
}    
//Listo
function mostrarUocultarLibros(libros,filtro){
    libros.forEach(libro => {
        const libroElemento = document.getElementById(libro.id);
        if(libroElemento){
            libroElemento.style.display = filtro.includes(libro) ? 'block' : 'none';
        }
    });    
}

function generarCasillasYBotonNinguno(libros, bookShelf, genreForm, genresContainer, containerNumber, generos) {
    const GeneralgenreForm = genreForm;
    const tituloGenero = document.createElement('h2');
    tituloGenero.textContent = 'Género';
    genresContainer.appendChild(tituloGenero);
    const botonNinguno = document.createElement('button');
    botonNinguno.classList.add('ninguno-button');
    botonNinguno.textContent = 'REINICIAR';
    botonNinguno.addEventListener('click', function (e) {
        e.preventDefault();
        generos.forEach(function (genero) {
            const checkbox = document.getElementById(`${genero.toLowerCase()}_${containerNumber}`);
            if (checkbox) {
                checkbox.checked = false;
            }
        });
        realizarBusqueda(libros, bookShelf);
    });
    genresContainer.appendChild(botonNinguno);
    const checkboxes = genresContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.styleGeneral.marginTop = '15px';
    });
    generos.forEach(function (genero) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `${genero.toLowerCase()}_${containerNumber}`;
        checkbox.name = 'generos[]';
        checkbox.value = genero.toLowerCase();
        const label = document.createElement('label');
        label.htmlFor = `${genero.toLowerCase()}_${containerNumber}`;
        label.textContent = genero;
        label.style.fontSize = '0.9em';
        const checkboxContainer = document.createElement('div');
        checkboxContainer.style.display = 'flex';
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
        genresContainer.appendChild(checkboxContainer);
        const lineBreak = document.createElement('br');
        genresContainer.appendChild(lineBreak);
    });
    GeneralgenreForm.appendChild(genresContainer);
}        

function organizarLibrosEnEstante(libros, bookShelf) {
    bookShelf.innerHTML = '';

    const columnasPorFila = 6;
    const filas = 3;
    const librosAleatorios = libros.sort(() => Math.random() - 0.5);
    const librosAMostrar = librosAleatorios.slice(0, filas * columnasPorFila);

    for (let i = 0; i < filas; i++) {
        const filaElemento = document.createElement('div');
        filaElemento.classList.add('row');

        for (let j = 0; j < columnasPorFila; j++) {
            const libro = librosAMostrar[i * columnasPorFila + j];

            if (!libro) {
                break; // Evita agregar elementos indefinidos al final
            }

            const libroElemento = document.createElement('div');
            const infoElemento = document.createElement('div');

            libroElemento.classList.add('download-link');
            libroElemento.setAttribute('id', libro.id);
            libroElemento.setAttribute('data-generos', JSON.stringify(libro.generos));

            const imagenElemento = document.createElement('img');
            imagenElemento.src = libro.imagen;
            imagenElemento.alt = libro.nombre;
            imagenElemento.addEventListener('click', function () {
                window.location.href = `genericoNovela.html?id=${libro.id}`;
            });

            const h3Elemento = document.createElement('h3');
            h3Elemento.textContent = libro.nombre;

            const generosElemento = document.createElement('p');
            generosElemento.textContent = `Géneros: ${libro.generos.join(', ')}`;

            const estadoElemento = document.createElement('p');
            estadoElemento.textContent = `Estado: ${libro.estado}`;

            const tomosElemento = document.createElement('p');
            tomosElemento.textContent = `Número de Tomos: ${libro.tomos}`;

            infoElemento.classList.add('info');
            infoElemento.addEventListener('click', function () {
                window.location.href = `genericoNovela.html?id=${libro.id}`;
            });

            infoElemento.appendChild(h3Elemento);
            infoElemento.appendChild(estadoElemento);
            infoElemento.appendChild(tomosElemento);

            libroElemento.appendChild(imagenElemento);
            libroElemento.appendChild(infoElemento);

            filaElemento.appendChild(libroElemento);
        }
        bookShelf.appendChild(filaElemento);
    }
}
export {generarCasillasYBotonNinguno,organizarLibrosEnEstante,realizarBusqueda,mostrarUocultarLibros};