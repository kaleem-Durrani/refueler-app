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
  HStack,
  VStack,
  Spinner,
  SafeAreaView,
} from "@gluestack-ui/themed";
import React, {
  useCallback,
  useRef,
  useContext,
  useState,
  useEffect,
} from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, HEIGHT, PERCENT } from "../../../Constants/Constants";
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

import useAuth from "../../../auth/useAuth";
import useProfile from "../../../hooks/useProfile";
import useApi from "../../../hooks/useApi";
import employeeApis from "../../../api/employee";
import { FontAwesome } from "@expo/vector-icons";

export default function HomeTab() {
  const { user } = useAuth();

  const { profile, fetchProfile, refreshProfile } = useProfile();

  const createTransactionApi = useApi(employeeApis.createTransaction);

  useEffect(() => {
    fetchProfile();
    // console.log(profile);
  }, []);

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

  const handleTransaction = async () => {
    const transaction = JSON.parse(scanned);

    await createTransactionApi.request(
      transaction.amount,
      transaction.selectedPaymentMethod,
      transaction.selectedFuel,
      transaction.litres,
      transaction.userId
    );
  };

  useEffect(() => {
    if (createTransactionApi.data) {
      Alert.alert("Success", `${createTransactionApi.data.message}`);
      setScanned("");
      return;
    }

    if (createTransactionApi.error) {
      Alert.alert(
        `${createTransactionApi.responseProblem} ${createTransactionApi.errorStatus}`,
        `${createTransactionApi.error}`
      );
      setScanned("");
      return;
    }
  }, [createTransactionApi.data, createTransactionApi.error]);

  if (device == null)
    return (
      <View>
        <Text>No Camera Found!</Text>
      </View>
    );

  if (scanned) {
    return (
      <View>
        <VStack p={"$6"} px={"$16"} gap={"$1"}>
          <HStack justifyContent="space-between">
            <Text bold>Amount: </Text>
            <Text color={COLORS.tertiary}>{JSON.parse(scanned).amount}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text bold>Fuel Type: </Text>
            <Text color={COLORS.tertiary}>
              {JSON.parse(scanned).selectedFuel}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text bold>Litres: </Text>
            <Text color={COLORS.tertiary}>{JSON.parse(scanned).litres}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text bold>Payment Method: </Text>
            <Text color={COLORS.tertiary}>
              {JSON.parse(scanned).selectedPaymentMethod}
            </Text>
          </HStack>
        </VStack>

        <Button
          action="positive"
          mx={"$16"}
          // variant="outline"
          isDisabled={createTransactionApi.loading}
          onPress={() => handleTransaction()}
        >
          <ButtonText>Confirm Transaction</ButtonText>
        </Button>

        <Button
          mt={"$6"}
          action="negative"
          mx={"$16"}
          // variant="outline"
          isDisabled={createTransactionApi.loading}
          onPress={() => setScanned("")}
        >
          <ButtonText>Scan Again</ButtonText>
        </Button>
      </View>
    );
  } else
    return (
      <SafeAreaView style={{ flex: 1, paddingTop: HEIGHT * 0.01 }}>
        <Button
          isDisabled={!profile}
          variant="outline"
          position="absolute"
          zIndex={10}
          right={15}
          top={15}
          onPress={() => refreshProfile()}
        >
          {profile ? (
            <FontAwesome
              name="refresh"
              size={PERCENT[6]}
              color={COLORS.tertiary}
            />
          ) : (
            <Spinner size="small" />
          )}
        </Button>

        <VStack px={"$4"}>
          <Text
            ml={"$2"}
            fontWeight="bold"
            size="3xl"
            color={COLORS.activeText}
          >
            {profile ? "Hello " + profile.name : "Loading..."}
          </Text>
          <Text ml={"$2"} mt={-6} mb={"$1"} size="sm" color="gray">
            Good Morning
          </Text>

          {profile ? (
            <HStack>
              <Text ml={"$2"} fontWeight="bold" size="xl">
                Account Type:{" "}
              </Text>
              <Text
                ml={"$2"}
                fontWeight="bold"
                size="xl"
                color={COLORS.activeText}
              >
                {profile.type}
              </Text>
            </HStack>
          ) : (
            <Text ml={"$2"} fontWeight="bold" size="xl">
              Loading...
            </Text>
          )}
        </VStack>

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

            <SafeAreaView p={"$4"}>
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
            </SafeAreaView>

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
          </View>
        </GestureDetector>
      </SafeAreaView>
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
