(function($) {

	$.fn.breathe = function( options ) {
		// Establish our default settings
		var settings = $.extend({
			color:		{r:51, g:153, b: 255},

			time: 2,
			interval:	50,
			option: "on"
		}, options);

		var shadow=0;
		var direcation = 1;
		var thres = settings.time / (settings.interval / 1000);
		var target = this;

		var breathef = function() {
			if (direcation > 0) {
				shadow += 1;
			} else {
				shadow -= 2;
			}
			if (shadow == thres*0.8 || shadow == -thres*0.2) {
				direcation = -direcation;
			}
			if (shadow >= 0) {
				var k = shadow / (thres*0.8) * 2;
				target.css("color","rgba("+ settings.color.r +", "+ settings.color.g +", "+ settings.color.b +", "+ k +")");
				target.css("border-color","rgba("+ settings.color.r +", "+ settings.color.g +", "+ settings.color.b +", "+ k +")");
				target.css("text-shadow","0px 1px "+ shadow +"px rgba("+ settings.color.r +", "+ settings.color.g +", "+ settings.color.b +", "+ k +")");
				target.css("box-shadow","0px 1px "+shadow+"px rgba("+ settings.color.r +", "+ settings.color.g +", "+ settings.color.b +", "+ k +")");
				//target.css("box-shadow","0px 1px "+shadow+"px rgba(51, 153, 255, "+ k + "), inset 0px 1px 1px 0px rgba(250, 250, 250, .2), inset 0px -12px 35px 0px rgba(0, 0, 0, .5)");
			} else {
				var k = shadow / (thres*0.2) * -2;
				if (direcation < 0) {
					target.css("color","rgba(0, 0, 0, "+ k +")");
					target.css("border-color", "rgba(0, 0, 0, "+ k +")");
				} else {
					target.css("color","rgba(0, 0, 0, 1)");
					target.css("border-color", "rgba(0, 0, 0, 1)");
				}
				//target.css("box-shadow", "0px 3px 0px 0px rgb(34,34,34), 0px 7px 10px 0px rgb(17,17,17), inset 0px 1px 1px 0px rgba(250, 250, 250, .2), inset 0px -12px 35px 0px rgba(0, 0, 0, .5)");
				target.css("text-shadow","2px 1px 1px rgb(37, 37, 37)");
			}
			target.data("breatheID", requestAnimationFrame(breathef));
		};

		if (settings.option === "on") {
			this.data("breatheID", requestAnimationFrame(breathef));
		} else {
			//TODO set back to origin css
			cancelAnimationFrame(this.data("breatheID"));
		}

		return this;
	};

}(jQuery));
