import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { Camera, CameraType, CameraView } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

function CameraScreen() {
  const [type, setType] = useState<CameraType>("back");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const cameraRef = useRef<typeof CameraView | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to use the camera
        </Text>
      </View>
    );
  }

  const takePicture = async () => {
    // if (cameraRef.current) {
    //   console.log("picture triggered");
    //   //@ts-ignore
    //   const photo = await Camera?.current?.takePictureAsync();
    //   setCapturedImage(photo.uri);
    // }
    router.push("/screens/image-results");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker?.MediaTypeOptions?.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri);
    }
  };
  const useImage = async () => {
    router.push("/screens/image-results");
  };

  return (
    <View style={styles.container}>
      {capturedImage ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setCapturedImage(null)}
            >
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.primaryButton]}
              onPress={useImage}
            >
              <Text style={styles.buttonText}>Use Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        //@ts-ignore
        <CameraView style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
              <MaterialIcons name="photo-library" size={30} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setType(type === "back" ? "front" : "back")}
            >
              <MaterialIcons name="flip-camera-ios" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  captureButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    marginHorizontal: 20,
  },
  captureButtonInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "white",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "90%",
    height: "70%",
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  actionButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#f1f3f4",
  },
  primaryButton: {
    backgroundColor: "#4285F4",
  },
  buttonText: {
    fontSize: 16,
    color: "#202124",
  },
});

export default CameraScreen;

////

// import React, { useState, useRef, useEffect } from "react";
// import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
// import { CameraType } from "expo-camera"; // ✅ Use Camera, not CameraView
// import * as ImagePicker from "expo-image-picker";

// import { MaterialIcons } from "@expo/vector-icons";

// function CameraScreen() {
//   const [type, setType] = useState<CameraType>("back");
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   //@ts-ignore
//   const cameraRef = useRef<Camera | null>(null); // ✅ Correct ref type

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }

//   if (hasPermission === false) {
//     return (
//       <View style={styles.permissionContainer}>
//         <Text style={styles.permissionText}>
//           We need your permission to use the camera
//         </Text>
//       </View>
//     );
//   }

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       const photo = await cameraRef.current.takePictureAsync();
//       setCapturedImage(photo.uri);
//     }
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setCapturedImage(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {capturedImage ? (
//         <View style={styles.previewContainer}>
//           <Image source={{ uri: capturedImage }} style={styles.previewImage} />
//           <View style={styles.buttonRow}>
//             <TouchableOpacity
//               style={styles.actionButton}
//               onPress={() => setCapturedImage(null)}
//             >
//               <Text style={styles.buttonText}>Retake</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.primaryButton]}
//             >
//               <Text style={styles.buttonText}>Use Photo</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ) : (
//         //@ts-ignore
//         <Camera
//           style={styles.camera}
//           type={type}
//           ref={cameraRef} // ✅ Correct ref usage
//         >
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
//               <MaterialIcons name="photo-library" size={30} color="white" />
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.captureButton}
//               onPress={takePicture}
//             >
//               <View style={styles.captureButtonInner} />
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.iconButton}
//               onPress={() => setType(type === "back" ? "front" : "back")}
//             >
//               <MaterialIcons name="flip-camera-ios" size={30} color="white" />
//             </TouchableOpacity>
//           </View>
//         </Camera>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   permissionContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   permissionText: {
//     fontSize: 18,
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     backgroundColor: "transparent",
//     flexDirection: "row",
//     margin: 20,
//   },
//   iconButton: {
//     alignSelf: "flex-end",
//     alignItems: "center",
//     padding: 10,
//   },
//   captureButton: {
//     alignSelf: "flex-end",
//     alignItems: "center",
//     marginHorizontal: 20,
//   },
//   captureButtonInner: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: "white",
//     borderWidth: 2,
//     borderColor: "white",
//   },
//   previewContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   previewImage: {
//     width: "90%",
//     height: "70%",
//     borderRadius: 10,
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//     marginTop: 20,
//   },
//   actionButton: {
//     padding: 15,
//     borderRadius: 8,
//     backgroundColor: "#f1f3f4",
//   },
//   primaryButton: {
//     backgroundColor: "#4285F4",
//   },
//   buttonText: {
//     fontSize: 16,
//     color: "#202124",
//   },
// });

// export default CameraScreen;
