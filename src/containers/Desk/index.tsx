import React, {useContext} from 'react';
import {Desk} from '/components/Desk/index';
import {SendContainer} from '/containers/Send/index';
import {Context} from '/containers/Context/index';
import {TrackContainer} from '/containers/Track/index';
import {play, pause, rewind} from '/store/actions/index';
import type {SendEntity, TrackEntity} from '/helpers/entities';
import type {Playback} from '/helpers/playback';


type Props = {
    tracks: TrackEntity[],
    sends: SendEntity[],
    playback: Playback,
}


export const DeskContainer: React.FC<Props> = props => {
    const context = useContext(Context);
    const {tracks, sends, playback} = props;
    const Tracks = tracks.map(track => (<TrackContainer {...track} key={track.id} />));
    const Sends = sends.map(effect => (<SendContainer {...effect} key={effect.id} />));

    return (
        <Desk
            onPlay={() => play(context)}
            onPause={() => pause(context)}
            onRewind={() => rewind(context)}

            tracks={Tracks}
            sends={Sends}
            playback={playback}
        >
        </Desk>
    );
}