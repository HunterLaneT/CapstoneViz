$(document).ready(function() {
    $('#test-popup-link').magnificPopup({
        
        items: [
            {
              src: '/badger1.png'
            },
            {
              src: '/badger2.png'
            },
            {
              src: '/badger3.png'
            },
            {
              src: '/badger5.png'
            }
        ],
        gallery: {enabled: true},
        type:'image'});

  });