!function e(t,r,n){function o(i,s){if(!r[i]){if(!t[i]){var c="function"==typeof require&&require;if(!s&&c)return c(i,!0);if(a)return a(i,!0);throw new Error("Cannot find module '"+i+"'")}var u=r[i]={exports:{}};t[i][0].call(u.exports,function(e){var r=t[i][1][e];return o(r?r:e)},u,u.exports,e,t,r,n)}return r[i].exports}for(var a="function"==typeof require&&require,i=0;i<n.length;i++)o(n[i]);return o}({1:[function(e){"use strict";e("./misc/console-fix"),$(document).ready(function(){function e(e){$(".message").html(e).addClass("error")}var t="1yO1pAsB1jsqhao3KZGUhgT2lsNNN0jkGdj4CINVnAsU";window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(e,r,n){"spreadid"===r&&(t=n)});var r="https://spreadsheets.google.com/feeds/list/"+t+"/od6/public/values?alt=json";$.getJSON(r,function(t){$(".message").slideUp("fast");var r=t.feed&&t.feed.title&&t.feed.title.$t?t.feed.title.$t:"Sample timeline";if($("h1").text(r),!t||!t.feed||!t.feed.entry)return e("Error in the spreadsheet - bad format"),!1;var n={date:"",content:"",extra:"",source:"",url:"",title:""},o=/(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;t.feed.entry.forEach(function(e){var t={};for(var r in n)t[r]=e["gsx$"+r]&&e["gsx$"+r].$t?e["gsx$"+r].$t:n[r];switch(t.source){case"instagram":t.title="Nouvelle photo sur Instagram",t.content='<img src="'+t.content+'">',t.extra&&(t.content+="<br>"+t.extra);break;case"soundcloud":t.title="Nouveau favori sur Soundcloud",t.content=t.content+'<br><img src="'+t.extra+'">';break;case"twitter":t.title="Nouveau tweet",t.content=t.content.replace(o,'<a href="$1" target="_blank">$1</a>');break;case"rss":t.title="Article de blog: "+t.content,t.content=t.extra,t.content=t.content.replace(o,'<a href="$1" target="_blank">$1</a>')}var a=$("#item-template").html();for(var i in t){var s=new RegExp("{{"+i+"}}","g");a=a.replace(s,t[i])}$("#timeline").prepend(a)})}).fail(function(){e('Impossible de récupérer les données depuis Google. <a href="/">Essayer à nouveau</a>.')})})},{"./misc/console-fix":2}],2:[function(e,t){"use strict";t.exports=function(){window.console||(window.console={log:function(){},info:function(){},error:function(){}})}},{}]},{},[1]);