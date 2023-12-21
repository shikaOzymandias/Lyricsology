const API_URL = "https://api.musixmatch.com/ws/1.1/";
const apiKey = "8a497867c325bbcf4b4c9d286f8450bb";
const apiKeyGen =
  "b-KgY7LZtvivwRqE1ztvRAKgmx_wq16cZzpuMvx5LPnwTgd3Pur-v9y_MMxKuvqJ";
const errorMessage = "We couldn't find lyrics. try something else ...";
const searchForm = document.querySelector(".search");
const searchInputText = document.querySelector(".search__field");
const searchResultView = document.querySelector(".results");
const trackContainer = document.querySelector(".music");
const headEl = document.getElementsByTagName("head")[0];
// modal selectors
const modal = document.querySelector(".modal");
const showAboutUs = document.querySelector(".nav__btn--about-us");
const closeBtn = document.querySelector(".close");

let state = {
  music: {},
  search: {
    query: "",
    results: [],
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
    console.log(state.search.results);
    const dataRes = state.search.results;
    console.log(dataRes);
    console.log(data);
    console.log(lyricsData);

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
    console.log(dataGen.response.hits[0]);

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

      console.log(result);
    }

    // does not work like this i guess beacasue of getJSON
    // const result = await getJSON(searchUrl);
    // console.log(result);

    // ${
    //   result.artistImageHeader
    //     ? `<img
    //   src="${result.artistImageHeader}"
    //   alt="${track.artistName}"
    //   class="artist__image"
    //   />`
    //     : ""
    // }

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
                    <div class="music__copyright"><span style="line-height:54px;vertical-align:top;">Lyrics licensed by </span><img src="src/img/mxm.png" width="184" height="54" alt="MusixMatch"></div>
                    
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
      )}&page_size=7&page=1&apikey=${apiKey}&s_track_rating=DESC
      `);

    if (!data) return renderError(searchResultView);

    console.log(data.message.body.track_list);
    // Refactoring search result and pushing in state
    state.search.results = data.message.body.track_list.map(({ track }) => {
      return {
        title: track.track_name,
        commontrackId: track.commontrack_id,
        albumName: track.album_name,
        artistName: track.artist_name,
      };
    });

    console.log(state.search.results);
    // 3. Render Search Results

    const resultMarkup = state.search.results
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

    console.log(state.search.results);

    // Emptying result history
    searchResultView.innerHTML = "";
    // Render results
    searchResultView.insertAdjacentHTML("afterbegin", resultMarkup);
  } catch (err) {
    console.error(err);
    renderError(searchResultView, `${err}`);
  }
};

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Loading saerch result
  loadSearchResults();
});

window.addEventListener("hashchange", loadLyrics);
window.addEventListener("load", loadLyrics);

showAboutUs.addEventListener("click", () => {
  modal.showModal();
});

closeBtn.addEventListener("click", () => {
  modal.close();
});
