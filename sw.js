if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,c)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let l={};const n=e=>s(e,d),t={module:{uri:d},exports:l,require:n};i[d]=Promise.all(r.map((e=>t[e]||n(e)))).then((e=>(c(...e),l)))}}define(["./workbox-254e291f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"404.html",revision:"6adfa59316bc0a3c608149d2863c80c2"},{url:"802/aio/index.html",revision:"9b45b25126164ff95742bad9c88bfc06"},{url:"802/aio/script.js",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"802/index.html",revision:"769676f10339c41d3b65a27c6ad97e9b"},{url:"802/schedule/index.html",revision:"ce1975d89ff71616582956bcf23ca766"},{url:"802/schedule/script.js",revision:"d8df72444ea7a1797c323108174bd242"},{url:"802/schedule/style.css",revision:"44372ccec0591b6270f5365124b63573"},{url:"802/schedule/TODO.md",revision:"9d39a8226d8316592d90c9301c056583"},{url:"802/script.js",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"api/libs.css",revision:"c04c3de2e679739ebe200822d3e87341"},{url:"api/libs.js",revision:"da225fe18d68e4c1088ac562ade94f4d"},{url:"index.html",revision:"33bf333ff7de84f3bf7e596712a1e7cb"},{url:"numgame/events.js",revision:"ecd24ec4bd99473de1c6d35c34334508"},{url:"numgame/index.html",revision:"b741dc609084aed2f08a4840b463855b"},{url:"numgame/script.js",revision:"e8c4c4158eb13d3ff4ebba60aed99bf5"},{url:"numgame/serviceworker.old.js",revision:"380af1aed1d34a37874d02c69710827b"},{url:"numgame/style.css",revision:"eea3204b7e73e15725162e85be892d84"},{url:"other/yapdetector/index.html",revision:"1696aec2b97b549ab75c27e4f1a3aff5"},{url:"other/yapdetector/script.js",revision:"71802fc66c6c18711710cc05d2dfbe8b"},{url:"README.md",revision:"2fd5d9509b987e4e91c9b8be4d65dc7b"},{url:"script.js",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"smh/index.html",revision:"e2509f41761efb14f46a3a28931c9b8a"},{url:"smh/script.js",revision:"364d05020e4ef37df3e5379d084e53c6"},{url:"style.css",revision:"72d13ca377a3e9e1ad7e8ba52304f884"},{url:"template/index.html",revision:"e41bedc06e43bc6832fbd701cb8a1533"},{url:"template/script.js",revision:"4969f200e8a899790131177f1bcad27c"},{url:"template/style.css",revision:"4b7a6d8df7a01ba9425f11aa5fcadcb6"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
