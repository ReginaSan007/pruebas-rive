import { useRunOnJS, useWorklet } from 'react-native-worklets-core';
import { OpenCV } from 'react-native-fast-opencv';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, getCameraDevice, useCameraDevice } from 'react-native-vision-camera';
import {CameraDevice, CameraDeviceFormat} from 'react-native-vision-camera';

function getBestFormat(
  device: CameraDevice,
  targetWidth: number,
  targetHeight: number,
): CameraDeviceFormat {
  const size = targetWidth * targetHeight;
  return device.formats.reduce((prev, curr) => {
    const currentSize = curr.videoWidth * curr.videoHeight;
    const diff = Math.abs(size - currentSize);

    const previousSize = prev.videoWidth * prev.videoHeight;
    const prevDiff = Math.abs(size - previousSize);
    if (diff < prevDiff) {
      return curr;
    }
    return prev;
  }, device.formats[0]);
}

export default function App() {

  const [hasPermisision, setHasPermission] = useState(false)
  const [position, setPosition] = useState<'back' | 'front' | 'external'>('front');
  const devices = Camera.getAvailableCameraDevices()
  const device = getCameraDevice(devices, position, {
    physicalDevices: [
      'ultra-wide-angle-camera',
    ]
  })

  const format = useMemo(
    () => (device != null ? getBestFormat(device, 720, 1000): undefined),
    [device]
  )

  useEffect(() => {
    console.log(devices)
    Camera.requestCameraPermission().then((p) =>
    {
      setHasPermission(p === 'granted')
    }
    )
  }, [])

  return (
    <View style={styles.container}>
      {!hasPermisision && <Text>No Camera permission.</Text>}
      {hasPermisision && device != null && (
        <Camera
          style={StyleSheet.absoluteFill}
          isActive={true}
          device={device}
          format={format}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});