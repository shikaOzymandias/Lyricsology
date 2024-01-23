const API_URL = "https://api.musixmatch.com/ws/1.1/";
// const apiKey = `${process.env.MUSIX_API_KEY}`;
// const apiKeyGen = `${process.env.GENIUS_API_KEY}`;
const errorMessage = "We couldn't find lyrics. try something else ...";
// Search Selector
const searchForm = document.querySelector(".search");
const searchInputText = document.querySelector(".search__field");
const searchResultView = document.querySelector(".results");
let numResults = 50; // numbers of results - range is 0 - 100
const trackContainer = document.querySelector(".music");
const headEl = document.getElementsByTagName("head")[0];
// pagination selector
const paginationContainer = document.querySelector(".pagination");
// modal selectors
const modal = document.querySelector(".modal");
const showAboutUs = document.querySelector(".nav__btn--about-us");
const closeBtn = document.querySelector(".modal__btn-close");

console.log(`${process.env.MUSIX_API_KEY}`);
let state = {
  music: {},
  search: {
    query: "",
    results: [],
    resultsView: [],
    perPage: 10,
    page: 1,
  },
};

const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    // first: for when api authentication is wrong, second: for when no track found.
    if (data.message.body.length === 0) {
      throw new Error(`Status Code: ${data.message.header.status_code}`);
    } else if (data.message.header.available === 0) {
      throw new Error(`Not found Any Track!`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

const getQuery = function () {
  const query = searchInputText.value;
  searchInputText.value = "";
  return query;
};

const renderSpinner = function (parentElement) {
  const markup = `
  <div class="u-margin-top-big spinner"></div>
  `;
  parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML("afterbegin", markup);
};

const renderError = function (parentElement, message = errorMessage) {
  if (message.includes("is not valid JSON")) {
    message = "There is some problem with Genius Api. Try again later.";
  }

  const markup = `
          <div class="error">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" class="svg-icon" style="color:#e40000;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          
            </div>
            <p>${message}</p>
          </div>
  `;
  parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML("afterbegin", markup);
};

const loadLyrics = async function () {
  try {
    let markup;
    // Taking id track and putting in id

    const id = window.location.hash.slice(1);
    if (!id) return;
    console.log(id);

    // 1) Loading Lyrics and Music data

    // Spinner
    renderSpinner(trackContainer);

    // taking lyrics data
    const lyricsData = await getJSON(
      `${API_URL}track.lyrics.get?commontrack_id=${id}&apikey=${apiKey}`
    );

    // taking track data
    const data = await getJSON(
      `${API_URL}track.get?commontrack_id=${id}&apikey=${apiKey}`
    );

    const dataRes = state.search.results;

    // Reformating lyricsData
    let { lyrics } = lyricsData.message.body;
    console.log(lyrics);
    lyrics = {
      id: lyrics.lyrics_id,
      body: lyrics.lyrics_body,
      script: lyrics.script_tracking_url,
      imagePixel: lyrics.pixel_tracking_url,
      copyright: lyrics.lyrics_copyright,
      updatedTime: lyrics.updated_time,
    };

    // pushing lyrics.script into <head>
    const lyricsScript = `<script type="text/javascript" src="${lyrics.script}">`;
    headEl.insertAdjacentHTML("beforeend", lyricsScript);

    // Reformating track data
    let { track } = data.message.body;
    console.log(track);
    track = {
      id: track.track_id,
      title: track.track_name,
      commontrackId: track.commontrack_id,
      hasLyrics: track.has_lyrics,
      explicit: track.explicit,
      favourite: track.num_favourite,
      albumId: track.album_id,
      albumName: track.album_name,
      artistId: track.artist_id,
      artistName: track.artist_name,
      updatedTime: track.updated_time,
      ...(track.primary_genres.music_genre_list.length !== 0 && {
        genre:
          track.primary_genres.music_genre_list[0].music_genre.music_genre_name,
      }),
      // genre:
      //   track.primary_genres.music_genre_list[0].music_genre.music_genre_name,
      genres: track.primary_genres.music_genre_list,
    };

    // genuis api

    const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(
      track.artistName + " " + track.title
    )}&access_token=${apiKeyGen}`;

    const resGen = await fetch(searchUrl);
    const dataGen = await resGen.json();
    console.log(resGen);
    console.log(dataGen);
    let result = {};

    if (dataGen.response.hits.length !== 0) {
      result = dataGen.response.hits[0].result;

      console.log(result);

      result = {
        headerThumbnail: result.header_image_thumbnail_url,
        headerImage: result.song_art_image_url,
        ...(result.release_date_components && {
          releaseDate: result.release_date_components.year,
        }),
        artistImageHeader: result.primary_artist.header_image_url,
      };
    }

    // 2) Rendering Lyrics and Music info
    markup = `
        <figure class="artist">
            <img
              src="${
                result.artistImageHeader
                  ? result.artistImageHeader
                  : "src/img/404.png"
              }"
              alt="${track.artistName ? result.artistName : "not found"}"
              class="artist__image"
          />
        </figure>
        
          
          <div class="music__details u-margin-bottom-medium">
          <img
              src="${
                result.headerImage ? result.headerImage : "src/img/404.png"
              }"
              alt="${track.title ? result.title : "not found"}"
              class="music__image"
          />
            <div class="music__info">
              <p><span>${track.title}</span></p>
              <p>
                <span>${track.artistName}</span> &#9679 <span>${
                  track.albumName
                }</span>${
                  result.releaseDate
                    ? ` &#9679 <span>${result.releaseDate}</span>`
                    : ""
                }
                ${track.genre ? ` &#9679 <span>${track.genre}</span>` : ""}
              </p>
            </div>
          </div>

        <div class="music__lyrics">

        ${
          !track.hasLyrics
            ? `<p class="paragraph">"There is no lyrics for this song or Maybe It's is a instrumental :)"</p>`
            : `
                    <p class="music__lyrics--body paragraph">${lyrics.body}</p>
               
                    <img class="music__image-pixel" src="${lyrics.imagePixel}" alt="image pixel" />
                    <div class="music__copyright">
                    <span style="line-height:54px;vertical-align:top;">Lyrics licensed by </span><img src="https://www.azlyrics.com/images/mxm.png" width="184" height="54" alt="MusixMatch">
                    </div>
                    `
        }
        </div>
    `;
    trackContainer.innerHTML = "";
    trackContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    console.error(`${err} 🏀🏀🏀`);
    renderError(trackContainer, `${err}`);
  }
};

const markupPagination = function () {
  const numPages = numResults / state.search.perPage;
  const curPage = state.search.page;

  // Created Button based on condition
  const createButton = (classModifier, pathData) => `

    <button
      data-goto="${classModifier === "prev" ? curPage - 1 : curPage + 1}"
      class="pagination__btn btn--inline pagination__btn--${classModifier}">

      ${classModifier === "next" ? `<span>Page ${curPage + 1}</span>` : ""}
      
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="${pathData}" />
      </svg>

      ${classModifier === "prev" ? `<span>Page ${curPage - 1}</span>` : ""}
    </button>
  `;

  // Page 1, there are other Pages
  if (curPage === 1 && numPages > 1) {
    return createButton("next", "M8.25 4.5l7.5 7.5-7.5 7.5");
  }

  // Last Page
  if (curPage === numPages && numPages > 1) {
    return createButton("prev", "M15.75 19.5L8.25 12l7.5-7.5");
  }

  // Other Pages (no first, no last)
  if (numPages > curPage) {
    const prevButton = createButton("prev", "M15.75 19.5L8.25 12l7.5-7.5");
    const nextButton = createButton("next", "M8.25 4.5l7.5 7.5-7.5 7.5");
    return prevButton + nextButton;
  }

  // Page 1, there are no other Pages
  return "";
};

const renderPagination = function () {
  const paginationMarkup = markupPagination();

  // Emptying pagination
  paginationContainer.innerHTML = "";

  // Render pagination
  paginationContainer.insertAdjacentHTML("afterbegin", paginationMarkup);
};

const renderSearchResult = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.perPage; // if page is 1 it will be 0
  const end = page * state.search.perPage; // // if page is 1 it will be 9

  state.search.resultsView = state.search.results.slice(start, end);

  const resultMarkup = state.search.resultsView
    .map(
      (track) => `
      <li class="preview">
        <a href="#${track.commontrackId}" class="preview__link">
          <div class="preview__data">
          <h3 class="preview__title">${track.title}</h3>
          <p class="preview__artist-album">${track.artistName}<span> &#9679 </span>${track.albumName}</p>
          </div>
          </a>
          </li>
          `
    )
    .join("");

  // Emptying result history
  searchResultView.innerHTML = "";

  // Render results
  searchResultView.insertAdjacentHTML("afterbegin", resultMarkup);
};

const loadPagination = function () {
  paginationContainer.addEventListener("click", function (e) {
    const btn = e.target.closest(".pagination__btn");
    if (!btn) return;

    const goToPage = +btn.dataset.goto;

    // render SearchResult
    renderSearchResult(goToPage);

    // render Pagination
    renderPagination();
  });
};

const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.perPage; // if page is 1 it will be 0
  const end = page * state.search.perPage; // // if page is 1 it will be 9

  state.search.resultsView = state.search.results.slice(start, end);

  return state.search.resultsView;
};

const loadSearchResults = async function () {
  try {
    renderSpinner(searchResultView);

    // 1) Get search query
    const query = await getQuery();
    if (!query) return;

    // 2) Load Search Results
    state.search.query = query;

    const data =
      await getJSON(`${API_URL}track.search?q_track_artist=${encodeURIComponent(
        query
      )}&page_size=${numResults}&apikey=${apiKey}&s_track_rating=DESC
      `);

    if (!data) return renderError(searchResultView);

    // Refactoring search result and pushing in state
    state.search.results = data.message.body.track_list.map(({ track }) => {
      return {
        title: track.track_name,
        commontrackId: track.commontrack_id,
        albumName: track.album_name,
        artistName: track.artist_name,
      };
    });

    // 3. Render Search Results

    renderSearchResult();
  } catch (err) {
    console.error(err);
    renderError(searchResultView, `${err}`);
  }
};

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // bringing value of page to 1
  state.search.page = 1;

  // Loading saerch result
  loadSearchResults();

  // state.search.page;
  renderPagination();

  // Loading Pagination
  loadPagination();
});

window.addEventListener("hashchange", loadLyrics);

window.addEventListener("load", loadLyrics);

showAboutUs.addEventListener("click", () => {
  modal.showModal();
});

closeBtn.addEventListener("click", () => {
  modal.close();
});
