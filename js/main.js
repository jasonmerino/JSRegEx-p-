/**
 * @fileoverview This file contains the regExStuff module. It builds the interface which allows a user to see the affect of a regular expression on various values
 * @author jason@jasonmerinodesign.com (Jason Merino)
 */

var regExStuff = function () {
  var dataSets = {
    forFun: [
      'Harry Potter',
      'Hermione Granger',
      'Ronald Weasley',
      'Albus Dumbledore',
      'Severus Snape',
      'Tom Riddle (Voldemort)',
      'Worm Tail',
      'Rubeus Hagrid',
      'Ginny Weasley',
      'Bathilda Bagshot',
      'Bellatrix Lestrange',
      'Sirius Black',
      'Draco Malfoy',
      'Lavender Brown',
      'Cedric Diggory',
      'Aberforth Dumbledor',
      'Luna Lovegood',
      'George Weasley',
      'Dudley Dursley',
      'Seamus Finnigan',
      'Nicholas Flamel',
      'Marvolo Gaunt',
      'Albus Severus Potter',
      'Godric Gryffindor',
      'Helga Hufflepuff',
      'Igor Karkaroff',
      'Viktor Krum',
      'Gilderoy Lockhart',
      'Neville Longbottom',
      'Reums Lupin',
      'Olympe Maxime',
      'Alastor "Mad-Eye" Moody',
      'Pansy Parkinson',
      'Lilly Luna Potter',
      'Fred Weasley',
      'Fenrir Greyback'
    ],
    passwords: [
      'password',
      'SecurePassword',
      'ThisIsSecur3',
      '923TimeSqu$re',
      'tastyC4C4',
      '&^S3pll0%!222c',
      'un9uAdfya*Y8',
      '#psie 4$44 tUs9*',
      '  nothing  ',
      'N00BsRU$',
      'Y0L0_Th3_C0unTY',
      'qwerty56789'
    ],
    emails: [
      'alice@wonderland.net',
      'jay_gatsby@gmail.com'
    ]
  };

  $('#sampleRegex').text('Begin typing your RegEx above.');

  $('#regexPattern, #regexMods').on('keyup', function () {
    $('#regexPattern, #regexMods').css('background', '#fff');

    var pat = $('#regexPattern').val();
    var mod = $('#regexMods').val();
    if (pat === '' && mod === '') {
      $('#sampleRegex').text('Begin typing your RegEx above.');
    }
    else {
      $('#sampleRegex').html('<span style="color:#7dc6f2">var</span> <span style="color:#cae682">pattern</span> = /<span class="thePat"></span>/<span class="theMod"></span>;');
      $('.thePat').text(pat);
      $('.theMod').text(mod);
    }

    try {

      var theRegEx = new RegExp(pat, mod);

      $('#itemTests li').each(function () {
        var text = $(this).text();
        if (theRegEx.test(text)) {
          $(this).css('color', '#000');
        }
        else {
          $(this).css('color', '#999');
        }
      });

      if (pat.indexOf('/') !== -1) {
        var patArray = pat.split('');
        var passes = true;
        for (var i = 0; i < patArray.length; i++) {
          if (i === 0 && patArray[i] === '/') {
            passes = false;
          }
          else if (patArray[i] === '/' && patArray[i-1] !== '\\') {
            passes = false;
          }
        }

        if (!passes) {
          $('#regexPattern, #regexMods').css('background', '#ddd');
          $('#itemTests li').css('color', '#999');
        }
      }
    }
    catch (err) {
      console.warn(err);
      $('#regexPattern, #regexMods').css('background', '#ddd');
      $('#itemTests li').css('color', '#999');
    }
  });


  return {

    renderItemList: function (set) {
      $('#itemTests').empty();
      var listItems = '';
      for (var i = 0; i < dataSets[set]['length']; i++) {
        listItems += '<li></li>';
      }
      $('#itemTests').append(listItems);
      for (var j = 0; j < dataSets[set]['length']; j++) {
        $('#itemTests li').eq(j).text(dataSets[set][j]);
      }
    }

  };

}(jQuery);

// Render the passwords once
regExStuff.renderItemList('passwords');