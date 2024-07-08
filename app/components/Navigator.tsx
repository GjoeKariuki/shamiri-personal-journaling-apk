import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import AddJournalpage from "./AddJournalpage";
import EditJournalpage from "./EditJournalpage";
import Homepage from "./Homepage";
import Loginpage from "./Loginpage";
import Profilepage from "./Profilepage";
import Registrationpage from "./Registrationpage";
import Headertab from "./Headertab";
import Detailsmodal from "./Detailsmodal";

const StackNav = createNativeStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Headertab />
      <StackNav.Navigator initialRouteName="Profile">
        <StackNav.Screen
          name="Register"
          options={{ headerShown: false }}
          component={Registrationpage}
        />
        <StackNav.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Loginpage}
        />
        <StackNav.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Homepage}
        />
        <StackNav.Screen
          name="AddJournal"
          options={{ headerShown: false }}
          component={AddJournalpage}
        />
        <StackNav.Screen
          name="EditJournal"
          options={{ headerShown: false }}
          component={EditJournalpage}
        />
        <StackNav.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={Profilepage}
        />
        <StackNav.Screen
          name="Modal"
          options={{ headerShown: false }}
          component={Detailsmodal}
        />
      </StackNav.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
