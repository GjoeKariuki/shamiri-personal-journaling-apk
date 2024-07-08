import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddJournalpage from "./AddJournalpage";
import EditJournalpage from "./EditJournalpage";
import Homepage from "./Homepage";
import Loginpage from "./Loginpage";
import Profilepage from "./Profilepage";
import Registrationpage from "./Registrationpage";

const StackNav = createNativeStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <StackNav.Navigator initialRouteName="Home">
        <StackNav.Screen name="Register" component={Registrationpage} />
        <StackNav.Screen name="Login" component={Loginpage} />
        <StackNav.Screen name="Home" component={Homepage} />
        <StackNav.Screen name="AddJournal" component={AddJournalpage} />
        <StackNav.Screen name="EditJournal" component={EditJournalpage} />
        <StackNav.Screen name="Profile" component={Profilepage} />
      </StackNav.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
