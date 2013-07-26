/**
 * @fileoverview This file contains the regExStuff module. It builds the interface which allows a user to see the affect of a regular expression on various values
 * @author jasonmerino@gmail.com (Jason Merino)
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
    html: [
      '<body>',
      '< form>',
      '</form>',
      '<li',
      '<ul><li></li></ul>',
      '<em>',
      '<BODY></BODY>',
      '<script>',
      '</script>',
      '<script></ script >',
      '< / script >',
      '<HTML >'
    ],
    emails: [
      'alice@wonderland.net',
      'jay_gatsby@gmail.com'
    ]
  };

  /**
   * Cache jQuery selected DOM elements
   * @type {Object}
   */
  var $el = {
    sample: $('#sampleRegex'),
    patAndMods: $('#regexPattern, #regexMods'),
    pat: $('#regexPattern'),
    mod: $('#regexMods'),
    items: $('#itemTests')
  };

  var defaultText = 'Begin typing your RegEx above.';

  $el.sample.text(defaultText);

  // bind keyup event to regex figurer-outer
  $el.patAndMods.on('keyup', function () {
    $el.patAndMods.css('background', '#fff');

    // pull values from pattern and modifications fields
    var pat = $el.pat.val(),
        mod = $el.mod.val();

    // if fields are blank then add default text in
    if (pat === '' && mod === '') {
      $el.sample.text(defaultText);
    }
    else {
      var markup = '<span style="color:#7dc6f2">var</span>';
      markup += ' <span style="color:#cae682">pattern</span>';
      markup += ' = /<span class="thePat">' + pat + '</span>';
      markup += '/<span class="theMod">' + mod + '</span>;';
      // replace content of regex example
      $el.sample.html(markup);
    }

    try {

      var theRegEx = new RegExp(pat, mod);

      $el.items.find('li').each(function () {
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
          $el.patAndMods.css('background', '#ddd');
          $el.items.find('li').css('color', '#999');
        }
      }
    }
    catch (err) {
      console.warn(err);
      $el.patAndMods.css('background', '#ddd');
      $el.items.find('li').css('color', '#999');
    }
  });


  return {

    /**
     * Renders the item list after a user changes data sets
     * @param  {String} set The name of the set
     */
    renderItemList: function (set) {
      $el.items.empty();
      var listItems = '';
      for (var i = 0; i < dataSets[set]['length']; i++) {
        listItems += '<li></li>';
      }
      $el.items.append(listItems);
      for (var j = 0; j < dataSets[set]['length']; j++) {
        $el.items.find('li').eq(j).text(dataSets[set][j]);
      }
    }

  };

}(jQuery);

// Render the passwords once
regExStuff.renderItemList('passwords');