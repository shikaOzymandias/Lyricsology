// const maindev = document.getElementById("main");
// console.log(maindev);
// const showLyrics = async function (){
//     try{
//         const lyric = await fetch('http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist=michael%20jackson&song=bad');
//         const parseData = await lyric.text();
//         let data = new window.DOMParser().parseFromString(parseData, "text/xml");

//         console.log(lyric,"+",data);
//     }catch(err){
//         console.log(err);
//     }
// };

// showLyrics();

const apiKey =
  "q6Ya5C5zFjmCQLqotRwhgD8WSBV3v8An_1nJUptK0kCFltrf-ig1jJJF3aE9SV9Y";
const url = "https://api.genius.com";
const searchUrl = `${url}/search?q=tool%20Sober&access_token=${apiKey}`;
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
// 		'X-RapidAPI-Host': 'billboard-api2.p.rapidapi.com'
// 	}
// };
const showLyrics = async function () {
  const res = await fetch(`${searchUrl}`);
  const data = await res.json();

  console.log(data);
};

showLyrics();
