export default {
  expo: {
    name: "Refueler App",
    slug: "Refueler-App",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.zegoop.refueler",
      infoPlist: {
        NSCameraUsageDescription:
          "PakFuel Refueler needs access to your Camera.",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      useNextBuildSchema: true,
      versionCode: 1,
      package: "com.zegoop.refueler",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      permissions: [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO",
      ],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "expo-secure-store",
        {
          faceIDPermission:
            "Allow refueler app to access your Face ID biometric data.",
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
        },
      ],
      [
        "react-native-vision-camera",
        {
          cameraPermissionText: "PakFuel Refueler needs access to your Camera.",
          enableCodeScanner: true,
        },
      ],
    ],
    extra: {
      eas: {
        projectId: "ce5754fd-6939-4386-8100-0307d216fdce",
      },
    },
    owner: "zegoop",
  },
};
