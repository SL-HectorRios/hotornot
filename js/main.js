'use strict';

var hotOrNot = hotOrNot || {};
hotOrNot.data = hotOrNot.data || {};
hotOrNot.animations = hotOrNot.animations || {};

var isAppPage = function() {
  return window.location.href.toLowerCase().indexOf('hot_or_not') > -1;
};

var isListingsLikedPage = function() {
  return window.location.href.toLowerCase().indexOf('hot_list') > -1;
};

$(function() {
  if (isAppPage())
    hotOrNot.data.init();

  if (isListingsLikedPage())
    hotOrNot.data.loadListingsLiked();

  $(document).on('listingsLoaded', function() {
    hotOrNot.animations.init();
  });
  $(document).on('LISTING_LIKED', function(e) {
    if (e.listing)
      hotOrNot.data.addToLikedList(e.listing);
  });
});