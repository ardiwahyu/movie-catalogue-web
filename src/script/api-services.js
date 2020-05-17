const apiKey = "eb2e823cfd652e3e9ace64ed25a7240c";
const baseUrl = "https://api.themoviedb.org/3";

class ApiServices {

    static getContent(type, filter, page) {
        const url = `${baseUrl}/${type}/${filter}?api_key=${apiKey}&language=id&page=${page}`;
        return fetch(url)
            .then(response => {
                return response.json();
            }).then(responseJson => {
                if (responseJson.error) {
                    return Promise.resolve("Terjadi masalah dalam pencarian data");
                } else {
                    return Promise.resolve(responseJson);
                }
            })
    }

    static searchContent(type, query, page) {
        const url = `${baseUrl}/search/${type}?api_key=${apiKey}&query=${query}&language=id&page=${page}`;
        return fetch(url)
            .then(response => {
                return response.json();
            }).then(responseJson => {
                if (responseJson.error) {
                    return Promise.resolve("Terjadi masalah dalam pencarian data");
                } else {
                    return Promise.resolve(responseJson);
                }
            })
    }

    static getDetail(type, id) {
        const url = `${baseUrl}/${type}/${id}?api_key=${apiKey}&language=id`;
        return fetch(url)
            .then(response => {
                return response.json();
            }).then(responseJson => {
                if (responseJson.error) {
                    return Promise.resolve("Terjadi masalah dalam pencarian data");
                } else {
                    return Promise.resolve(responseJson);
                }
            })
    }
}

export default ApiServices;