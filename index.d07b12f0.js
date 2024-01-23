!function(){let e="https://api.musixmatch.com/ws/1.1/",t=secrets.MUSIX_API_KEY,a=secrets.GENIUS_API_KEY,s=document.querySelector(".search"),r=document.querySelector(".search__field"),i=document.querySelector(".results"),n=document.querySelector(".music"),c=document.getElementsByTagName("head")[0],l=document.querySelector(".pagination"),o=document.querySelector(".modal"),m=document.querySelector(".nav__btn--about-us"),d=document.querySelector(".modal__btn-close");console.log(t);let u={search:{query:"",results:[],resultsView:[],perPage:10,page:1}};addEventListener("fetch",e=>{e.respondWith(handleRequest(e.request))});let g=async function(e){try{let t=await fetch(e),a=await t.json();if(0===a.message.body.length)throw Error(`Status Code: ${a.message.header.status_code}`);if(0===a.message.header.available)throw Error("Not found Any Track!");return a}catch(e){throw e}},p=function(){let e=r.value;return r.value="",e},_=function(e){let t=`
  <div class="u-margin-top-big spinner"></div>
  `;e.innerHTML="",e.insertAdjacentHTML("afterbegin",t)},h=function(e,t="We couldn't find lyrics. try something else ..."){t.includes("is not valid JSON")&&(t="There is some problem with Genius Api. Try again later.");let a=`
          <div class="error">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" class="svg-icon" style="color:#e40000;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          
            </div>
            <p>${t}</p>
          </div>
  `;e.innerHTML="",e.insertAdjacentHTML("afterbegin",a)},y=async function(){try{let s;let r=window.location.hash.slice(1);if(!r)return;console.log(r),_(n);let i=await g(`${e}track.lyrics.get?commontrack_id=${r}&apikey=${t}`),l=await g(`${e}track.get?commontrack_id=${r}&apikey=${t}`);u.search.results;let{lyrics:o}=i.message.body;console.log(o),o={id:o.lyrics_id,body:o.lyrics_body,script:o.script_tracking_url,imagePixel:o.pixel_tracking_url,copyright:o.lyrics_copyright,updatedTime:o.updated_time};let m=`<script type="text/javascript" src="${o.script}">`;c.insertAdjacentHTML("beforeend",m);let{track:d}=l.message.body;console.log(d),d={id:d.track_id,title:d.track_name,commontrackId:d.commontrack_id,hasLyrics:d.has_lyrics,explicit:d.explicit,favourite:d.num_favourite,albumId:d.album_id,albumName:d.album_name,artistId:d.artist_id,artistName:d.artist_name,updatedTime:d.updated_time,...0!==d.primary_genres.music_genre_list.length&&{genre:d.primary_genres.music_genre_list[0].music_genre.music_genre_name},genres:d.primary_genres.music_genre_list};let p=`https://api.genius.com/search?q=${encodeURIComponent(d.artistName+" "+d.title)}&access_token=${a}`,h=await fetch(p),y=await h.json();console.log(h),console.log(y);let v={};0!==y.response.hits.length&&(v=y.response.hits[0].result,console.log(v),v={headerThumbnail:v.header_image_thumbnail_url,headerImage:v.song_art_image_url,...v.release_date_components&&{releaseDate:v.release_date_components.year},artistImageHeader:v.primary_artist.header_image_url}),s=`
        <figure class="artist">
            <img
              src="${v.artistImageHeader?v.artistImageHeader:"src/img/404.png"}"
              alt="${d.artistName?v.artistName:"not found"}"
              class="artist__image"
          />
        </figure>
        
          
          <div class="music__details u-margin-bottom-medium">
          <img
              src="${v.headerImage?v.headerImage:"src/img/404.png"}"
              alt="${d.title?v.title:"not found"}"
              class="music__image"
          />
            <div class="music__info">
              <p><span>${d.title}</span></p>
              <p>
                <span>${d.artistName}</span> &#9679 <span>${d.albumName}</span>${v.releaseDate?` &#9679 <span>${v.releaseDate}</span>`:""}
                ${d.genre?` &#9679 <span>${d.genre}</span>`:""}
              </p>
            </div>
          </div>

        <div class="music__lyrics">

        ${d.hasLyrics?`
                    <p class="music__lyrics--body paragraph">${o.body}</p>
               
                    <img class="music__image-pixel" src="${o.imagePixel}" alt="image pixel" />
                    <div class="music__copyright">
                    <span style="line-height:54px;vertical-align:top;">Lyrics licensed by </span><img src="https://www.azlyrics.com/images/mxm.png" width="184" height="54" alt="MusixMatch">
                    </div>
                    `:'<p class="paragraph">"There is no lyrics for this song or Maybe It\'s is a instrumental :)"</p>'}
        </div>
    `,n.innerHTML="",n.insertAdjacentHTML("afterbegin",s)}catch(e){console.error(`${e} \u{1F3C0}\u{1F3C0}\u{1F3C0}`),h(n,`${e}`)}},v=function(){let e=50/u.search.perPage,t=u.search.page,a=(e,a)=>`

    <button
      data-goto="${"prev"===e?t-1:t+1}"
      class="pagination__btn btn--inline pagination__btn--${e}">

      ${"next"===e?`<span>Page ${t+1}</span>`:""}
      
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="${a}" />
      </svg>

      ${"prev"===e?`<span>Page ${t-1}</span>`:""}
    </button>
  `;return 1===t&&e>1?a("next","M8.25 4.5l7.5 7.5-7.5 7.5"):t===e&&e>1?a("prev","M15.75 19.5L8.25 12l7.5-7.5"):e>t?a("prev","M15.75 19.5L8.25 12l7.5-7.5")+a("next","M8.25 4.5l7.5 7.5-7.5 7.5"):""},w=function(){let e=v();l.innerHTML="",l.insertAdjacentHTML("afterbegin",e)},$=function(e=u.search.page){u.search.page=e;let t=(e-1)*u.search.perPage,a=e*u.search.perPage;u.search.resultsView=u.search.results.slice(t,a);let s=u.search.resultsView.map(e=>`
      <li class="preview">
        <a href="#${e.commontrackId}" class="preview__link">
          <div class="preview__data">
          <h3 class="preview__title">${e.title}</h3>
          <p class="preview__artist-album">${e.artistName}<span> &#9679 </span>${e.albumName}</p>
          </div>
          </a>
          </li>
          `).join("");i.innerHTML="",i.insertAdjacentHTML("afterbegin",s)},b=function(){l.addEventListener("click",function(e){let t=e.target.closest(".pagination__btn");t&&($(+t.dataset.goto),w())})},f=async function(){try{_(i);let a=await p();if(!a)return;u.search.query=a;let s=await g(`${e}track.search?q_track_artist=${encodeURIComponent(a)}&page_size=50&apikey=${t}&s_track_rating=DESC
      `);if(!s)return h(i);u.search.results=s.message.body.track_list.map(({track:e})=>({title:e.track_name,commontrackId:e.commontrack_id,albumName:e.album_name,artistName:e.artist_name})),$()}catch(e){console.error(e),h(i,`${e}`)}};s.addEventListener("submit",function(e){e.preventDefault(),u.search.page=1,f(),w(),b()}),window.addEventListener("hashchange",y),window.addEventListener("load",y),m.addEventListener("click",()=>{o.showModal()}),d.addEventListener("click",()=>{o.close()})}();
//# sourceMappingURL=index.d07b12f0.js.map
