(async function load() {
    async function getData(url) {
        const response = await fetch(url)
        const data = await response.json()
        return data.data.movie
    }
    function createTemplate(HTMLString) {
        const html = document.implementation.createHTMLDocument()
        html.body.innerHTML = HTMLString
        return html.body.children[0]
    }
    function createBadges(HTMLString) {
        const html = document.implementation.createHTMLDocument()
        html.body.innerHTML = HTMLString
        return html.body
    }
    function movieItemTemplate(movie) {
        let genresString = ""
        const genres = movie.genres
        genres.forEach(genre => {
            genresString += `<span class="badge badge-info ml-2 mr-2"> ${genre}</span>`
        });
        let ratingColor = "";
        if (movie.rating > 6) {
            ratingColor = "success"
        }
        else if (movie.rating > 3 && movie.rating <= 6) {
            ratingColor = "warning"
        }
        else{
            ratingColor = "danger"
        }
        return (`
        <div class="container-fluid">
            <div class="row mt-4">
                <div class="col-12 col-lg-4 text-center" id="movie">
                    <div class="movie" idMovie="${movie.id}">
                        <img src="${movie.large_cover_image}" alt="" class="ml-2 mb-2 mr-2">
                    </div>
                </div>
                <div class="col-12  col-lg-7 offset-lg-1 text-center" id="movie">
                    <div class"container">
                        <div class="row">
                            <div class="col-12 text-center">
                            <h1>${movie.title_long} <span class="badge badge-dark">${movie.mpa_rating}</span></h1>
                            ${genresString}
                            </div>
                            <div class="col-12 text-center mt-3">
                            <p>${movie.description_full}</p>
                            </div>
                            <div class="col-12">
                                <iframe width="100%" height="315" src="https://www.youtube.com/embed/${movie.yt_trailer_code}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <div class="col-12 mt-4 d-flex justify-content-center align-items-center">
                                <h3 class="mr-2">
                                    <i class="fas fa-star" id="star"></i>
                                    <span class="badge badge-pill badge-${ratingColor}">
                                        ${movie.rating}
                                    </span>
                                </h3>
                                <h1 class="ml-2">
                                    <i class="fab fa-imdb" id="imdb" link="${movie.imdb_code}"></i>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `)

    }
    function featuringTemplate(movie) {
        return ` <div class="featuring">
      <div class="featuring-image">
        <img src="${movie.medium_cover_image}" width="70" height="100" alt="">
      </div>
      <div class="featuring-content">
        <p class="featuring-title">Pelicula encontrada</p>
        <p class="featuring-album">${movie.title}</p>
      </div>
    </div>`
    }
    function renderMovieList(movie, container) {
        const HTMLString = movieItemTemplate(movie)
        const movieElement = createTemplate(HTMLString)
        container.append(movieElement)
    }


    const $movie = document.getElementById("movie")
    const movie = await getData('https://yts.lt/api/v2/movie_details.json?movie_id=' + localStorage.getItem('movie'))
    renderMovieList(movie, $movie)



})()