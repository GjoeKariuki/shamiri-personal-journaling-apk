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
import Icon from "react-native-vector-icons/FontAwesome5";
import HeaderLogo from "../../assets/headerlogo.png";

function Headertab() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.headers}>
      <View className="flex flex-row">
        <Image
          source={HeaderLogo}
          resizeMode="contain"
          style={styles.imagelogo}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("components/Profilepage");
          }}
        >
          <Icon name="user-edit" size={30} color="blue" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Headertab;

const styles = StyleSheet.create({
  imagelogo: {
    height: hp("10%"),
    width: wp("10%"),
    aspectRatio: 1,
  },
  button: {
    // paddingTop: 10,
    // marginTop: hp("1%"),
  },
  headers: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp("2%"),
    height: hp("6%"),
    paddingTop: 10,
    // width: wp("10%"),
    // paddingVertical: hp("1.5%"),
  },
});
