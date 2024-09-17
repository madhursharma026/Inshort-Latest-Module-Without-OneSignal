import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");
      setIsFirstLaunch(hasLaunched === null);
    };

    checkFirstLaunch();
  }, []);
  if (isFirstLaunch === null) return null;

  return (
    <>
      {isFirstLaunch ? (
        <Redirect href="/onboarding" />
      ) : (
        <Redirect href="/(tabs)" />
      )}
    </>
  );
}
