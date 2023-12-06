const urlApi = "https://api.musixmatch.com/ws/1.1/";
const apiKey = "8a497867c325bbcf4b4c9d286f8450bb";
let encodedString = encodeURIComponent("Tool sober");
let commontrackId = "148529";
const trackGet = "track.get?commontrack_id=";
const trackSearch = "track.search?q_track_artist=";

// for trackGet we use this:
const searchUrl = `${urlApi}${trackGet}${commontrackId}&page_size=5&page=1&apikey=${apiKey}&s_track_rating=DESC`;

// for trackSearch we use this :
// const searchUrl = `${urlApi}${trackSearch}${encodedString}&page_size=5&page=1&apikey=${apiKey}&s_track_rating=DESC`;

const searchMusic = async function () {
  try {
    const res = await fetch(searchUrl);
    const data = await res.json();

    if (data.message.body.length === 0) {
      throw new Error(`${data.message.header.status_code}`);
    } else if (data.message.header.available === 0) {
      throw new Error(`Not found Any Track!`);
    }

    console.log(res);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

searchMusic();
