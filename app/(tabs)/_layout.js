import tw from "twrnc";
import { Tabs } from "expo-router";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function Layout() {
  const screenOptions = {
    headerShown: false,
    tabBarLabelStyle: tw`text-base`,
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: tw`h-18 pt-2 pb-1`,
      }}
    >
      {/* Discover Tab */}
      <Tabs.Screen
        name="index"
        options={{
          ...screenOptions,
          title: "Discover",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="magnifier" size={18} color={color} />
          ),
        }}
      />

      {/* Feeds Tab */}
      <Tabs.Screen
        name="feeds"
        options={{
          ...screenOptions,
          title: "Feeds",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="notebook" size={18} color={color} />
          ),
        }}
      />

      {/* Settings Tab */}
      <Tabs.Screen
        name="settings"
        options={{
          ...screenOptions,
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="settings" size={18} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
