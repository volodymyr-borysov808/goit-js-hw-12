import{a as k,S as P,i as T}from"./assets/vendor-DEenWwFD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const f=document.querySelector(".loader"),p=s=>{const{webformatURL:t,largeImageURL:o,tags:a,likes:e,views:r,comments:i,downloads:S}=s;return`  
  <li class="gallery-item">
    <a class="gallery-link" href="${o}">
      <img class="gallery-img" src="${t}" alt="${a}"  />
    </a>
      <div class="container">
        <div class="deck-img">
        likes
          <h2 class="value-deck-img">${e}</h2>
        </div>
        <div class="deck-img">
        views
          <h2 class="value-deck-img">${r}</h2>
        </div>
        <div class="deck-img">
        comments
          <h2 class="value-deck-img">${i}</h2>
        </div>
        <div class="deck-img">
        downloads
          <h2 class="value-deck-img">${S}</h2>
        </div>
      </div>
  </li>`},v=()=>f.style.display="block",n=()=>f.style.display="none",L=(s,t)=>k("https://pixabay.com/api/",{params:{page:t,q:s,per_page:15,key:"48317789-78974bc54d3835e3e1fe36f62",safesearch:!0,orientation:"horizontal",image_type:"photo"}}),h=document.querySelector(".main-form"),c=document.querySelector(".list-gallery"),d=document.querySelector(".js-load-more"),m=T,u={title:"❌ Sorry",color:"red",position:"topRight"},w=new P(".list-gallery a",{captionsData:"alt",captionDelay:250});let l=1,g="",y="";const q=async s=>{try{if(s.preventDefault(),v(),g=s.currentTarget.elements.user_search_query.value.trim(),c.innerHTML="",l=1,d.classList.add("is-hidden"),g===""){m.show({...u,color:"orange",message:"Please enter a keyword"}),n(),h.reset(),c.innerHTML="";return}const{data:t}=await L(g,l);if(t.total===0){m.show({...u,message:"There are no images matching your search query. Please try again!"}),n(),h.reset(),c.innerHTML="";return}y=Math.ceil(t.totalHits/15);const o=t.hits.map(a=>p(a)).join("");c.innerHTML=o,w.refresh(),h.reset(),l<y&&d.classList.remove("is-hidden"),d.addEventListener("click",b)}catch(t){m.show({...u,message:t.message})}finally{n()}};h.addEventListener("submit",q);const b=async s=>{try{l++,v();const{data:t}=await L(g,l),o=t.hits.map(i=>p(i)).join("");c.insertAdjacentHTML("beforeend",o),n(),w.refresh();const r=document.querySelector(".gallery-item").getBoundingClientRect().height*2;window.scrollBy({top:r,behavior:"smooth"}),l>=y&&(d.classList.add("is-hidden"),d.removeEventListener("click",b),m.show({...u,color:"orange",message:"We're sorry, but you've reached the end of search results."}))}catch(t){m.show({...u,message:t.message})}finally{n()}};
//# sourceMappingURL=index.js.map
