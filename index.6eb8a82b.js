!function(){let e="https://api.musixmatch.com/ws/1.1/",t="8a497867c325bbcf4b4c9d286f8450bb",a=document.querySelector(".search"),s=document.querySelector(".search__field"),r=document.querySelector(".results"),i=document.querySelector(".music"),c=document.getElementsByTagName("head")[0],n=document.querySelector(".modal"),l=document.querySelector(".nav__btn--about-us"),o=document.querySelector(".modal__btn-close");console.log("b-KgY7LZtvivwRqE1ztvRAKgmx_wq16cZzpuMvx5LPnwTgd3Pur-v9y_MMxKuvqJ"),console.log("8a497867c325bbcf4b4c9d286f8450bb");let m={search:{query:"",results:[]}},d=async function(e){try{let t=await fetch(e),a=await t.json();if(0===a.message.body.length)throw Error(`Status Code: ${a.message.header.status_code}`);if(0===a.message.header.available)throw Error("Not found Any Track!");return a}catch(e){throw e}},u=function(){let e=s.value;return s.value="",e},g=function(e){let t=`
  <div class="u-margin-top-big spinner"></div>
  `;e.innerHTML="",e.insertAdjacentHTML("afterbegin",t)},_=function(e,t="We couldn't find lyrics. try something else ..."){let a=`
          <div class="error">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" class="svg-icon" style="color:#e40000;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          
            </div>
            <p>${t}</p>
          </div>
  `;e.innerHTML="",e.insertAdjacentHTML("afterbegin",a)},p=async function(){try{let a;let s=window.location.hash.slice(1);if(!s)return;console.log(s),g(i);let r=await d(`${e}track.lyrics.get?commontrack_id=${s}&apikey=${t}`),n=await d(`${e}track.get?commontrack_id=${s}&apikey=${t}`);console.log(m.search.results);let l=m.search.results;console.log(l),console.log(n),console.log(r);let{lyrics:o}=r.message.body;console.log(o),o={id:o.lyrics_id,body:o.lyrics_body,script:o.script_tracking_url,imagePixel:o.pixel_tracking_url,copyright:o.lyrics_copyright,updatedTime:o.updated_time};let u=`<script type="text/javascript" src="${o.script}">`;c.insertAdjacentHTML("beforeend",u);let{track:_}=n.message.body;console.log(_),_={id:_.track_id,title:_.track_name,commontrackId:_.commontrack_id,hasLyrics:_.has_lyrics,explicit:_.explicit,favourite:_.num_favourite,albumId:_.album_id,albumName:_.album_name,artistId:_.artist_id,artistName:_.artist_name,updatedTime:_.updated_time,...0!==_.primary_genres.music_genre_list.length&&{genre:_.primary_genres.music_genre_list[0].music_genre.music_genre_name},genres:_.primary_genres.music_genre_list};let p=`https://api.genius.com/search?q=${encodeURIComponent(_.artistName+" "+_.title)}&access_token=b-KgY7LZtvivwRqE1ztvRAKgmx_wq16cZzpuMvx5LPnwTgd3Pur-v9y_MMxKuvqJ`,h=await fetch(p),y=await h.json();console.log(y.response.hits[0]);let v={};0!==y.response.hits.length&&(v=y.response.hits[0].result,console.log(v),v={headerThumbnail:v.header_image_thumbnail_url,headerImage:v.song_art_image_url,...v.release_date_components&&{releaseDate:v.release_date_components.year},artistImageHeader:v.primary_artist.header_image_url},console.log(v)),a=`
    
        <figure class="artist">
            <img
              src="${v.artistImageHeader?v.artistImageHeader:"src/img/404.png"}"
              alt="${_.artistName?v.artistName:"not found"}"
              class="artist__image"
          />
        </figure>
        
          
          <div class="music__details u-margin-bottom-medium">
          <img
              src="${v.headerImage?v.headerImage:"src/img/404.png"}"
              alt="${_.title?v.title:"not found"}"
              class="music__image"
          />
            <div class="music__info">
              <p><span>${_.title}</span></p>
              <p>
                <span>${_.artistName}</span> &#9679 <span>${_.albumName}</span>${v.releaseDate?` &#9679 <span>${v.releaseDate}</span>`:""}
                ${_.genre?` &#9679 <span>${_.genre}</span>`:""}
              </p>
            </div>
          </div>

        <div class="music__lyrics">

        ${_.hasLyrics?`
                    <p class="music__lyrics--body paragraph">${o.body}</p>
               
                    <img class="music__image-pixel" src="${o.imagePixel}" alt="image pixel" />
                    <div class="music__copyright"><span style="line-height:54px;vertical-align:top;">Lyrics licensed by </span><img src="src/img/mxm.png" width="184" height="54" alt="MusixMatch"></div>
                    
                    `:'<p class="paragraph">"There is no lyrics for this song or Maybe It\'s is a instrumental :)"</p>'}
        </div>
    `,i.innerHTML="",i.insertAdjacentHTML("afterbegin",a)}catch(e){console.error(`${e} \u{1F3C0}\u{1F3C0}\u{1F3C0}`),_(i,`${e}`)}},h=async function(){try{g(r);let a=await u();if(!a)return;m.search.query=a;let s=await d(`${e}track.search?q_track_artist=${encodeURIComponent(a)}&page_size=7&page=1&apikey=${t}&s_track_rating=DESC
      `);if(!s)return _(r);console.log(s.message.body.track_list),m.search.results=s.message.body.track_list.map(({track:e})=>({title:e.track_name,commontrackId:e.commontrack_id,albumName:e.album_name,artistName:e.artist_name})),console.log(m.search.results);let i=m.search.results.map(e=>`
      <li class="preview">
        <a href="#${e.commontrackId}" class="preview__link">
          <div class="preview__data">
          <h3 class="preview__title">${e.title}</h3>
          <p class="preview__artist-album">${e.artistName}<span> &#9679 </span>${e.albumName}</p>
          </div>
          </a>
          </li>
          `).join("");console.log(m.search.results),r.innerHTML="",r.insertAdjacentHTML("afterbegin",i)}catch(e){console.error(e),_(r,`${e}`)}};a.addEventListener("submit",function(e){e.preventDefault(),h()}),window.addEventListener("hashchange",p),window.addEventListener("load",p),l.addEventListener("click",()=>{n.showModal()}),o.addEventListener("click",()=>{n.close()})}();
//# sourceMappingURL=index.6eb8a82b.js.map
