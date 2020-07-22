import Mixer from '/models/mixer';
import Delay from '/models/fx/delay';
import Reverb from '/models/fx/reverb';
import Distortion from '/models/fx/distortion';


export const mixdesk = new Mixer([], [Delay, Reverb, Distortion]);