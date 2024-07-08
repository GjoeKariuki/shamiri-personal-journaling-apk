import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from "react-native-responsive-screen";
// import Icon from "react-native-vector-icons/FontAwesome5";

function Profilepage() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View>
        <Text>profile</Text>
      </View>
    </SafeAreaView>
  );
}

export default Profilepage;
