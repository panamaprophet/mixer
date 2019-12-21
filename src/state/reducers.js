// import actions

export const trackReducer = (state, action) => {
	switch (action.type) {
		'SET_TRACK_VOLUME':
		'TRACK_MUTE_TOGGLE':
		'TRACK_FX_TOGGLE':
		default:
			return state;
	}
};

export const effectReducer = (state, action) => {
	switch (action.type) {
		'SET_DELAY_TIME':
		'SET_DELAY_FREQUENCY': 
		'SET_DELAY_FEEDBACK':
		default:
			return state;
	}
};

export const controlsReducer = (state, action) => {
	switch (action.type) {
		'CONTROLS_PLAY': 
		'CONTROLS_PAUSE':
		'CONTROLS_REWIND': 
		defaul:
			return state;
	}

};

export const combinedReducer = (state, action) => {
	return {
		tracks: trackReducer,
		effects: effectReducer,
		controls: controlsReducer,
	};
};