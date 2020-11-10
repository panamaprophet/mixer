import React from 'react';
import {Mixdesk} from 'mixdesk';
import {tracks} from './config';
import 'mixdesk/dist/index.css';


const App = () => {
  return <Mixdesk tracks={tracks} />
}

export default App
