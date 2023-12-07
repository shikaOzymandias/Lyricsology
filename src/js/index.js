const API_URL = "https://api.musixmatch.com/ws/1.1/";
const apiKey = "8a497867c325bbcf4b4c9d286f8450bb";
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

const loadLyrics = async function (commontrackId) {
  try {
    const data = await getJSON(
      `${API_URL}track.lyrics.get?commontrack_id=${commontrackId}&apikey=${apiKey}`
    );

    console.log(data);
  } catch (err) {
    console.error(`${err} 🏀🏀🏀`);
  }
};

// loadLyrics(commontrackId);

const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data =
      await getJSON(`${API_URL}track.search?q_track_artist=${query}&page_size=3&page=1&apikey=${apiKey}&s_track_rating=DESC
    `);

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

    console.log(data.message.body.track_list);
    console.log(state.search.results);
  } catch (err) {
    console.error(err);
  }
};

loadSearchResults("pink floyd");
