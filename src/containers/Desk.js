import React, {useContext} from 'react';

import Desk from '/components/Desk';
import Context from '/containers/Context';
import Track from '/containers/Track';

const DeskContainer = ({
    tracks,
    effects,
    controls,
}) => {
    const dispatch = useContext(Context);
    const {analyser} = controls;

    const play = () => dispatch({type: 'CONTROLS_PLAY'});
    const pause = () => dispatch({type: 'CONTROLS_PAUSE'});
    const rewind = () => dispatch({type: 'CONTROLS_REWIND'});

    const Tracks = tracks.map(track => (<Track {...track} key={track.id} />));
    const Effects = null;

    return (
        <Desk 
            onPlay={play}
            onPause={pause}
            onRewind={rewind}

            tracks={Tracks}
            effects={Effects}
            analyser={analyser}
        >
        </Desk>
    );
}

export default DeskContainer;