if(!self.define){let e,i={};const d=(d,s)=>(d=new URL(d+".js",s).href,i[d]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=d,e.onload=i,document.head.appendChild(e)}else e=d,importScripts(d),i()})).then((()=>{let e=i[d];if(!e)throw new Error(`Module ${d} didn’t register its module`);return e})));self.define=(s,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let l={};const b=e=>d(e,c),n={module:{uri:c},exports:l,require:b};i[c]=Promise.all(s.map((e=>n[e]||b(e)))).then((e=>(r(...e),l)))}}define(["./workbox-254e291f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"404.html",revision:"6adfa59316bc0a3c608149d2863c80c2"},{url:"802/aio/index.html",revision:"9b45b25126164ff95742bad9c88bfc06"},{url:"802/aio/script.js",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"802/index.html",revision:"769676f10339c41d3b65a27c6ad97e9b"},{url:"802/schedule/index.html",revision:"69b5120ed42f6b6ab81f830e0af3d81a"},{url:"802/schedule/script.js",revision:"213b27b456e6b5bab35a9dd3dce560dd"},{url:"802/schedule/style.css",revision:"478fc9c180a395d59097ff40cc368199"},{url:"802/schedule/TODO.md",revision:"9d39a8226d8316592d90c9301c056583"},{url:"802/script.js",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"api/libs.css",revision:"c04c3de2e679739ebe200822d3e87341"},{url:"api/libs.js",revision:"f65c7d4b2db9b2e05b55fd067a79a744"},{url:"index.html",revision:"33bf333ff7de84f3bf7e596712a1e7cb"},{url:"numgame/events.js",revision:"ecd24ec4bd99473de1c6d35c34334508"},{url:"numgame/index.html",revision:"b741dc609084aed2f08a4840b463855b"},{url:"numgame/script.js",revision:"b3c2219637376e4ff687e01c5ab0a99b"},{url:"numgame/serviceworker.old.js",revision:"380af1aed1d34a37874d02c69710827b"},{url:"numgame/style.css",revision:"eea3204b7e73e15725162e85be892d84"},{url:"other/yapdetector/index.html",revision:"1696aec2b97b549ab75c27e4f1a3aff5"},{url:"other/yapdetector/script.js",revision:"71802fc66c6c18711710cc05d2dfbe8b"},{url:"README.md",revision:"2fd5d9509b987e4e91c9b8be4d65dc7b"},{url:"script.js",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"smh/index.html",revision:"47181d5ca80c4de84aefde684eb68dd0"},{url:"smh/script.js",revision:"1d3f95266b7b6f81cab61e0d8a2d5f8b"},{url:"style.css",revision:"28e6b33d7f1a3f3dcde74fd2895cbef0"},{url:"template/index.html",revision:"e41bedc06e43bc6832fbd701cb8a1533"},{url:"template/script.js",revision:"4969f200e8a899790131177f1bcad27c"},{url:"template/style.css",revision:"4b7a6d8df7a01ba9425f11aa5fcadcb6"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
