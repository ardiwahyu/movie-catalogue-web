import ApiServices from './api-services.js';
import './component/list-movie.js';

function main() {
    const movieListElement = document.querySelector("list-movie");

    const getMoviePopular = async () => {
        try {
            const result = await ApiServices.getMoviePopular();
            renderResult(result);
        } catch (message) {
            console.log(message);
        }
    }

    const renderResult = result => {
        console.log(result)
        movieListElement.items = result
    }

    getMoviePopular()
}

export default main;