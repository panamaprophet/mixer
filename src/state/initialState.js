export const STATUS = {
	'PLAYING': 'PLAYING',
	'PAUSED': 'PAUSED',
};

export const createState = mixdesk => {
	const tracks = mixdesk.tracks;

	const effects = mixdesk.fx;

	const controls = {
		status: STATUS.PAUSED,
	};

	return {
		tracks,
		effects,
		controls,
	};
};