'use strict'


let Template = `<div class="fader">
					<div data-name="fader" class="fader__placeholder"></div>
					<div class="fader__buttons">
						<button class="fader__button button" data-name="mute">Mute</button>
						<button class="fader__button button" data-name="bypass">Bypass FX</button>
					</div>
					<div class="fader__effects">
						<div class="fader__effect">
							<span class="fader__effect-title">Delay:</span>
							<div class="fader__effect-placeholder" data-type="fader" data-fx="delay" data-max="0.95" data-step="0.05"></div>
						</div>
						<div class="fader__effect">
							<span class="fader__effect-title">Revrb:</span>
							<div class="fader__effect-placeholder" data-type="fader" data-fx="reverb" data-max="0.95" data-step="0.05"></div>
						</div>
						<div class="fader__effect">
							<span class="fader__effect-title">Distrt:</span>
							<div class="fader__effect-placeholder" data-type="fader" data-fx="distortion" data-max="0.95" data-step="0.05"></div>
						</div>
					</div>
					<div class="fader__title" data-name="title"></div>
				</div>`


export default Template