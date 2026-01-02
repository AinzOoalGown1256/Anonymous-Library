const generos = ['ISEKAI', 'ACCION', 'AVENTURA', 'FANTASIA', 'SLICE OF LIFE', 'DRAMA', 'COMEDIA', 'ROMANCE', 'FICCION', 'MISTERIO', 'HORROR', 'THRILLER', 'MAGIA', 'DEPORTES', 'MECHA', 'HAREM INVERSO', 'HENTAI'];
const bookShelfNovela = document.querySelector('.book-shelf-Novela');
import { libros } from "./Data.js";

document.addEventListener('DOMContentLoaded', Iniciar);

function Iniciar() {
    const genreForm = document.getElementById('NovelaGenreForm');
    const searchInput = document.getElementById('searchInput');
    const libros_manga = libros;
    const select = document.createElement('select');
    select.setAttribute('name', 'generos[]');
    select.classList.add('genre-dropdown');
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Selecciona un género';
    select.appendChild(defaultOption);
    generos.forEach(g => {
        const option = document.createElement('option');
        option.value = g;
        option.textContent = g;
        select.appendChild(option);
    });
    genreForm.appendChild(select);
    organizarLibrosEnEstante(libros_manga, bookShelfNovela);
    select.addEventListener('change', () => realizarBusqueda(libros_manga, bookShelfNovela, searchInput.value));
    searchInput.addEventListener('input', debounce(() => realizarBusqueda(libros_manga, bookShelfNovela, searchInput.value), 300));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function realizarBusqueda(libros, bookShelf, searchTerm) {
    const selectGenero = document.querySelector('select[name="generos[]"]');
    const generoSeleccionado = selectGenero.value.toLowerCase();
    const librosFiltrados = libros.filter(libro => {
        const nombreCoincide = libro.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        const generoCoincide = generoSeleccionado === '' || libro.generos.map(g => g.toLowerCase()).includes(generoSeleccionado);
        return nombreCoincide && generoCoincide;
    });
    organizarLibrosEnEstante(librosFiltrados, bookShelf, generoSeleccionado);
}

function organizarLibrosEnEstante(libros, bookShelf, generoSeleccionado = '') {
    bookShelf.innerHTML = '';
    if (generoSeleccionado !== '') {
        const librosFiltradosPorGenero = libros.filter(libro =>
            libro.generos.map(g => g.toLowerCase()).includes(generoSeleccionado)
        );
        mostrarGenero(librosFiltradosPorGenero, bookShelf, generoSeleccionado.toUpperCase());
    } else {
        const librosPorGenero = {};
        libros.forEach(libro => {
            libro.generos.forEach(genero => {
                if (!librosPorGenero[genero]) {
                    librosPorGenero[genero] = [];
                }
                librosPorGenero[genero].push(libro);
            });
        });
        const shuffledGenres = shuffleArray(Object.keys(librosPorGenero));
        shuffledGenres.forEach(genero => {
            mostrarGenero(librosPorGenero[genero], bookShelf, genero.toUpperCase());
        });
    }
}

function mostrarGenero(libros, bookShelf, genero) {
    const generoElemento = document.createElement('div');
    generoElemento.classList.add('genre-row');
    const tituloGenero = document.createElement('h2');
    tituloGenero.textContent = genero;
    generoElemento.appendChild(tituloGenero);
    const contenedorElemento = document.createElement('div');
    contenedorElemento.classList.add('row-container');
    const filaElemento = document.createElement('div');
    filaElemento.classList.add('row');
    filaElemento.style.display = 'flex';
    filaElemento.style.overflowX = 'hidden';
    const arrowLeft = document.createElement('button');
    arrowLeft.classList.add('arrow', 'left-arrow');
    arrowLeft.innerHTML = '&#9664;';
    arrowLeft.onclick = () => scrollBooks(filaElemento, -1);
    contenedorElemento.appendChild(arrowLeft);
    const shuffledBooks = shuffleArray(libros);
    shuffledBooks.forEach(libro => {
        const libroElemento = document.createElement('div');
        const infoElemento = document.createElement('div');
        libroElemento.classList.add('download-link');
        libroElemento.setAttribute('id', libro.id);
        libroElemento.setAttribute('data-generos', JSON.stringify(libro.generos));
        const imagenElemento = document.createElement('img');
        imagenElemento.src = `https://lh3.googleusercontent.com/d/${libro.imagen}`;
        //https://lh3.googleusercontent.com/d/1GnN-5fAEY42pHqY19MNqouMLXv5JqxC8
        imagenElemento.alt = libro.nombre;
        imagenElemento.loading = 'lazy';
        imagenElemento.addEventListener('click', () => window.location.href = `./genericoGeneral.html?id=${libro.id}`);
        const h3Elemento = document.createElement('h3');
        h3Elemento.textContent = libro.nombre;
        infoElemento.classList.add('info');
        infoElemento.appendChild(h3Elemento);
        infoElemento.addEventListener('click', () => window.location.href = `./genericoGeneral.html?id=${libro.id}`);
        libroElemento.appendChild(imagenElemento);
        libroElemento.appendChild(infoElemento);
        filaElemento.appendChild(libroElemento);
    });
    const arrowRight = document.createElement('button');
    arrowRight.classList.add('arrow', 'right-arrow');
    arrowRight.innerHTML = '&#9654;';
    arrowRight.onclick = () => scrollBooks(filaElemento, 1);
    contenedorElemento.appendChild(filaElemento);
    contenedorElemento.appendChild(arrowRight);
    generoElemento.appendChild(contenedorElemento);
    bookShelf.appendChild(generoElemento);
}

function scrollBooks(row, direction) {
    const scrollAmount = 200; 
    const currentScrollLeft = row.scrollLeft;
    const maxScrollLeft = row.scrollWidth - row.clientWidth;
    if (direction === 1) { 
        if (currentScrollLeft + scrollAmount >= maxScrollLeft) {
            row.scrollLeft = 0; 
        } else {
            row.scrollBy({
                top: 0,
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    } else { 
        if (currentScrollLeft - scrollAmount < 0) {
            row.scrollLeft = maxScrollLeft; 
        } else {
            row.scrollBy({
                top: 0,
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
