const e="https://api.musixmatch.com/ws/1.1/",t="8a497867c325bbcf4b4c9d286f8450bb",a=document.querySelector(".search"),s=document.querySelector(".search__field"),r=document.querySelector(".results"),i=document.querySelector(".music"),n=document.getElementsByTagName("head")[0],c=document.querySelector(".pagination"),l=document.querySelector(".modal"),o=document.querySelector(".nav__btn--about-us"),m=document.querySelector(".modal__btn-close");let d={search:{query:"",results:[],resultsView:[],perPage:10,page:1}};const u=async function(e){try{let t=await fetch(e),a=await t.json();if(0===a.message.body.length)throw Error(`Status Code: ${a.message.header.status_code}`);if(0===a.message.header.available)throw Error("Not found Any Track!");return a}catch(e){throw e}},g=function(){let e=s.value;return s.value="",e},p=function(e){let t=`
  <div class="u-margin-top-big spinner"></div>
  `;e.innerHTML="",e.insertAdjacentHTML("afterbegin",t)},_=function(e,t="We couldn't find lyrics. try something else ..."){t.includes("is not valid JSON")&&(t="There is some problem with Genius Api. Try again later.");let a=`
          <div class="error">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" class="svg-icon" style="color:#e40000;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          
            </div>
            <p>${t}</p>
          </div>
  `;e.innerHTML="",e.insertAdjacentHTML("afterbegin",a)},h=async function(){try{let a;let s=window.location.hash.slice(1);if(!s)return;console.log(s),p(i);let r=await u(`${e}track.lyrics.get?commontrack_id=${s}&apikey=${t}`),c=await u(`${e}track.get?commontrack_id=${s}&apikey=${t}`);d.search.results;let{lyrics:l}=r.message.body;console.log(l),l={id:l.lyrics_id,body:l.lyrics_body,script:l.script_tracking_url,imagePixel:l.pixel_tracking_url,copyright:l.lyrics_copyright,updatedTime:l.updated_time};let o=`<script type="text/javascript" src="${l.script}">`;n.insertAdjacentHTML("beforeend",o);let{track:m}=c.message.body;console.log(m),m={id:m.track_id,title:m.track_name,commontrackId:m.commontrack_id,hasLyrics:m.has_lyrics,explicit:m.explicit,favourite:m.num_favourite,albumId:m.album_id,albumName:m.album_name,artistId:m.artist_id,artistName:m.artist_name,updatedTime:m.updated_time,...0!==m.primary_genres.music_genre_list.length&&{genre:m.primary_genres.music_genre_list[0].music_genre.music_genre_name},genres:m.primary_genres.music_genre_list};let g=`https://api.genius.com/search?q=${encodeURIComponent(m.artistName+" "+m.title)}&access_token=b-KgY7LZtvivwRqE1ztvRAKgmx_wq16cZzpuMvx5LPnwTgd3Pur-v9y_MMxKuvqJ`,_=await fetch(g),h=await _.json();console.log(_),console.log(h);let v={};0!==h.response.hits.length&&(v=h.response.hits[0].result,console.log(v),v={headerThumbnail:v.header_image_thumbnail_url,headerImage:v.song_art_image_url,...v.release_date_components&&{releaseDate:v.release_date_components.year},artistImageHeader:v.primary_artist.header_image_url}),a=`
        <figure class="artist">
            <img
              src="${v.artistImageHeader?v.artistImageHeader:"src/img/404.png"}"
              alt="${m.artistName?v.artistName:"not found"}"
              class="artist__image"
          />
        </figure>
        
          
          <div class="music__details u-margin-bottom-medium">
          <img
              src="${v.headerImage?v.headerImage:"src/img/404.png"}"
              alt="${m.title?v.title:"not found"}"
              class="music__image"
          />
            <div class="music__info">
              <p><span>${m.title}</span></p>
              <p>
                <span>${m.artistName}</span> &#9679 <span>${m.albumName}</span>${v.releaseDate?` &#9679 <span>${v.releaseDate}</span>`:""}
                ${m.genre?` &#9679 <span>${m.genre}</span>`:""}
              </p>
            </div>
          </div>

        <div class="music__lyrics">

        ${m.hasLyrics?`
                    <p class="music__lyrics--body paragraph">${l.body}</p>
               
                    <img class="music__image-pixel" src="${l.imagePixel}" alt="image pixel" />
                    <div class="music__copyright">
                    <span style="line-height:54px;vertical-align:top;">Lyrics licensed by </span><img src="https://www.azlyrics.com/images/mxm.png" width="184" height="54" alt="MusixMatch">
                    </div>
                    `:'<p class="paragraph">"There is no lyrics for this song or Maybe It\'s is a instrumental :)"</p>'}
        </div>
    `,i.innerHTML="",i.insertAdjacentHTML("afterbegin",a)}catch(e){console.error(`${e} \u{1F3C0}\u{1F3C0}\u{1F3C0}`),_(i,`${e}`)}},v=function(){let e=50/d.search.perPage,t=d.search.page,a=(e,a)=>`

    <button
      data-goto="${"prev"===e?t-1:t+1}"
      class="pagination__btn btn--inline pagination__btn--${e}">

      ${"next"===e?`<span>Page ${t+1}</span>`:""}
      
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="${a}" />
      </svg>

      ${"prev"===e?`<span>Page ${t-1}</span>`:""}
    </button>
  `;return 1===t&&e>1?a("next","M8.25 4.5l7.5 7.5-7.5 7.5"):t===e&&e>1?a("prev","M15.75 19.5L8.25 12l7.5-7.5"):e>t?a("prev","M15.75 19.5L8.25 12l7.5-7.5")+a("next","M8.25 4.5l7.5 7.5-7.5 7.5"):""},y=function(){let e=v();c.innerHTML="",c.insertAdjacentHTML("afterbegin",e)},b=function(e=d.search.page){d.search.page=e;let t=(e-1)*d.search.perPage,a=e*d.search.perPage;d.search.resultsView=d.search.results.slice(t,a);let s=d.search.resultsView.map(e=>`
      <li class="preview">
        <a href="#${e.commontrackId}" class="preview__link">
          <div class="preview__data">
          <h3 class="preview__title">${e.title}</h3>
          <p class="preview__artist-album">${e.artistName}<span> &#9679 </span>${e.albumName}</p>
          </div>
          </a>
          </li>
          `).join("");r.innerHTML="",r.insertAdjacentHTML("afterbegin",s)},w=function(){c.addEventListener("click",function(e){let t=e.target.closest(".pagination__btn");t&&(b(+t.dataset.goto),y())})},$=async function(){try{p(r);let a=await g();if(!a)return;d.search.query=a;let s=await u(`${e}track.search?q_track_artist=${encodeURIComponent(a)}&page_size=50&apikey=${t}&s_track_rating=DESC
      `);if(!s)return _(r);d.search.results=s.message.body.track_list.map(({track:e})=>({title:e.track_name,commontrackId:e.commontrack_id,albumName:e.album_name,artistName:e.artist_name})),b()}catch(e){console.error(e),_(r,`${e}`)}};a.addEventListener("submit",function(e){e.preventDefault(),d.search.page=1,$(),y(),w()}),window.addEventListener("hashchange",h),window.addEventListener("load",h),o.addEventListener("click",()=>{l.showModal()}),m.addEventListener("click",()=>{l.close()});
//# sourceMappingURL=index.c3a85146.js.map
