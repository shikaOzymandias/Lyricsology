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

const loadLyrics = async function () {
  try {
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
      artistName: track.artist_name,
      updatedTime: track.updated_time,
      genre:
        track.primary_genres.music_genre_list[0].music_genre.music_genre_name,
      genres: track.primary_genres.music_genre_list,
    };

    /*
    {
    "annotation_count": 0,
    "api_path": "/songs/5192067",
    "artist_names": "Four Tet",
    "full_title": "School by Four Tet",
    "header_image_thumbnail_url": "https://images.genius.com/6c7166f0e2402f07bac72605f935e4b6.300x300x1.png",
    "header_image_url": "https://images.genius.com/6c7166f0e2402f07bac72605f935e4b6.1000x1000x1.png",
    "id": 5192067,
    "lyrics_owner_id": 126836,
    "lyrics_state": "complete",
    "path": "/Four-tet-school-lyrics",
    "pyongs_count": null,
    "relationships_index_url": "https://genius.com/Four-tet-school-sample",
    "release_date_components": {
        "year": 2020,
        "month": 3,
        "day": 13
    },
    "release_date_for_display": "March 13, 2020",
    "release_date_with_abbreviated_month_for_display": "Mar. 13, 2020",
    "song_art_image_thumbnail_url": "https://images.genius.com/6c7166f0e2402f07bac72605f935e4b6.300x300x1.png",
    "song_art_image_url": "https://images.genius.com/6c7166f0e2402f07bac72605f935e4b6.1000x1000x1.png",
    "stats": {
        "unreviewed_annotations": 0,
        "hot": false
    },
    "title": "School",
    "title_with_featured": "School",
    "url": "https://genius.com/Four-tet-school-lyrics",
    "featured_artists": [],
    "primary_artist": {
        "api_path": "/artists/126879",
        "header_image_url": "https://images.genius.com/758d5b9bd6bd73589a71191e91be6ead.1000x623x1.jpg",
        "id": 126879,
        "image_url": "https://images.genius.com/da67b89ca36c1821f5627438df89a1e5.1000x1000x1.jpg",
        "is_meme_verified": false,
        "is_verified": false,
        "name": "Four Tet",
        "url": "https://genius.com/artists/Four-tet"
    }
}
    */
    // genuis api

    const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(
      track.artistName + " " + track.title
    )}&access_token=${apiKeyGen}`;

    const resGen = await fetch(searchUrl);
    const dataGen = await resGen.json();
    let { result } = dataGen.response.hits[0];

    result = {
      headerThumbnail: result.header_image_thumbnail_url,
      headerImage: result.header_image_url,
      releaseDate: result.release_date_for_display,
      artistImageHeader: result.primary_artist.header_image_url,
    };
    console.log(result);

    // does not work like this i guess beacasue of getJSON
    // const result = await getJSON(searchUrl);
    // console.log(result);

    // 2) Rendering Lyrics and Music info

    const markup = `
        <section class="section-about">
          <h1 class="u-center-text u-margin-bottom-medium heading-primary lyricsoligy-text-color">
            welcome to Lyricsology<br />Where Lyrics Come to Life
          </h1>

          <img src="${result.artistImageHeader}" alt="Artist image" />
          <img src="${result.headerThumbnail}" alt="header image" />
          <p class="paragraph">Date Release: ${result.releaseDate}</p>
          <p class="paragraph">IdTrack: ${track.id}</p>
          <p class="paragraph">Artist: ${track.artistName}</p>
          <p class="paragraph">Title: ${track.title}</p>
          <p class="paragraph">Album: ${track.albumName}</p>
          <p class="paragraph">Fav: ${track.favourite}</p>
          <p class="paragraph">LastUpdated: ${track.updatedTime}</p>
          <p class="paragraph">Genre: ${track.genre}</p>
          ${
            !track.hasLyrics
              ? `<p class="paragraph">"There is no lyrics for this song or Maybe this song is a instrumental!"</p>`
              : `
              <p class="paragraph">Lyrics: ${lyrics.body}</p>
              <p class="paragraph">CopyRight: ${lyrics.copyright}</p>
              <img class="section-about__img" src="${lyrics.imagePixel}" alt="image pixel" />`
          }
          
          
        </section>
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

window.addEventListener("hashchange", loadLyrics);
window.addEventListener("load", loadLyrics);
