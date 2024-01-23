const e="https://api.musixmatch.com/ws/1.1/",t=document.querySelector(".search"),a=document.querySelector(".search__field"),s=document.querySelector(".results"),i=document.querySelector(".music"),r=document.getElementsByTagName("head")[0],n=document.querySelector(".pagination"),c=document.querySelector(".modal"),l=document.querySelector(".nav__btn--about-us"),o=document.querySelector(".modal__btn-close");console.log("b-KgY7LZtvivwRqE1ztvRAKgmx_wq16cZzpuMvx5LPnwTgd3Pur-v9y_MMxKuvqJ");let m={search:{query:"",results:[],resultsView:[],perPage:10,page:1}};const d=async function(e){try{let t=await fetch(e),a=await t.json();if(0===a.message.body.length)throw Error(`Status Code: ${a.message.header.status_code}`);if(0===a.message.header.available)throw Error("Not found Any Track!");return a}catch(e){throw e}},u=function(){let e=a.value;return a.value="",e},g=function(e){let t=`
  <div class="u-margin-top-big spinner"></div>
  `;e.innerHTML="",e.insertAdjacentHTML("afterbegin",t)},p=function(e,t="We couldn't find lyrics. try something else ..."){t.includes("is not valid JSON")&&(t="There is some problem with Genius Api. Try again later.");let a=`
          <div class="error">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" class="svg-icon" style="color:#e40000;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          
            </div>
            <p>${t}</p>
          </div>
  `;e.innerHTML="",e.insertAdjacentHTML("afterbegin",a)},_=async function(){try{let t;let a=window.location.hash.slice(1);if(!a)return;console.log(a),g(i);let s=await d(`${e}track.lyrics.get?commontrack_id=${a}&apikey=${apiKey}`),n=await d(`${e}track.get?commontrack_id=${a}&apikey=${apiKey}`);m.search.results;let{lyrics:c}=s.message.body;console.log(c),c={id:c.lyrics_id,body:c.lyrics_body,script:c.script_tracking_url,imagePixel:c.pixel_tracking_url,copyright:c.lyrics_copyright,updatedTime:c.updated_time};let l=`<script type="text/javascript" src="${c.script}">`;r.insertAdjacentHTML("beforeend",l);let{track:o}=n.message.body;console.log(o),o={id:o.track_id,title:o.track_name,commontrackId:o.commontrack_id,hasLyrics:o.has_lyrics,explicit:o.explicit,favourite:o.num_favourite,albumId:o.album_id,albumName:o.album_name,artistId:o.artist_id,artistName:o.artist_name,updatedTime:o.updated_time,...0!==o.primary_genres.music_genre_list.length&&{genre:o.primary_genres.music_genre_list[0].music_genre.music_genre_name},genres:o.primary_genres.music_genre_list};let u=`https://api.genius.com/search?q=${encodeURIComponent(o.artistName+" "+o.title)}&access_token=${apiKeyGen}`,p=await fetch(u),_=await p.json();console.log(p),console.log(_);let h={};0!==_.response.hits.length&&(h=_.response.hits[0].result,console.log(h),h={headerThumbnail:h.header_image_thumbnail_url,headerImage:h.song_art_image_url,...h.release_date_components&&{releaseDate:h.release_date_components.year},artistImageHeader:h.primary_artist.header_image_url}),t=`
        <figure class="artist">
            <img
              src="${h.artistImageHeader?h.artistImageHeader:"src/img/404.png"}"
              alt="${o.artistName?h.artistName:"not found"}"
              class="artist__image"
          />
        </figure>
        
          
          <div class="music__details u-margin-bottom-medium">
          <img
              src="${h.headerImage?h.headerImage:"src/img/404.png"}"
              alt="${o.title?h.title:"not found"}"
              class="music__image"
          />
            <div class="music__info">
              <p><span>${o.title}</span></p>
              <p>
                <span>${o.artistName}</span> &#9679 <span>${o.albumName}</span>${h.releaseDate?` &#9679 <span>${h.releaseDate}</span>`:""}
                ${o.genre?` &#9679 <span>${o.genre}</span>`:""}
              </p>
            </div>
          </div>

        <div class="music__lyrics">

        ${o.hasLyrics?`
                    <p class="music__lyrics--body paragraph">${c.body}</p>
               
                    <img class="music__image-pixel" src="${c.imagePixel}" alt="image pixel" />
                    <div class="music__copyright">
                    <span style="line-height:54px;vertical-align:top;">Lyrics licensed by </span><img src="../img/mxm.png" width="184" height="54" alt="MusixMatch">
                    </div>
                    `:'<p class="paragraph">"There is no lyrics for this song or Maybe It\'s is a instrumental :)"</p>'}
        </div>
    `,i.innerHTML="",i.insertAdjacentHTML("afterbegin",t)}catch(e){console.error(`${e} \u{1F3C0}\u{1F3C0}\u{1F3C0}`),p(i,`${e}`)}},h=function(){let e=50/m.search.perPage,t=m.search.page,a=(e,a)=>`

    <button
      data-goto="${"prev"===e?t-1:t+1}"
      class="pagination__btn btn--inline pagination__btn--${e}">

      ${"next"===e?`<span>Page ${t+1}</span>`:""}
      
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="${a}" />
      </svg>

      ${"prev"===e?`<span>Page ${t-1}</span>`:""}
    </button>
  `;return 1===t&&e>1?a("next","M8.25 4.5l7.5 7.5-7.5 7.5"):t===e&&e>1?a("prev","M15.75 19.5L8.25 12l7.5-7.5"):e>t?a("prev","M15.75 19.5L8.25 12l7.5-7.5")+a("next","M8.25 4.5l7.5 7.5-7.5 7.5"):""},y=function(){let e=h();n.innerHTML="",n.insertAdjacentHTML("afterbegin",e)},v=function(e=m.search.page){m.search.page=e;let t=(e-1)*m.search.perPage,a=e*m.search.perPage;m.search.resultsView=m.search.results.slice(t,a);let i=m.search.resultsView.map(e=>`
      <li class="preview">
        <a href="#${e.commontrackId}" class="preview__link">
          <div class="preview__data">
          <h3 class="preview__title">${e.title}</h3>
          <p class="preview__artist-album">${e.artistName}<span> &#9679 </span>${e.albumName}</p>
          </div>
          </a>
          </li>
          `).join("");s.innerHTML="",s.insertAdjacentHTML("afterbegin",i)},b=function(){n.addEventListener("click",function(e){let t=e.target.closest(".pagination__btn");t&&(v(+t.dataset.goto),y())})},w=async function(){try{g(s);let t=await u();if(!t)return;m.search.query=t;let a=await d(`${e}track.search?q_track_artist=${encodeURIComponent(t)}&page_size=50&apikey=${apiKey}&s_track_rating=DESC
      `);if(!a)return p(s);m.search.results=a.message.body.track_list.map(({track:e})=>({title:e.track_name,commontrackId:e.commontrack_id,albumName:e.album_name,artistName:e.artist_name})),v()}catch(e){console.error(e),p(s,`${e}`)}};t.addEventListener("submit",function(e){e.preventDefault(),m.search.page=1,w(),y(),b()}),window.addEventListener("hashchange",_),window.addEventListener("load",_),l.addEventListener("click",()=>{c.showModal()}),o.addEventListener("click",()=>{c.close()});
//# sourceMappingURL=index.238ab169.js.map
