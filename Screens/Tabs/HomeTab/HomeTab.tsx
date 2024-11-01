import {
  View,
  Text,
  Button,
  ButtonText,
  Image,
  Box,
  FlatList,
  Divider,
  HStack,
  VStack,
  Spinner,
  SafeAreaView,
} from "@gluestack-ui/themed";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { Alert, Platform, StyleSheet, TouchableOpacity } from "react-native";
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
import { NetworkStatusBadge } from "../../../components/NetworkStatusBadge";
import { FontAwesome } from "@expo/vector-icons";

////////////////////////////////////////////////////////////////////////////////////////////////

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////

export default function HomeTab() {
  const { profile, fetchProfile, refreshProfile } = useProfile();
  const createTransactionApi = useApi(employeeApis.createTransaction);

  ////////////////////////////////////////////////////////////////////////////////////////////////
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  ////////////////////////////////////////////////////////////////////////////////////////////////

  const updatePushTokenApi = useApi(employeeApis.updatePushToken);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    const updatePushToken = async () => {
      await updatePushTokenApi.request(expoPushToken);
    };
    if (expoPushToken) {
      updatePushToken();
    }
  }, [expoPushToken]);

  const camera = useRef<Camera>(null);
  const isFocused = useIsFocused();

  const appState = useAppState();
  const isActive = isFocused && appState === "active";
  const { hasPermission, requestPermission } = useCameraPermission();
  const [permissionRequested, setPermissionRequested] = useState(false);
  const device = useCameraDevice("back");

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

  useEffect(() => {
    if (!hasPermission && !permissionRequested) {
      requestPermission().then(() => setPermissionRequested(true));
    }
  }, [hasPermission, permissionRequested, requestPermission]);

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

  if (!profile || !device) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <NetworkStatusBadge />
        <Spinner size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <NetworkStatusBadge />
        <Text>Camera Permission</Text>
        <Button onPress={requestPermission}>
          <ButtonText>Request Permission</ButtonText>
        </Button>
      </View>
    );
  }

  if (scanned) {
    return (
      <View>
        <NetworkStatusBadge />
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
          isDisabled={createTransactionApi.loading}
          onPress={() => handleTransaction()}
        >
          <ButtonText>Confirm Transaction</ButtonText>
        </Button>

        <Button
          mt={"$6"}
          action="negative"
          mx={"$16"}
          isDisabled={createTransactionApi.loading}
          onPress={() => setScanned("")}
        >
          <ButtonText>Scan Again</ButtonText>
        </Button>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, paddingTop: HEIGHT * 0.01 }}>
        <NetworkStatusBadge />
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
            {(() => {
              const hour = new Date().getHours();
              if (hour < 4) return "Good Night";
              if (hour < 12) return "Good Morning";
              if (hour < 18) return "Good Afternoon";
              return "Good Evening";
            })()}
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
        <View w={"100%"} h={"100%"} p={"$4"}>
          <GestureDetector gesture={gesture}>
            <SafeAreaView>
              <Camera
                ref={camera}
                style={{
                  width: "100%",
                  height: "100%",
                  zIndex: -1,
                }}
                device={device}
                isActive={isActive}
                codeScanner={codeScanner}
              />
            </SafeAreaView>
          </GestureDetector>
        </View>
      </SafeAreaView>
    );
  }
}
