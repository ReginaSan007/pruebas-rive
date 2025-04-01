import { useEffect, useRef, useState } from "react";
import { View, Button, Text, SafeAreaView } from "react-native";
import { Camera, getCameraDevice, useCameraDevice,  useFrameProcessor} from "react-native-vision-camera";

export default function AnimatedStyleUpdateExample(props) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [device, setDevice] = useState(null)
  const status = Camera.getCameraPermissionStatus();


  const checkCameraPersmission = () => {
    const devices = Camera.getAvailableCameraDevices()
    const deviceHook = getCameraDevice(devices, 'front')
    
    console.log('@@ status camera -> ', status);
    if (status === 'granted') {
      setDevice(deviceHook)
      setCameraPermission(true);
    } else if (status === 'not-determined') {
      setCameraPermission(false)
    } else {
      setCameraPermission(false);
    }
  }

  const takePhoto = () => {
    console.log("@@ User wants to take a photo");
  }

  useEffect(() => {
    // Request camera permissions when component mounts
    checkCameraPersmission()
  }, [status]);


  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      {cameraPermission && device !== null ? (
        <View
          style={{ flex: 2, borderRadius: 10 }}
        >
          <Camera
            style={{ flex: 1 }}
            device={device}
            isActive
          />
          <View style={{ flexDirection: 'row', justifyContent:'space-evenly' }}>
            <Button title="Take Photo" onPress={takePhoto}/>
          </View>
        </View>

      ) : (
        <Text>No permission</Text>
      )}
    </SafeAreaView>
  );
}