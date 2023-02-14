/*
	Read Only by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$titleBar = null,
		$nav = $('#nav'),
		$wrapper = $('#wrapper');


	//Adding title bars to list icons
	$(document.getElementsByClassName("icon solid fa-code")).attr('title','Language');
	$(document.getElementsByClassName("icon solid fa-book")).attr('title','Library');
	$(document.getElementsByClassName("icon solid fa-bolt")).attr('title','IDE');
	$(document.getElementsByClassName("icon solid fa-cubes")).attr('title','Database Management');
	$(document.getElementsByClassName("icon solid fa-users")).attr('title','Dev Ops');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '1025px',  '1280px' ],
			medium:   [ '737px',   '1024px' ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

		var screen_height = $window.height();
		var activation_offset = 0.5;//determines how far up the the page the element needs to be before triggering the function
		const collection = document.getElementsByClassName("bar")
		var arr = Array.prototype.slice.call( collection, 0 );
		var hashmap = new Map();
		arr.forEach(element => {
			hashmap.set(element, 0) //0: Element not triggered. 1: Element triggered
		});
		
		/*
		On every scroll function, check each element to see if user has scrolled within that element's view range.
		If yes, then trigger move() and assignment it value of 1 in hashmap.
		*/
		$window.on('scroll', function() {
			var y_scroll_pos = window.pageYOffset;
			arr.forEach(element => {
				var element_position = element.parentElement.offsetTop; //Gets offset position of element's parent, as element offset is small
				var activation_point = element_position - (screen_height * activation_offset);
				var element_in_view = y_scroll_pos > activation_point;
				console.log(element_in_view);
				if(element_in_view && hashmap.get(element) == 0) {
					move(element);
					hashmap.set(element, 1);
				}
			});
		});
		
		/* Increases div width until it matches the parnent div's width */
		function move(element){
			var width = 0;	//Starting bar width
			var id = setInterval(frame, 15);
			function frame(){
				if (width >= 100){
					clearInterval(id);
				}
				else{
					width++;
					element.style.width = width + '%'; //Width increased by %
					element.style.backgroundColor = "#4acaa8"; //Background color starts white then changes
				}
			}
		}


	// Tweaks/fixes.
		// Polyfill: Object fit.
			if (!browser.canUse('object-fit')) {

				$('.image[data-position]').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Apply img as background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-position', $this.data('position'))
							.css('background-size', 'cover')
							.css('background-repeat', 'no-repeat');

					// Hide img.
						$img
							.css('opacity', '0');

				});

			}

	// Header Panel.

		// Nav.
			var $nav_a = $nav.find('a');

			$nav_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$nav_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '5vh',
							bottom: '5vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($nav_a.filter('.active-locked').length == 0) {

										$nav_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		// Title Bar.
			$titleBar = $(
				'<div id="titleBar">' +
					'<a href="#header" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$header
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'header-visible'
				});

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				if (breakpoints.active('<=medium'))
					return $titleBar.height();

				return 0;

			}
		});

})(jQuery);