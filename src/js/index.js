const API_URL = "https://api.musixmatch.com/ws/1.1/";
const apiKey = "8a497867c325bbcf4b4c9d286f8450bb";
const errorMessage = "We couldn't find lyrics. try something else ...";
const searchForm = document.querySelector(".search");
const searchInputText = document.querySelector(".search__field");
const searchResultView = document.querySelector(".results");

let encodedString = encodeURIComponent("Tool sober");

const state = {
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
              <svg>
                <use href="src/img/icons.svg#triangle-exclamation"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
  `;
  parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML("afterbegin", markup);
};

const loadLyrics = async function (commontrackId) {
  try {
    // taking lyrics data
    const lyricsData = await getJSON(
      `${API_URL}track.lyrics.get?commontrack_id=${commontrackId}&apikey=${apiKey}`
    );
    // taking track data
    const data = await getJSON(
      `${API_URL}track.get?commontrack_id=${commontrackId}&apikey=${apiKey}`
    );
    console.log(data);
    // Reformating lyricsData
    let { lyrics } = lyricsData.message.body;
    lyrics = {
      id: lyrics.lyrics_id,
      Body: lyrics.lyrics_body,
      script: lyrics.script_tracking_url,
      imagePixel: lyrics.pixel_tracking_url,
      copyright: lyrics.lyrics_copyright,
      updatedTime: lyrics.updated_time,
    };

    console.log(lyrics);

    // Reformating track data
    let { track } = data.message.body;
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
      artistName: track.artistName,
      updatedTime: track.updated_time,
      updatedTime: track.updated_time,
      genre:
        track.primary_genres.music_genre_list[0].music_genre.music_genre_name,
      genres: track.primary_genres.music_genre_list,
    };

    console.log(track);
  } catch (err) {
    console.error(`${err} 🏀🏀🏀`);
  }
};

loadLyrics("93911869");

const loadSearchResults = async function () {
  try {
    renderSpinner(searchResultView);

    // 1) Get search query
    const query = await getQuery();
    if (!query) return;

    // 2) Load Search Results
    state.search.query = query;

    const data =
      await getJSON(`${API_URL}track.search?q_track_artist=${query}&page_size=7&page=1&apikey=${apiKey}&s_track_rating=DESC
      `);
    if (!data) return renderError(searchResultView);
    // Refactoring search result and pushing in state
    state.search.results = data.message.body.track_list.map(({ track }) => {
      return {
        trackId: track.track_id,
        trackName: track.track_name,
        commontrackId: track.commontrack_id,
        hasLyrics: track.has_lyrics,
        numFavourite: track.num_favourite,
        albumName: track.album_name,
        artistName: track.artist_name,
      };
    });

    // 3. Render Search Results

    const resultMarkup = state.search.results
      .map(
        (track) => `
      <li class="preview">
        <a href="#${track.commontrackId}" class="preview__link">
          <figure class="preview__img">
            <img src="src/img/test-1.jpg" alt="Test" />
          </figure>
          <div class="preview__data">
          <h3 class="preview__title">${track.trackName}</h3>
          <p class="preview__artist">${track.artistName}</p>
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
