'use strict';

var hotOrNot = hotOrNot || {};
hotOrNot.data = hotOrNot.data || {};
hotOrNot.animations = hotOrNot.animations || {};

$(function() {
  hotOrNot.data.init();

  $(document).on('listingsLoaded', function() {
    hotOrNot.animations.init();
  });
  $(document).on('LISTING_LIKED', function(e) {
    if (e.listing)
      hotOrNot.data.addToLikedList(e.listing);
  });
});
