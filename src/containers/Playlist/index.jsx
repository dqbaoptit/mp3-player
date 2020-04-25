import React from 'react';
import { playlist } from '../../constant/Playlists';
import TagAudio from '../../components/Info';
import './index.css';
export default () => {
    return (
        <div className="playlist" >
            {playlist.map((audio,index) => {
                return (
                    <TagAudio index={index + 1} img={audio.img} title={audio.title} />
                )
            })}
        </div>
    )
}