import {
  View,
  Text,
  Button,
  ButtonText,
  Image,
  Box,
  Heading,
  FlatList,
  Divider,
} from "@gluestack-ui/themed";
import React, { useCallback, useRef, useContext, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, PERCENT } from "../../../Constants/Constants";
import {
  Camera,
  Point,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { useAppState } from "@react-native-community/hooks";
import { AuthContext } from "../../../Contexts/AuthContext";

export default function HomeTab() {
  const { user }: any = useContext(AuthContext);
  console.log("User", user.user.email);
  const camera = useRef<Camera>(null);
  const isFocused = useIsFocused();
  const [isSideBarOn, setIsSideBarOn] = useState(false);
  const appState = useAppState();
  const isActive = isFocused && appState === "active";
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");

  const data = [
    { id: "1", price: 500 },
    { id: "2", price: 100 },
    { id: "3", price: 1000 },
  ];

  const focus = useCallback((point: Point) => {
    const c = camera.current;
    if (c == null) return;
    c.focus(point);
  }, []);

  const gesture = Gesture.Tap().onEnd(({ x, y }) => {
    focus({ x, y });
  });
  const [scanned, setScanned] = React.useState("");

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: (codes) => {
      if (codes[0].value) {
        setScanned(codes[0].value);
        console.log(`Scanned ${codes[0].value} codes!`);
      }
    },
  });

  if (!hasPermission) {
    requestPermission();
  }

  if (device == null)
    return (
      <View>
        <Text>No Camera Found!</Text>
      </View>
    );

  if (scanned) {
    return (
      <View>
        <Text>Scanned: {scanned}</Text>
        <Button onPress={() => setScanned("")}>
          <ButtonText>Scan Again</ButtonText>
        </Button>
      </View>
    );
  } else
    return (
      <GestureDetector gesture={gesture}>
        <View
          style={
            isSideBarOn
              ? {
                  flex: 1,
                  flexDirection: "row",
                  backgroundColor: COLORS.tertiary,
                }
              : {}
          }
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setIsSideBarOn(!isSideBarOn)}
          >
            <MaterialIcons
              name={isSideBarOn ? "arrow-circle-right" : "arrow-circle-left"}
              size={60}
              color={COLORS.tertiary}
            />
          </TouchableOpacity>

          <Camera
            ref={camera}
            style={{
              width: isSideBarOn ? "65%" : "100%",
              height: "100%",
              zIndex: -1,
            }}
            device={device}
            isActive={isActive}
            codeScanner={codeScanner}
          />

          <Box style={isSideBarOn ? styles.sidebarOn : styles.sidebarOff}>
            <Text size="md" color={COLORS.primary} bold>
              Previous Scans
            </Text>
            <FlatList
              style={{ width: "100%", padding: PERCENT[2] }}
              data={data}
              renderItem={() => (
                <Box flex={1} paddingVertical={"$6"} alignItems="center">
                  <Image
                    size="md"
                    source={require("../../../assets/images/qrcode.png")}
                    alt="QRCode"
                  />

                  <Divider mt={"$3"} />
                </Box>
              )}
              keyExtractor={(item) => item.id}
            />
            <Text>{user?.email} NEw User</Text>
          </Box>
          {/* <Image
            size="full"
            style={[StyleSheet.absoluteFill, { zIndex: 1 }]}
            source={require("../../../assets/images/QR-Scan-Screen.png")}
            alt="image"
          /> */}
          {/* {isActive && (
            <Button style={styles.floatingButton} onPress={floatingButtonPress}>
              <ButtonText>Pause</ButtonText>
            </Button>
          )}
          {!isActive && (
            <Button style={styles.floatingButton} onPress={floatingButtonPress}>
              <ButtonText>Start Scanning</ButtonText>
            </Button>
          )} */}
        </View>
      </GestureDetector>
    );
}

const styles = StyleSheet.create({
  sidebarOn: { flex: 1, alignItems: "center", marginTop: PERCENT[25] },
  sidebarOff: { display: "none" },

  backButton: {
    position: "absolute",
    top: PERCENT[6],
    right: PERCENT[2],
    backgroundColor: COLORS.primary,
    borderRadius: PERCENT[50],
    alignItems: "center",
    justifyContent: "center",
  },
  floatingButton: {
    position: "absolute",
    top: "80%",
    right: PERCENT[50],
    backgroundColor: COLORS.tertiary,
    borderRadius: PERCENT[50],
    alignItems: "center",
    justifyContent: "center",
  },
});
