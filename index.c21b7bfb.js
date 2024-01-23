const e="https://api.musixmatch.com/ws/1.1/",t=`${process.env.MUSIX_API_KEY}`,a=`${process.env.GENIUS_API_KEY}`,s=document.querySelector(".search"),r=document.querySelector(".search__field"),i=document.querySelector(".results"),n=document.querySelector(".music"),c=document.getElementsByTagName("head")[0],o=document.querySelector(".modal"),l=document.querySelector(".nav__btn--about-us"),m=document.querySelector(".modal__btn-close");console.log(process.env.GENIUS_API_KEY),console.log(`${process.env.MUSIX_API_KEY}`);let d={search:{query:"",results:[]}};const u=async function(e){try{let t=await fetch(e),a=await t.json();if(0===a.message.body.length)throw Error(`Status Code: ${a.message.header.status_code}`);if(0===a.message.header.available)throw Error("Not found Any Track!");return a}catch(e){throw e}},g=function(){let e=r.value;return r.value="",e},_=function(e){let t=`
  <div class="u-margin-top-big spinner"></div>
  `;e.innerHTML="",e.insertAdjacentHTML("afterbegin",t)},p=function(e,t="We couldn't find lyrics. try something else ..."){let a=`
          <div class="error">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" class="svg-icon" style="color:#e40000;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          
            </div>
            <p>${t}</p>
          </div>
  `;e.innerHTML="",e.insertAdjacentHTML("afterbegin",a)},h=async function(){try{let s;let r=window.location.hash.slice(1);if(!r)return;console.log(r),_(n);let i=await u(`${e}track.lyrics.get?commontrack_id=${r}&apikey=${t}`),o=await u(`${e}track.get?commontrack_id=${r}&apikey=${t}`);console.log(d.search.results);let l=d.search.results;console.log(l),console.log(o),console.log(i);let{lyrics:m}=i.message.body;console.log(m),m={id:m.lyrics_id,body:m.lyrics_body,script:m.script_tracking_url,imagePixel:m.pixel_tracking_url,copyright:m.lyrics_copyright,updatedTime:m.updated_time};let g=`<script type="text/javascript" src="${m.script}">`;c.insertAdjacentHTML("beforeend",g);let{track:p}=o.message.body;console.log(p),p={id:p.track_id,title:p.track_name,commontrackId:p.commontrack_id,hasLyrics:p.has_lyrics,explicit:p.explicit,favourite:p.num_favourite,albumId:p.album_id,albumName:p.album_name,artistId:p.artist_id,artistName:p.artist_name,updatedTime:p.updated_time,...0!==p.primary_genres.music_genre_list.length&&{genre:p.primary_genres.music_genre_list[0].music_genre.music_genre_name},genres:p.primary_genres.music_genre_list};let h=`https://api.genius.com/search?q=${encodeURIComponent(p.artistName+" "+p.title)}&access_token=${a}`,y=await fetch(h),v=await y.json();console.log(v.response.hits[0]);let $={};0!==v.response.hits.length&&($=v.response.hits[0].result,console.log($),$={headerThumbnail:$.header_image_thumbnail_url,headerImage:$.song_art_image_url,...$.release_date_components&&{releaseDate:$.release_date_components.year},artistImageHeader:$.primary_artist.header_image_url},console.log($)),s=`
    
        <figure class="artist">
            <img
              src="${$.artistImageHeader?$.artistImageHeader:"src/img/404.png"}"
              alt="${p.artistName?$.artistName:"not found"}"
              class="artist__image"
          />
        </figure>
        
          
          <div class="music__details u-margin-bottom-medium">
          <img
              src="${$.headerImage?$.headerImage:"src/img/404.png"}"
              alt="${p.title?$.title:"not found"}"
              class="music__image"
          />
            <div class="music__info">
              <p><span>${p.title}</span></p>
              <p>
                <span>${p.artistName}</span> &#9679 <span>${p.albumName}</span>${$.releaseDate?` &#9679 <span>${$.releaseDate}</span>`:""}
                ${p.genre?` &#9679 <span>${p.genre}</span>`:""}
              </p>
            </div>
          </div>

        <div class="music__lyrics">

        ${p.hasLyrics?`
                    <p class="music__lyrics--body paragraph">${m.body}</p>
               
                    <img class="music__image-pixel" src="${m.imagePixel}" alt="image pixel" />
                    <div class="music__copyright"><span style="line-height:54px;vertical-align:top;">Lyrics licensed by </span><img src="src/img/mxm.png" width="184" height="54" alt="MusixMatch"></div>
                    
                    `:'<p class="paragraph">"There is no lyrics for this song or Maybe It\'s is a instrumental :)"</p>'}
        </div>
    `,n.innerHTML="",n.insertAdjacentHTML("afterbegin",s)}catch(e){console.error(`${e} \u{1F3C0}\u{1F3C0}\u{1F3C0}`),p(n,`${e}`)}},y=async function(){try{_(i);let a=await g();if(!a)return;d.search.query=a;let s=await u(`${e}track.search?q_track_artist=${encodeURIComponent(a)}&page_size=7&page=1&apikey=${t}&s_track_rating=DESC
      `);if(!s)return p(i);console.log(s.message.body.track_list),d.search.results=s.message.body.track_list.map(({track:e})=>({title:e.track_name,commontrackId:e.commontrack_id,albumName:e.album_name,artistName:e.artist_name})),console.log(d.search.results);let r=d.search.results.map(e=>`
      <li class="preview">
        <a href="#${e.commontrackId}" class="preview__link">
          <div class="preview__data">
          <h3 class="preview__title">${e.title}</h3>
          <p class="preview__artist-album">${e.artistName}<span> &#9679 </span>${e.albumName}</p>
          </div>
          </a>
          </li>
          `).join("");console.log(d.search.results),i.innerHTML="",i.insertAdjacentHTML("afterbegin",r)}catch(e){console.error(e),p(i,`${e}`)}};s.addEventListener("submit",function(e){e.preventDefault(),y()}),window.addEventListener("hashchange",h),window.addEventListener("load",h),l.addEventListener("click",()=>{o.showModal()}),m.addEventListener("click",()=>{o.close()});
//# sourceMappingURL=index.c21b7bfb.js.map
