export default {
  expo: {
    name: "my-app",
    slug: "my-app",
    scheme: "myapp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./app/assets/images/icon.png",
    newArchEnabled: true,
    userInterfaceStyle: "light",
    splash: {
      image: "./app/assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.google.homeapp",
      adaptiveIcon: {
        foregroundImage: "./app/assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./app/assets/images/favicon.png",
    },
    extra: {
      EXPO_PUBLIC_GOOGLE_API_KEY: process.env.GoogleApiKey,
      GOOGLE_CX: process.env.GOOGLE_CX,
      eas: {
        projectId: "aa921512-155e-44d3-ac2d-783a0fea1287",
      },
    },
  },
};
