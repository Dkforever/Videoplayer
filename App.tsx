import React, { useEffect, useRef, useState, } from 'react';
import { View, Text, TouchableOpacity, Image ,ScrollView} from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';

const videoData = [
  {
    id: 1,
    title: 'Two Goat',
    source: 'https://images-profile-picture.s3.ap-south-1.amazonaws.com/x2mate.com-Two+Goats+Kahaniya+_+Hindi+Stories+for+Children+_+Infobells.mp4',
    thumbnail: 'url_to_thumbnail_image',
  },
  {
    id: 2,
    title: 'Hologram',
    source: 'https://images-profile-picture.s3.ap-south-1.amazonaws.com/x2mate.com-Hologram+Technology+++HOLHO+4+Faces+Pyramid.++for+hologram.mp4',
    thumbnail: 'url_to_thumbnail_image',
  },
  {
    id: 3,
    title: 'Captain marvel thor',
    source: 'https://images-profile-picture.s3.ap-south-1.amazonaws.com/x2mate.com-Thor+Vs+Captain+Marvel+_+Frigga+comes+to+rescue+_+Frost+Giant+Loki+%26+Party+Thor+_+What+if+S01+E07-(480p).mp4',
    thumbnail: 'url_to_thumbnail_image',
  },
  {
    id: 4,
    title: 'Cartoon',
    source: 'https://images-profile-picture.s3.ap-south-1.amazonaws.com/videoplayback.mp4',
    thumbnail: 'url_to_thumbnail_image',
  },
  // Add more video objects as needed
];

const App = () => {
  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState({ currentTime: 0, seekableDuration: 0 });
  const [fullScreen, setFullScreen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const ref = useRef();

  const format = (seconds) => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handlePlay = (index) => {
    if (currentVideoIndex !== null) {
      setPaused(true);
      setCurrentVideoIndex(null);
    }

    setClicked(true);
    setCurrentVideoIndex(index);
    setPaused(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView> 
      {videoData.map((video, index) => (
        <View key={index} style={{marginBottom:20}}>
          <TouchableOpacity
            style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
            onPress={() => handlePlay(index)}
          >
            <Video
              paused={paused || currentVideoIndex !== index}
              source={{ uri: video.source }}
              ref={ref}
              onProgress={(x) => setProgress(x)}
              onEnd={() => {
                setPaused(true);
                setCurrentVideoIndex(null);
              }}
              // muted
              style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
              resizeMode="contain"
            />
            {clicked && currentVideoIndex === index && (
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  backgroundColor: 'rgba(0,0,0,.5)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => ref.current.seek(parseInt(progress.currentTime) - 10)}
                  >
                    <Image
                      source={require('./src/backward.png')}
                      style={{ width: 30, height: 30, tintColor: 'white' }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setPaused(!paused)}
                  >
                    <Image
                      source={paused
                        ? require('./src/play-button.png')
                        : require('./src/pause.png')}
                      style={{
                        width: 30,
                        height: 30,
                        tintColor: 'white',
                        marginLeft: 50,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => ref.current.seek(parseInt(progress.currentTime) + 10)}
                  >
                    <Image
                      source={require('./src/forward.png')}
                      style={{
                        width: 30,
                        height: 30,
                        tintColor: 'white',
                        marginLeft: 50,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    position: 'absolute',
                    bottom: 0,
                    paddingLeft: 20,
                    paddingRight: 20,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white' }}>
                    {format(progress.currentTime)}
                  </Text>
                  <Slider
                    style={{ width: '80%', height: 40 }}
                    minimumValue={0}
                    maximumValue={progress.seekableDuration}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#fff"
                    onValueChange={(x) => ref.current.seek(x)}
                  />
                  <Text style={{ color: 'white' }}>
                    {format(progress.seekableDuration)}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    position: 'absolute',
                    top: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (fullScreen) {
                        Orientation.lockToPortrait();
                      } else {
                        Orientation.lockToLandscape();
                      }
                      setFullScreen(!fullScreen);
                    }}
                  >
                    <Image
                      source={fullScreen
                        ? require('./src/minimize.png')
                        : require('./src/full-size.png')}
                      style={{ width: 24, height: 24, tintColor: 'white' }}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      ))}
      </ScrollView>
    </View>
  );
};

export default App;
