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

var isRecommendationPage = function() {
  return window.location.href.toLowerCase().indexOf('recommendation') > -1;
};

$(function() {
  if (isAppPage())
    hotOrNot.data.init();

  if (isListingsLikedPage())
    hotOrNot.data.loadListingsLiked();

  if (isRecommendationPage())
    hotOrNot.data.loadRecommendations();

  $(document).on('listingsLoaded', function() {
    if (!isListingsLikedPage() && !isRecommendationPage())
      hotOrNot.animations.init();
  });

  $(document).on('LISTING_LIKED', function(e) {
    if (e.listing)
      hotOrNot.data.addToLikedList(e.listing);
  });
});
