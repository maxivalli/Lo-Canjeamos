if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let d={};const t=e=>n(e,o),c={module:{uri:o},exports:d,require:t};i[o]=Promise.all(s.map((e=>c[e]||t(e)))).then((e=>(r(...e),d)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-ca711f2d.css",revision:null},{url:"assets/index-f830423d.js",revision:null},{url:"index.html",revision:"0826a55870d983cfa89fd1b3c995d899"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"android-chrome-192x192.png",revision:"c8bf59f441d3bd6aa695c9da77f57b59"},{url:"android-chrome-512x512.png",revision:"3a30121d532995c8ebeab4b3d3276840"},{url:"apple-touch-icon.png",revision:"8afbfcde29e791f64d5bb3087579d30e"},{url:"manifest.webmanifest",revision:"5e51af105e9328d9f2f16c57cbc92d1b"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
