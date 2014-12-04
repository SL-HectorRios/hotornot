var hotOrNot = hotOrNot || {};
hotOrNot.data = hotOrNot.data || {};
hotOrNot.animations = hotOrNot.animations || {};

$(function() {
  hotOrNot.data.init();

  $(document).on('listingsLoaded', function() {
    hotOrNot.animations.init();
  });
});
