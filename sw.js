if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const f=e=>n(e,o),a={module:{uri:o},exports:c,require:f};i[o]=Promise.all(r.map((e=>a[e]||f(e)))).then((e=>(s(...e),c)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-68e9074d.css",revision:null},{url:"assets/index-dc3f5c3d.js",revision:null},{url:"index.html",revision:"25ae18c1756d8a5d7c2eb6f520f65279"},{url:"OneSignalSDKWorker.js",revision:"bb342b01d13bebb317c67b881692efd3"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"favicon.ico",revision:"0b9471418afe82df9a6369491e6374aa"},{url:"maskable_icon.png",revision:"2b9ab6167e96ab9031506f4e8c931732"},{url:"android-chrome-192x192.png",revision:"3831c9f0efcc28b5acc97c357026affc"},{url:"android-chrome-512x512.png",revision:"2b9ab6167e96ab9031506f4e8c931732"},{url:"apple-touch-icon.png",revision:"946487e839ee409efac56ee3a2c01d3d"},{url:"add.png",revision:"8490973d1bd51664e3c3b21c41fe065a"},{url:"user.png",revision:"11efeabaf8a2f94cd2bbaafeb18e48bd"},{url:"manifest.webmanifest",revision:"fbb148356ed9eff4739ba2d189b75f50"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
