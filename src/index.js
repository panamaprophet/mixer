'use strict';

import React from 'react';
import {render} from 'react-dom';

import Desk from '/components/Desk';
import Mixer from '/models/mixer';

import {
	tracks,
} from '/sources';


const Mixdesk = new Mixer(tracks, () => console.log('Ready'));
const MixdeskContext = React.createContext(Mixdesk);

const App = () => (<MixdeskContext.Provider><Desk {...Mixdesk} /></MixdeskContext.Provider>);

render(
	<App />,
	document.getElementById('root')
);