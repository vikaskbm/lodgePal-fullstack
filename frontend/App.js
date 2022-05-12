import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Ionicons from "@expo/vector-icons/Ionicons";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";

import Gate from "./components/Gate";
import store, { persistor } from "./redux/store";

const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === "string") return Image.prefetch(image);
    else return Asset.fromModule(image).downloadAsync();
  });
};

const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const loadAssets = async () => {
    const images = [
      require("./assets/loginBg.png"),
      require("./assets/roomDefaultImg.jpeg"),
      "http://pluspng.com/img-png/airbnb-logo-png-logo-black-transparent-airbnb-329.png",
    ];
    const fonts = [Ionicons.font];

    const imagePromises = cacheImages(images);
    const fontPromises = cacheFonts(fonts);

    return Promise.all([...fontPromises, ...imagePromises]);
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        loadAssets();

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Gate />
        </PersistGate>
      </Provider>
    </View>
  );
}
