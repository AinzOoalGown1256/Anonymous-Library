import {generarCasillasYBotonNinguno,organizarLibrosEnEstante,realizarBusqueda,mostrarUocultarLibros} from '../js/mainGeneral.js';
import { librosInicio } from '../Data/dataInicio.js';
import { librosNovela } from '../Data/dataNovela.js';
import { librosManga } from '../Data/dataManga.js';
import { librosDoujinshi } from '../Data/dataDoujinshi.js';
import { bookShelfInicio,bookShelfNovela,bookShelfManga,bookShelfDoujinshi, } from './ConstGlobales.js';

function Iniciar(number,generos) {
    const containerMap = {
        1: { formId: 'InicioGenreForm', libros: librosInicio, bookShelf: bookShelfInicio },
        2: { formId: 'NovelaGenreForm', libros: librosNovela, bookShelf: bookShelfNovela },
        3: { formId: 'MangaGenreForm', libros: librosManga, bookShelf: bookShelfManga },
        4: { formId: 'DoujinshiGenreForm', libros: librosDoujinshi, bookShelf: bookShelfDoujinshi },
    };

    const { formId, libros, bookShelf } = containerMap[number];
    const genreForm = document.getElementById(formId);
    
    // Verificar si el contenedor ya existe
    let genresContainer = genreForm.querySelector('.genres-container');

    // Si no existe, crear uno nuevo
    if (!genresContainer) {
        genresContainer = document.createElement('div');
        genresContainer.classList.add('genres-container');
        genreForm.appendChild(genresContainer);
        generarCasillasYBotonNinguno(libros, bookShelf, genreForm, genresContainer, number,generos);
        organizarLibrosEnEstante(libros, bookShelf);
    }
    genreForm.addEventListener('change', function () {
        realizarBusqueda(libros, bookShelf);
    });
}

export {Iniciar};