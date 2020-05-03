const apiKey = "eb2e823cfd652e3e9ace64ed25a7240c";
const baseUrl = "https://api.themoviedb.org/3/";

class ApiServices {

    static getMoviePopular() {
        return fetch(`${baseUrl}movie/popular?api_key=${apiKey}&languange=id&page=1`)
            .then(response => {
                return response.json();
            }).then(responseJson => {
                if (responseJson.error) {
                    return Promise.resolve("Terjadi masalah dalam pencarian data");
                } else {
                    return Promise.resolve(responseJson.results);
                }
            })
    }
}

export default ApiServices;