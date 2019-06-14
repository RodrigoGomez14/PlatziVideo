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
    function movieItemTemplate(movie) {
        return (`<div class="movie" idMovie="${movie.id}">
        <img src="${movie.medium_cover_image}" alt="" class="ml-2 mb-2 mr-2">
        <div class="overlay ml-2 mb-2 mr-2">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-6 pr-0 ">
                        <h6>
                        <i class="fas fa-star" id="star"></i>
                            <span class="badge badge-pill badge-light">
                                ${movie.rating}
                            </span>
                        </h6>
                        </div>
                        <div class="col-5 text-right p-0">
                            <h5>
                                <i class="fab fa-youtube" id="trailer" link="${movie.yt_trailer_code}"></i>
                                <span></span>
                                <i class="fab fa-imdb" id="imdb" link="${movie.imdb_code}"></i>
                            </h5>
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
            const $ytButton = movieElement.children[1].children[0].children[0].children[1].children[0].children[0];
            const $imdbButton = movieElement.children[1].children[0].children[0].children[1].children[0].children[2];
            $ytButton.addEventListener("click", () => {
                window.open("https://www.youtube.com/watch?v=" + $ytButton.getAttribute("link"))
            })
            $imdbButton.addEventListener("click", () => {
                window.open("https://www.imdb.com/title/" + $imdbButton.getAttribute("link"))
            })
            container.append(movieElement)
    }


    const $movie = document.getElementById("movie")
    const movie = await getData('https://yts.lt/api/v2/movie_details.json?movie_id='+localStorage.getItem('movie'))
    console.log(movie)
    renderMovieList(movie, $movie)



})()