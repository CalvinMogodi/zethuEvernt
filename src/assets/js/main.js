(function($) {
	"use strict"

	// Scrollspy
	//$('body').scrollspy({
		//target: '#nav',
	//	offset: $(window).height() / 2
	//});

	// Mobile nav toggle
	$('.navbar-toggle').on('click',function() {
		$('.main-nav').toggleClass('open');
	});

	// Smooth scroll
	$(document).on('click', 'a[href^="#"]', function(e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 800);
	});

	// Fixed nav
	$(window).on('scroll', function() {
		var wScroll = $(this).scrollTop();
		wScroll > 50 ? $('#header').addClass('fixed-navbar') : $('#header').removeClass('fixed-navbar');
	});

	

	// Section title animation
	$('.section-title').each(function() {
		var $this = $(this);
		$this.find('.title > span').each(function(i) {
			var $span = $(this);
			var animated = new Waypoint({
				element: $this,
				handler: function()
				{
					setTimeout(function(){
						$span.addClass('appear')
					}, i*250);
					this.destroy();
				},
				offset: '95%'
			});
		});
	});

	

	// CountTo
	$('.counter').each(function() {
		var $this = $(this);
		var counter = new Waypoint({
			element: $this,
			handler: function()
			{
				$this.countTo();
			},
			offset: '95%'
		});
	});

})(jQuery);
