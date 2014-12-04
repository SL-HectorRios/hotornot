'use strict';

var hotOrNot = hotOrNot || {};

hotOrNot.data = (function() {
  var allListings = [];
  var listingList = document.getElementById('listingList');

  var insertListings = function(listings) {
    if (!listings || !Array.isArray(listings)) return;

    for (var i = 0, listing, limit = listings.length; i < limit; i++) {
      listing = listings[i];

      appendListing(listing);
    }

    $(document).trigger('listingsLoaded');
  };

  var appendListing = function(listing) {
    var li = document.createElement('li');
    var img = document.createElement('img');

    li.setAttribute('data-listingid', listing['id']);
    li.setAttribute('data-department', listing['departments'][0]['id'] );
    li.setAttribute('data-deal', listing['deal']);
    li.setAttribute('data-originaldeal', listing['originalDeal']);
    li.classList.add('listingCard');

    img.setAttribute('src', listing['images'][0]['imageURL']);
    li.appendChild(img);

    listingList.appendChild(li);
  };

  var ajaxListings = function() {
    return $.ajax({
      url: 'fixtures/all_listings.json'
    }).done(function(data) {
      var _data = JSON.parse(data);

      allListings = _data['results'];
      insertListings(allListings);
    });
  };

  return {
    init: function() {
      ajaxListings();
    },
    allListings: function() {
      return allListings;
    }
  };
})();

