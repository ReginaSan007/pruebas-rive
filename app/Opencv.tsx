import { ClipOp, Skia, TileMode } from "@shopify/react-native-skia";
import { useRef, useState } from "react";
import { View, Button, Text, SafeAreaView } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { Camera as VisionCamera, CameraPosition, useCameraDevice,  useCameraFormat,  useCameraPermission, Frame, DrawableFrame } from "react-native-vision-camera";

import {  
  Face,
  Camera,
  useFaceDetector,
  FaceDetectionOptions,
  Contours,
  Landmarks} from "react-native-vision-camera-face-detector";

export default function AnimatedStyleUpdateExample() {
  const {hasPermission, requestPermission}= useCameraPermission();
  const [position, setPosition] = useState<CameraPosition>("back");
  const [rotation, setRotation] = useState<number>(0);
  const [findFace, setFindFace] = useState(false)
  const [translation, setTranslation] = useState<number>(0);
  const aFaceW = useSharedValue( 0 )
  const aFaceH = useSharedValue( 0 )
  const aFaceX = useSharedValue( 0 )
  const aFaceY = useSharedValue( 0 )
  const aRot = useSharedValue( 0 )
  const device = useCameraDevice(position);
  const format = useCameraFormat(device, [
    { videoResolution: { width: 854, height: 480 } },
    { fps: 30 }
  ]);
  const faceDetectionOptions = useRef<FaceDetectionOptions>( {
    performanceMode: "fast",
    landmarkMode: "none",
    classificationMode: "none",
  } ).current

  const camera = useRef<VisionCamera>(null);

  if(!hasPermission) {
    return(
      <View style={{flex:1}}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  function handleFacesDetection(
    faces: Face[],
    frame: Frame
  ) { 
    if ( Object.keys( faces ).length <= 0 ) {
      aFaceW.value = 0
      aFaceH.value = 0
      aFaceX.value = 0
      aFaceY.value = 0
      setFindFace(false)
      return
    }
    const { bounds } = faces[ 0 ]
    const {
      width,
      height,
      x,
      y
    } = bounds
    aFaceW.value = width
    aFaceH.value = height
    aFaceX.value = x
    aFaceY.value = y
    setFindFace(true)
  }

  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <View
        style={{ flex: 2, borderRadius: 10 }}
      >
        {camera !== null ? (
          <Camera
            style={{ flex: 1 }}
            device={device}
            isActive={true}
            faceDetectionCallback={handleFacesDetection}
            faceDetectionOptions={faceDetectionOptions}
          />
        ) : (
          <View style={{ flex: 2 }}>
            <Text>Error with camera</Text>
          </View>
        )}
        <View style={{ flexDirection: 'row', justifyContent:'space-evenly' }}>
          <Text>{findFace ? "A face was found" : "No faces founded"}</Text>
        </View>
      </View>

    </SafeAreaView>
  );
}