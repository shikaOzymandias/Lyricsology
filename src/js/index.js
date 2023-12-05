const urlApi = "https://api.musixmatch.com/ws/1.1/";
const apiKey = "8a497867c325bbcf4b4c9d286f8450bb";
let encodedString = encodeURIComponent("tool sober");
const searchUrl = `${urlApi}track.search?q_track_artist=${encodedString}&page_size=5&page=1&apikey=${apiKey}&s_track_rating=DESC`;
const mode = {
  mode: "cors",
  method: "POST",
};
const searchMusic = async function () {
  try {
    const res = await fetch(searchUrl, mode);
    const data = await res.json();

    console.log(data);
    console.log(res);
  } catch (error) {
    console.error("Error:", error);
  }
};

searchMusic();
