import { View, Text, TouchableOpacity, Touchable, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
const App = () => {
  const [click, setClick] = useState(false);
  const [pause, setPause] = useState(false);
  const [progress, setProgress] = useState(null);
  const [fullScreen, setFullScreen] = useState(false)
  const [screenOrientation, setScreenOrientation] = useState('PORTRAIT');
  const ref = useRef();
  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };


  useEffect(() => {
    const updateOrientation = (orientation) => {
      setScreenOrientation(orientation);
    };

    Orientation.addOrientationListener(updateOrientation);

    return () => {
      Orientation.removeOrientationListener(updateOrientation);
    };
  }, []);

  
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ width: '100%', height: fullScreen ? '100%' : 200 }}
        onPress={() => {
          setClick(true);
          setFullScreen(!fullScreen);
        }}
      >
        <Video
          source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
          ref={ref}
          onProgress={(x) => {
            setProgress(x);
          }}

          paused={pause}
          muted
          style={{ width: '100%', height: fullScreen ? '100%' : 200 , transform: [{ rotate: screenOrientation === 'LANDSCAPE' ? '90deg' : '0deg' }],}}
          
          resizeMode='contain'

        />

        {click && <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                ref.current.seek(parseInt(progress.currentTime) - 10);
              }}
            >
              <Image source={require('./asset/backward.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: 'white'
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setPause(!pause);
              }}
            >
              <Image
                source={pause ?
                  require('./asset/pause.png') :
                  require('./asset/play-button.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: 'white',
                  marginLeft: 50,
                  marginRight: 50
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                ref.current.seek(parseInt(progress.currentTime) + 10);
              }}
            >
              <Image source={require('./asset/forward.png')}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: 'white'
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
              bottom: 10,
              paddingLeft: 20,
              paddingRight: 20

            }}>
            <Text style={{ color: 'white' }}>{format(progress.currentTime)}</Text>
            <Slider
              style={{ width: '80%', height: 30 }}
              minimumValue={0}
              maximumValue={progress.seekableDuration}
              value={progress.currentTime}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={(x) => {
                ref.current.seek(x);
              }}
            />
            <Text style={{ color: 'white' }}>{format(progress.seekableDuration)}</Text>

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
              alignItems: 'center'
            }}>
            <TouchableOpacity onPress={() => {
              if (fullScreen) {
                Orientation.lockToPortrait();
              } else {
                Orientation.lockToLandscape();
              }
              setFullScreen(!fullScreen)
            }}>
              <Image source={screenOrientation === 'LANDSCAPE' ? require('./asset/minimize.png') : require('./asset/full-size.png')}
                style={{ width: 24, height: 24, tintColor: 'white' }} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>}
      </TouchableOpacity>
    </View>
  );
};

export default App;

//http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4