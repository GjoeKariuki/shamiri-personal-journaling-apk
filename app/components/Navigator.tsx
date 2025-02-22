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
import Addsmodal from "./Addsmodal";
import Editmodal from "./Editmodal";
import Toast from "react-native-toast-message";

const StackNav = createNativeStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Headertab />
      <Toast />
      <StackNav.Navigator initialRouteName="Login">
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
          name="AddModal"
          options={{ headerShown: false }}
          component={Addsmodal}
        />
        <StackNav.Screen
          name="EditModal"
          options={{ headerShown: false }}
          component={Editmodal}
        />
      </StackNav.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
