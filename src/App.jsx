import React from 'react';
import Player from './containers/Player/App';
import Playlist from './containers/Playlist';
export default () => {
    return (
        <div className="container">
            <Player />
            <div className="playlist">
                <Playlist />
            </div>
        </div>
    )
}