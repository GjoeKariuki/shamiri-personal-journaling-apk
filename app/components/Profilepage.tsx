import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toastnotify from "./Toastnotify";
import axios from "axios";
// import Icon from "react-native-vector-icons/FontAwesome5";

function Profilepage() {
  // const [userData, setUserData] = useState({
  //   email: "user@example.com",
  //   password: "",
  //   telephone: "123-456-7890",
  //   profilePic: "https://via.placeholder.com/150",
  //   first_name : "",
  //   last_name: ""
  // });
  const [userData, setUserData] = useState({});
  const [userpassword, setUserPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const pickImage = async () => {
    // Request permission to access the camera roll
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need permission to access your camera roll."
      );
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserData({ ...userData, profilePic: result.assets[0].uri });
      console.log(result);
    }
  };

  const takePhoto = async () => {
    // Request permission to access the camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need permission to access your camera."
      );
      return;
    }

    // Launch camera
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserData({ ...userData, profilePic: result.assets[0].uri });
      console.log(result);
    }
  };

  const getProfileDetails = async () => {
    const userfirstname = await AsyncStorage.getItem("userFirstName");
    const userlastname = await AsyncStorage.getItem("userLastName");
    const useremail = await AsyncStorage.getItem("userEmail");
    setUserData({
      email: useremail,
      password: "",
      telephone: "123-456-7890",
      profilePic: "https://via.placeholder.com/150",
      first_name: userfirstname,
      last_name: userlastname,
    });
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      console.log("userdata", userData);
      const token = await AsyncStorage.getItem("Token");
      const userid = await AsyncStorage.getItem("userID");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      };
      const updateform = {
        first_name: userData.first_name,
        last_name: userData.last_name,
      };
      console.log(updateform);

      // /api/user/03a4b0bd-bf62-454d-aea8-1d21ea42ae46/
      const response = await axios.put(
        apiUrl + `/api/user/${userid}/`,
        updateform,
        config
      );
      if (response.data !== false) {
        console.log("update response", response.data);
        Toastnotify("success", "details updated successful", "");
      }
    } catch (error) {
      console.error("error response", error);
      // show toast failed
      Toastnotify(
        "error",
        "updating failed",
        "Check credentials & trying again"
      );
    }
  };

  const handlePasswordChange = async () => {
    try {
      const token = await AsyncStorage.getItem("Token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      };
      const passwordform = {
        old_password: userpassword,
        new_password: newpassword,
      };
      console.log(passwordform);

      const response = await axios.post(
        apiUrl + "/api/change-password",
        passwordform,
        config
      );
      if (response.data !== false) {
        console.log(response.data);
        const msg = response.data.message;
        console.log(msg);

        Toastnotify("success", msg, "");
      }
    } catch (error) {
      console.error("error response", error.response.data);
      // show toast failed
      Toastnotify(
        "error",
        "updating passwords failed",
        "Check credentials & trying again"
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      <View className="bg-white p-4 rounded-lg shadow-md">
        <Text className="text-2xl font-bold mb-4">Profile</Text>
        <View className="items-center mb-4">
          {userData.profilePic ? (
            <Image
              source={{ uri: userData.profilePic }}
              className="w-32 h-32 rounded-full mb-2"
            />
          ) : (
            <View className="w-32 h-32 rounded-full bg-gray-300 mb-2"></View>
          )}
          <Button title="Change Profile Picture" onPress={pickImage} />
          <Button title="Take Photo" onPress={takePhoto} />
        </View>
        <TextInput
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder={userData.email}
          value={userData.email}
          onChangeText={(text) => handleInputChange("email", text)}
          editable={false}
        />
        <TextInput
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder={userData.first_name}
          value={userData.first_name}
          onChangeText={(text) => handleInputChange("first_name", text)}
        />
        <TextInput
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder={userData.last_name}
          value={userData.last_name}
          onChangeText={(text) => handleInputChange("last_name", text)}
        />

        <TextInput
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder="Telephone"
          value={userData.telephone}
          onChangeText={(text) => handleInputChange("telephone", text)}
        />
        <Button
          title="Update Profile"
          onPress={() => {
            // Logic for updating profile
            handleProfileUpdate();
          }}
        />
      </View>
      <View className="bg-white p-4 rounded-lg shadow-md mt-4">
        <Text className="text-2xl font-bold mb-4">Change Password</Text>
        <TextInput
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder="Old Password"
          value={userpassword}
          onChangeText={setUserPassword}
          secureTextEntry
          // Logic for handling old password input
        />
        <TextInput
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder="New Password"
          secureTextEntry
          value={newpassword}
          onChangeText={setNewPassword}
          // Logic for handling new password input
        />
        <TextInput
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmpassword}
          onChangeText={setconfirmPassword}
          // Logic for handling confirm new password input
        />
        <Button
          title="Change Password"
          onPress={() => {
            // Logic for changing password
            handlePasswordChange();
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default Profilepage;
