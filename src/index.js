'use strict';

import React, {useReducer} from 'react';
import {render} from 'react-dom';

import Desk from '/components/Desk';
import Context from '/containers/Context';

import {combinedReducer} from '/state/reducers';
import createState from '/state/initialState';

import Mixer from '/models/mixer';
import {tracks} from '/sources';


const mixdesk = new Mixer(tracks);
const initialState = createState(mixdesk);

const App = () => (
	const [state, dispatch] = useReducer(reducer, initialState);

	<Context.Provider value={dispatch}>
		<Desk {...state} />
	</Context.Provider>
);

render(
	<App />,
	document.getElementById('root')
);