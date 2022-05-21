import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import CoursesScren from "../screens/CoursesScreen";
import ScanScreen from "../screens/ScanScreen";
import CatalogScreen from "../screens/CatalogScreen";

const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

const HomeStack = createNativeStackNavigator();
const Home = () => (
  <HomeStack.Navigator
    initialRouteName="Home"
    screenOptions={({ navigation }) => {
      const tabBarVisible = true;
      // const routerName =
      //   navigation.state.routes[navigation.state.index].routeName;

      // if (routerName == "Section") {
      //   tabBarVisible = false;
      // }

      return {
        tabBarVisible: tabBarVisible,
        header: () => null,
        presentation: "modal",
      };
    }}
  >
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Section" component={SectionScreen} />
    <HomeStack.Screen name="Catalog" component={CatalogScreen} />
  </HomeStack.Navigator>
);
const CoursesStack = createNativeStackNavigator();
const Courses = () => (
  <CoursesStack.Navigator screenOptions={{ header: () => null }}>
    <CoursesStack.Screen name="Courses" component={CoursesScren} />
  </CoursesStack.Navigator>
);
const ScanStack = createNativeStackNavigator();
const Scan = () => (
  <ScanStack.Navigator screenOptions={{ header: () => null }}>
    <ScanStack.Screen name="Scan" component={ScanScreen} />
  </ScanStack.Navigator>
);

const TabNavigator = createBottomTabNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator.Navigator screenOptions={{ header: () => null }}>
        <TabNavigator.Screen
          name="HomeTab"
          component={Home}
          options={{
            tabBarLabel: "Главная",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="ios-home"
                size={26}
                color={focused ? activeColor : inactiveColor}
              />
            ),
          }}
        />
        <TabNavigator.Screen
          name="CoursesTab"
          component={Courses}
          options={{
            tabBarLabel: "Корзина",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="ios-albums"
                size={26}
                color={focused ? activeColor : inactiveColor}
              />
            ),
          }}
        />
        <TabNavigator.Screen
          name="ScanTab"
          component={Scan}
          options={{
            tabBarLabel: "Сканировать",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="qr-code-outline"
                size={20}
                color={focused ? activeColor : inactiveColor}
              />
            ),
          }}
        />
      </TabNavigator.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
