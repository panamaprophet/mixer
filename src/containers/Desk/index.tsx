import React, {useContext} from 'react';

import Desk from '/components/Desk';
import Effect from '/containers/Effect';
import Context from '/containers/Context';
import Track from '/containers/Track';

import {
    play,
    pause,
    rewind,
} from '/store/actions';

type Props = {
    tracks: any,
    effects: any,
    playback: any,
}


const DeskContainer = (props) => {
    const context = useContext(Context);
    const {
        tracks = [],
        effects = [],
        playback,
    } = props;

    const Tracks = tracks.map(track => (<Track {...track} key={track.id} />));
    const Effects = effects.map(effect => (<Effect {...effect} key={effect.id} />));

    return (
        <Desk
            onPlay={() => play(context)}
            onPause={() => pause(context)}
            onRewind={() => rewind(context)}

            tracks={Tracks}
            effects={Effects}
            playback={playback}
        >
        </Desk>
    );
}

export default DeskContainer;