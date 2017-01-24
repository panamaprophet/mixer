'use strict'


let Template = `<div class="desk">
					<div class="desk__faders" data-name="tracks"></div>
				</div>
				<div class="desk__addons">
					<div class="desk__controls">
						<div class="desk__control-meter">
							<canvas class="desk__control-meter-value" width="210" height="20" data-name="master-level"></canvas>
						</div>
						<button class="desk__control" data-name="play" disabled><span class="icon icon--play"></span> play</button>
						<button class="desk__control" data-name="pause" disabled><span class="icon icon--pause"></span> pause</button>
						<button class="desk__control" data-name="rewind" disabled><span class="icon icon--rewind"></span> rewind</button>
					</div>
					<div class="effects">
						<div class="effects__item effect" data-name="effect-delay">
							<div class="effect__title">Delay</div>
							<div class="effect__param">
								<span class="effect__param-title">Time:</span>
								<div class="effect__param-placeholder" data-type="fader" data-param="delay.time" data-value="0.25" data-name="delay-time"></div>
							</div>
							<div class="effect__param">
								<span class="effect__param-title">Feedback:</span>
								<div class="effect__param-placeholder" data-type="fader" data-param="delay.feedback" data-value="0.8" data-name="delay-feedback"></div>
							</div>
							<div class="effect__param">
								<span class="effect__param-title">Cutoff:</span>
								<div class="effect__param-placeholder" data-type="fader" data-param="delay.frequency" data-max="4000" data-step="10" data-value="1120" data-name="delay-frequency"></div>
							</div>
						</div>
						<div class="effects__item effect" data-name="effect-distortion">
							<div class="effect__title">Distortion</div>
							<div class="effect__param">
								<span class="effect__param-title">Filter:</span>
								<label>High <input class="input input--radio" name="distortion-filterType" type="radio" value="highpass" checked data-name="distortion-filterType" /></label>
								<label>Low <input class="input input--radio" name="distortion-filterType" type="radio" value="lowpass"  data-name="distortion-filterType" /></label>
								<label>Band <input class="input input--radio" name="distortion-filterType" type="radio" value="bandpass" data-name="distortion-filterType" /></label>
							</div>
							<div class="effect__param">
								<span class="effect__param-title">Frequency:</span>
								<div class="effect__param-placeholder" data-type="fader" data-param="distortion.frequency" data-step="10" data-max="20000" data-value="70" data-name="distortion-frequency"></div>
							</div>
							<div class="effect__param">
								<span class="effect__param-title">Strength:</span>
								<div class="effect__param-placeholder" data-type="fader" data-param="distortion.strength" data-step="10" data-max="200" data-value="200" data-name="distortion-strength"></div>
							</div>
						</div>
					</div>
				</div>`


export default Template