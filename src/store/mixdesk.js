import Mixer from '/models/mixer';
import Delay from '/models/fx/delay';
import Reverb from '/models/fx/reverb';
import Distortion from '/models/fx/distortion';

import {tracks} from '/config';


const effects = [
    Delay,
    Reverb,
    Distortion,
];

export const mixdesk = new Mixer(tracks, effects);