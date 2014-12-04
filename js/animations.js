'use strict';

var hotOrNot = hotOrNot || {};
hotOrNot.animations = (function() {
  var stack,
    cards;

  var init = function () {
    // Prepare the cards
    cards = [].slice.call(document.querySelectorAll('ul li'));

    // An instance of the Stack is used to attach event listeners
    stack = gajus.Swing.Stack();

    cards.forEach(function (targetElement) {
      stack.createCard(targetElement);
    });

    // Add an event listener for when a card is moved from the stack
    stack.on('throwout', function(e) {
      console.log('Throwout event!');
      if (e.throwDirection == gajus.Swing.Card.DIRECTION_RIGHT) {
        $(document).trigger({ type: 'LISTING_LIKED', listing: e.target});
      }
    });

    stack.on('thrown', function(e) {
      console.log('Card has snapped back to the stack.');
    });
  };

  return {
    init: init
  };
})();

