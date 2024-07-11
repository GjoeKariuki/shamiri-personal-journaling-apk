import React, { useState, useEffect } from "react";
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
import Iconlg from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toastnotify from "./Toastnotify";
import HeaderLogo from "../../assets/headerlogo.png";

function Headertab() {
  const [hasToken, setHasToken] = useState(false);

  const searchToken = async () => {
    try {
      const token = await AsyncStorage.getItem("Token");
      if (token !== null) {
        setHasToken(true);
      } else {
        setHasToken(false);
      }
    } catch (error) {
      console.error("no token found");
    }
  };

  const navigation = useNavigation();

  useEffect(() => {
    setInterval(() => {
      searchToken();
    }, 200);
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("Login");
      Toastnotify("success", "loged out", "");
    } catch (error) {
      Toastnotify("error", "logout failed", "");
    }
  };
  return (
    <SafeAreaView className="bg-orange-20" style={styles.headers}>
      <View className="flex flex-row justify-between px-5">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            source={HeaderLogo}
            resizeMode="contain"
            style={styles.imagelogo}
          />
        </TouchableOpacity>

        <View className="flex">
          {hasToken && (
            <TouchableOpacity
              className="mx-1 m-2"
              style={styles.button}
              onPress={() => {
                navigation.navigate("Profile");
              }}
            >
              <Icon name="user-edit" size={30} color="blue" />
            </TouchableOpacity>
          )}
        </View>
        <View>
          {hasToken && (
            <TouchableOpacity
              className="mx-10 m-2"
              style={styles.button}
              onPress={() => {
                // logout
                handleLogout();
              }}
            >
              <Iconlg name="logout" size={30} color="blue" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Headertab;

const styles = StyleSheet.create({
  imagelogo: {
    height: hp("9%"),
    width: wp("9%"),
    aspectRatio: 1,
  },
  button: {
    // paddingTop: 10,
    // marginTop: hp("1%"),
    position: "absolute",
    bottom: "30%",
    right: "2.5%",
  },
  headers: {
    // display: "flex",
    // justifyContent: "space-between",
    // paddingHorizontal: wp("2%"),
    height: hp("10%"),
    // paddingTop: 10,
    // width: wp("100%"),
    // paddingVertical: hp("1.5%"),
  },
});
