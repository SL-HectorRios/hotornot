'use strict';

var hotOrNot = hotOrNot || {};

hotOrNot.data = (function() {
  var allListings = [];
  var listingList = document.getElementById('listingList');
  var listingsLiked = [];

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
    var h2 = document.createElement('h2');
    h2.textContent = listing['title'];

    var div = document.createElement('div');
    var clearFix = div.cloneNode();
    var leftSide = div.cloneNode();
    var rightSide = div.cloneNode();

    clearFix.classList.add('clearfix');

    leftSide.classList.add('leftSide');
    img.setAttribute('src', listing['images'][0]['imageURL']);
    leftSide.appendChild(img);

    rightSide.classList.add('rightSide');

    // TODO start & end dates
    var attributesToParse = ['originalDeal', 'deal', 'additionalDealInformation'];

    // adds all the fields to the right side
    for (var i = 0, limit = attributesToParse.length, attribute; i < limit; i++) {
      attribute = attributesToParse[i];
      var field = div.cloneNode();
      field.classList.add(attribute);
      field.textContent = listing[attribute];
      rightSide.appendChild(field);
    }

    clearFix.appendChild(leftSide);
    clearFix.appendChild(rightSide);

    li.appendChild(h2);
    li.appendChild(clearFix);

    li.setAttribute('data-listingid', listing['id']);
    li.setAttribute('data-departmentid', listing['departments'][0]['id'])
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

  var addToLikedList = function (listing) {
    var listingId = listing.getAttribute('data-listingid');
    var departmentId = listing.getAttribute('data-departmentid');
    var listingHash = {
      listingId: listingId,
      departmentId: departmentId
    };

    var hasThisListing = false;
    
    for (var i = 0, length = listingsLiked.length; i < length; i++) {
      if (hasThisListing) break;

      if (listingHash['listingId'] === listingsLiked[i]['listingId'])
        hasThisListing = true;
    }

    if (!hasThisListing)
      listingsLiked.push(listingHash);
  };

  var getLikedListings = function() {
    return listingsLiked;
  };

  return {
    init: function() {
      ajaxListings();
    },
    allListings: function() {
      return allListings;
    },
    addToLikedList: addToLikedList,
    listingsLiked: getLikedListings
  };
})();

