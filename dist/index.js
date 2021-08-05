(()=>{"use strict";var e={898:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.GetAccessToken=void 0;const o=a(n(362)),r=n(225),i=n(562),s=".accesstoken";t.GetAccessToken=async function(){let e=await async function(){return await r.readFile(s,"utf8")}();return""===e&&(e=await async function(){let e=await o.default([{type:"text",name:"username",message:"Funimation Username (Never stored)"},{type:"password",name:"password",message:"Funimation Password (Never stored)"}]);return i.Login(e)}(),await async function(e){return await r.writeFile(s,e)}(e)),e}},913:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.userAgent=t.SOURCE_API=void 0,t.SOURCE_API="https://prod-api-funimationnow.dadcdigital.com/api/",t.userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.864.59"},607:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=a(n(362)),r=n(463);async function i(e){const t={type:"autocomplete",name:"animeId",message:"Which one is right? (autocomplete or arrow keys)",choices:e.map((e=>({title:e.title,description:e.description,value:e.id})))};return(await o.default(t)).animeId}async function s(e){const t={type:"multiselect",name:"Seasons",message:"Select seasons",choices:e.map((e=>({title:e.title,description:e.parent.synopsis,value:e})))};let n=await o.default(t);for(let e=0;e<n.Seasons.length;e++)console.log(JSON.stringify(n.Seasons[e].ids));return n.animeId}(async()=>{for(;;){let e=await r.IdSearch(),t=await i(e);console.log(t);let n=await r.CatalogSearch(t);console.log(n);let a=await s(n);console.log(a)}})()},463:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.CatalogSearch=t.IdSearch=void 0;const o=a(n(362)),r=n(562);t.IdSearch=async function(){let e=await async function(){let e=await o.default([{type:"text",name:"title",message:"Search Funimation🔎"}]);return r.QueryIds(e)}();return 0===e.length&&console.log("No results"),e},t.CatalogSearch=async function(e){return await async function(e){return await r.QueryCatalog(e)}({animeId:e})}},562:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.QueryCatalog=t.QueryIds=t.Login=void 0;const a=n(898),o=n(913),r=n(786),i=`${o.SOURCE_API}auth/login/`,s=(o.SOURCE_API,`${o.SOURCE_API}source/funimation/search/?q=`),u=`${o.SOURCE_API}source/catalog/title/`;async function c(){return`Token ${await a.GetAccessToken()}`}t.Login=async function(e){return r(`${o.SOURCE_API}${i}`,{method:"POST",body:JSON.stringify(e),headers:{"user-agent":o.userAgent},proxy:!0}).then((function(e){return e.json()})).then((function(e){return e.token})).catch((function(e){return e}))},t.QueryIds=async function(e){let t=c();return r(`${s}${e.title}`,{method:"GET",proxy:!0,headers:{"user-agent":o.userAgent,Authorization:t}}).then((function(e){return e.json()})).then((function(e){return e.items.hits})).catch((function(e){return e}))},t.QueryCatalog=async function(e){let t=c();return r(`${u}${e.animeId}/`,{method:"GET",proxy:!0,headers:{"user-agent":o.userAgent,Authorization:t}}).then((e=>e.json())).then((e=>e.items[0])).then((e=>e.children.filter((e=>"season"===e.mediaCategory)))).catch((e=>e))}},225:e=>{e.exports=require("fs/promises")},786:e=>{e.exports=require("node-fetch")},362:e=>{e.exports=require("prompts")}},t={},n=function n(a){var o=t[a];if(void 0!==o)return o.exports;var r=t[a]={exports:{}};return e[a].call(r.exports,r,r.exports,n),r.exports}(607);for(var a in n)this[a]=n[a];n.__esModule&&Object.defineProperty(this,"__esModule",{value:!0})})();