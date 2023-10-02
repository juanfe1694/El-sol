import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props{
    color: string,
    waveHeight: number
}

const WaveView = ({ color, waveHeight }: Props) => {
  const waves = [];
  const width = 400;
  const height = 200;

  for (let i = 0; i < width; i++) {
    const y = waveHeight * Math.sin((i / width) * Math.PI * 2);
    waves.push(`${i},${height + y}`);
  }

  return (
    <View style={[styles.waveContainer, { height }]}>
     { /*<View
        style={[
          styles.wave,
          {
            width,
            height: waveHeight * 2,
            borderBottomColor: color,
            borderBottomWidth: waveHeight,
          },
        ]}
      >
        <View
          style={[
            styles.waveShape,
            { width, height: waveHeight, borderTopColor: color },
          ]}
        >
          <View
            style={[
              styles.waveShape,
              { width: 20, height: waveHeight, borderTopColor: color },
            ]}
          />
        </View>
        <View
          style={[
            styles.waveShape,
            { width, height: waveHeight, borderTopColor: color },
          ]}
        >
          <View
            style={[
              styles.waveShape,
              { width: 10, height: waveHeight, borderTopColor: color },
            ]}
          />
        </View>
      </View>
      <View
        style={[
          styles.wave,
          {
            width,
            height: waveHeight * 2,
            borderTopColor: color,
            borderTopWidth: waveHeight,
          },
        ]}
      >
        <View
          style={[
            styles.waveShape,
            { width, height: waveHeight, borderBottomColor: color },
          ]}
        >
          <View
            style={[
              styles.waveShape,
              { width: 30, height: waveHeight, borderBottomColor: color },
            ]}
          />
        </View>
        <View
          style={[
            styles.waveShape,
            { width, height: waveHeight, borderBottomColor: color },
          ]}
        >
          <View
            style={[
              styles.waveShape,
              { width: 15, height: waveHeight, borderBottomColor: color },
            ]}
          />
        </View>
      </View>
      <View
        style={[
          styles.wave,
          {
            width,
            height: waveHeight * 2,
            borderBottomColor: color,
            borderBottomWidth: waveHeight,
          },
        ]}
      >
        <View
          style={[
            styles.waveShape,
            { width, height: waveHeight, borderTopColor: color },
          ]}
        >
          <View
            style={[
              styles.waveShape,
              { width: 40, height: waveHeight, borderTopColor: color },
            ]}
          />
        </View>
        <View
          style={[
            styles.waveShape,
            { width, height: waveHeight, borderTopColor: color },
          ]}
        >
          <View
            style={[
              styles.waveShape,
              { width: 25, height: waveHeight, borderTopColor: color },
            ]}
          />
        </View>
      </View>
      <View
        style={[
          styles.wave,
          {
            width,
            height: waveHeight * 2,
            borderTopColor: color,
            borderTopWidth: waveHeight,
          },
        ]}
      >
                    <View
              style={[
                styles.waveShape,
                { width: 50, height: waveHeight, borderBottomColor: color },
              ]}
            />
          </View>
      
      
      <svg height={height} width={width}>
        <polyline
          points={waves.join(' ')}
          fill="none"
          stroke={color}
          strokeWidth="1"
        />
      </svg>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  waveContainer: {
    overflow: 'hidden',
    width: '100%',
  },
  wave: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  waveShape: {
    overflow: 'hidden',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderStyle: 'solid',
  },
});

export default WaveView;

