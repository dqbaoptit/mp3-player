import React,{ useState,useRef } from 'react';
import './App.css';
import logo from './logo.svg';
import TimeSlider from 'react-input-slider';
import { playlist } from './containers/Playlists';
import { CaretRightOutlined,CaretLeftOutlined,PlayCircleOutlined,PauseCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

function App() {
  const audioRef = useRef();
  const [audioIndex,setAudioIndex] = useState(0);
  const [currentTime,setCurrentTime] = useState(0);
  const [duration,setDuration] = useState(0);
  const [isPlay,setPlay] = useState(false);

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    if (isPlay) audioRef.current.play();
  };

  const handlePausePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay(!isPlay);
  };

  const handleTimeSliderChange = ({ x }) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);

    if (!isPlay) {
      setPlay(true);
      audioRef.current.play();
    }
  };
  const Name = "App-logo";
  return (
    <div className="App">
      <img src={playlist[audioIndex].img} className={isPlay && Name} alt="logo" id="logo" />
      <Typography.Title level={2} className="Song-Title">{playlist[audioIndex].title}</Typography.Title>
      <Typography.Paragraph className="Singer">{playlist[audioIndex].artist}</Typography.Paragraph>
      <div className='li-button' align="center">
        <div onClick={() => audioIndex !== 0 ? setAudioIndex((audioIndex - 1) % playlist.length) : setAudioIndex(playlist.length - 1)}>
          <CaretLeftOutlined className="button" />
        </div>
        <div onClick={handlePausePlayClick}>

          {!isPlay ?
            <PlayCircleOutlined className="button" />
            :
            <PauseCircleOutlined className="button" />
          }
        </div>


        <div onClick={() => setAudioIndex((audioIndex + 1) % playlist.length)}>
          <CaretRightOutlined className="button" />
        </div>
      </div>
      <TimeSlider
        axis="x"
        xmax={duration}
        x={currentTime}
        onChange={handleTimeSliderChange}
        styles={{
          track: {
            backgroundColor: "#e3e3e3",
            height: "2px",
          },
          active: {
            backgroundColor: "red",
            height: "2px",
          },
          thumb: {
            marginTop: "-3px",
            width: "8px",
            height: "8px",
            backgroundColor: "#333",
            borderRadius: 0,
          },
        }}
      />
      <audio
        ref={audioRef}
        src={playlist[audioIndex].src}
        onLoadedData={handleLoadedData}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onEnded={() => setPlay(false)}
      />
    </div>
  );
}

export default App;
