$( document ).ready(function() {
  $('.featured__slider').addClass('show');
});

var home = {
	init: function(){
    this.slider();
    this.waypoint();
	},

  slider: function() {
    $('.featured .owl-carousel').owlCarousel({
      autoplay: true,
      autoplayTimeout: 8000,
      autoplaySpeed: 2000,
      items:1,
      loop: true,
      nav: false,
      dots: false,
      mouseDrag: false
    })

    $('.headline .owl-carousel').owlCarousel({
      items:1,
      margin: 50,
      loop: true,
      nav: true,
      dots: true,
      navText: [
        "<svg class='icon'><use xlink:href='images/svg/svg.svg#right'></use></svg>",
        "<svg class='icon'><use xlink:href='images/svg/svg.svg#left'></use></svg>"
      ]
    })
  },

  waypoint: function () {
    $('.headline').waypoint(function(){
      $(this).addClass('show');
    },{offset:'65%'});
  },
}
home.init();

