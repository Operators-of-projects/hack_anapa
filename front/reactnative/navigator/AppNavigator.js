import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";

const Stack = createNativeStackNavigator();

const Navigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Section"
        component={SectionScreen}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigator;
