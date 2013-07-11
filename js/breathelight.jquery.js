(function($) {

	$.fn.breathe = function( options ) {
		var lightText = (options && options.hasOwnProperty("textLightColor"))
					? true
					: false;
		var lightBorder= (options && options.hasOwnProperty("borderLightColor"))
					? true
					: false;

		// Establish our default settings
		var settings = $.extend({
			textLightColor:		{r: 51, g: 153, b: 255},
			borderLightColor:	{r: 51, g: 153, b: 255},
			textDarkColor:		{r: 0, g: 0, b: 0},
			borderDarkColor:	{r: 0, g: 0, b: 0},
			lightFrames:		60,	// Frames need to the lightest
			dullFrames:			20,	// Frames nedd to dull
			darkFrames:			10,	// Frames nedd to the darkest
			maxBlur:			20,
			option:				"on"
		}, options);

		var breathef = function() {
			if (frameCount >= 0) {
				var alpha = frameCount / settings.lightFrames * 2;
				if (lightText === true) {
					target.css("color",
							"rgba("+ settings.textLightColor.r +", "
							+ settings.textLightColor.g + ", "
							+ settings.textLightColor.b +", "+ alpha +")");
					target.css("text-shadow",
							//oldstyles.textShadow + ", " +
							"0px 1px " + currentBlur + "px rgba("
							+ settings.textLightColor.r + ", "
							+ settings.textLightColor.g + ", "
							+ settings.textLightColor.b + ", " + alpha + ")");
				}

				if (lightBorder === true) {
					target.css("border-color",
							"rgba(" + settings.borderLightColor.r + ", "
							+ settings.borderLightColor.g + ", "
							+ settings.borderLightColor.b +", " + alpha + ")");
					target.css("box-shadow",
							//oldstyles.boxShadow + ", " +
							"0px 1px " + currentBlur + "px rgba("
							+ settings.borderLightColor.r + ", "
							+ settings.borderLightColor.g + ", "
							+ settings.borderLightColor.b + ", " + alpha + ")");
				}
				currentBlur += blurDelta * direcation;
			} else {
				var alpha = (direcation < 0)
					? (-frameCount) / settings.darkFrames * 2
					: 1;

				if (lightText === true) {
					target.css("color",
							"rgba("+ settings.textDarkColor.r +", "
							+ settings.textDarkColor.g + ", "
							+ settings.textDarkColor.b +", "+ alpha +")");
				}

				if (lightBorder === true) {
					target.css("border-color",
							"rgba(" + settings.borderDarkColor.r + ", "
							+ settings.borderDarkColor.g + ", "
							+ settings.borderDarkColor.b +", " + alpha + ")");
				}
				target.css("box-shadow", oldstyles.boxShadow);
				target.css("text-shadow", oldstyles.textShadow);
			}

			frameCount += direcation;
			if (frameCount === settings.lightFrames) {
				direcation = -(settings.lightFrames / settings.dullFrames);
			} else if (frameCount === -settings.darkFrames) {
				direcation = 1;
			} else if (frameCount === 0) {
				direcation = (direcation > 0)
					? 1
					: -1;
			}
			target.data("breatheID", requestAnimationFrame(breathef));
		};

		if (settings.option === "on") {
			if (lightText === false && lightBorder === false) {
				lightText = true;
				lightBorder = true;
			}
			var blurDelta = settings.maxBlur / settings.lightFrames;
			var direcation = 1;
			var target = this;
			var frameCount = 0;
			var currentBlur = 0;
			var oldstyles = {
				color: this.css("color"),
				textShadow: this.css("text-shadow"),
				borderColor: this.css("border-color"),
				boxShadow: this.css("box-shadow")
			};
			this.data("breatheID", requestAnimationFrame(breathef));
			this.data("breatheOld", oldstyles);
		} else if (settings.option === "off") {
			cancelAnimationFrame(this.data("breatheID"));
			this.css("color", this.data("breatheOld").color);
			this.css("border-color", this.data("breatheOld").borderColor);
			this.css("box-shadow", this.data("breatheOld").boxShadow);
			this.css("text-shadow", this.data("breatheOld").textShadow);
		}

		return this;
	};
}(jQuery));
