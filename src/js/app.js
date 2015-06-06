/* global $, document, window */

'use strict';

// Example of file included that will be browserified
require('./misc/console-fix');

$(document).ready(function() {
  var googleSpreadsheetId = '1yO1pAsB1jsqhao3KZGUhgT2lsNNN0jkGdj4CINVnAsU';
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
    if('spreadid'=== key) {
      googleSpreadsheetId = value;
    }
  });

  var jsonData = 'https://spreadsheets.google.com/feeds/list/' + googleSpreadsheetId + '/od6/public/values?alt=json';
  function alertError(message) {
    $('.message').html(message).addClass('error');
  }

  $.getJSON( jsonData, function( spreadsheet ) {
    $('.message').slideUp('fast');
    // Get the tab title as page title
    var title = spreadsheet.feed && spreadsheet.feed.title && spreadsheet.feed.title.$t ? spreadsheet.feed.title.$t : 'Sample timeline';
    $('h1').text(title);

    // Check spreadsheet res
    if(!spreadsheet || !spreadsheet.feed || !spreadsheet.feed.entry) {
      alertError('Error in the spreadsheet - bad format');
      return false;
    }

    // Default value for each spreadsheet column
    var defaults = {
      date: '',
      content: '',
      extra: '',
      source: '',
      url: '',
      title: ''
    };

    spreadsheet.feed.entry.forEach(function(entry) {
      // Parse item data
      var item = {};
      for(var key in defaults) {
        item[key]= (entry['gsx$' + key] && entry['gsx$' + key]['$t']) ? entry['gsx$' + key]['$t'] : defaults[key]; // jshint ignore:line
      }
      switch(item.source) {
        case 'instagram':
          item.title = 'Nouvelle photo sur Instagram';
          item.content = '<img src="' + item.content + '">';
        break;
        case 'soundcloud':
          item.title = 'Nouveau favori sur Soundcloud';
          item.content = item.content + '<br><img src="' + item.extra + '">';
        break;
        case 'twitter':
          item.title = 'Nouveau tweet';
          var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
          item.content = item.content.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
        break;
        default :

      }

      // Push in template
      var str = $('#item-template').html();
      for(var k in item) {
        var re = new RegExp('{{' + k + '}}', 'g');
        str = str.replace(re, item[k]);
      }
      $('#timeline').prepend(str);
    });
  })
  .fail(function() {
    alertError('Impossible de récupérer les données depuis Google. <a href="/">Essayer à nouveau</a>.');
  });
});
