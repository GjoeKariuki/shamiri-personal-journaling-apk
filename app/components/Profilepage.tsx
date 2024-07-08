import React, { useState } from "react";
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
// import Icon from "react-native-vector-icons/FontAwesome5";

function Profilepage() {
  const [userData, setUserData] = useState({
    email: "user@example.com",
    password: "",
    telephone: "123-456-7890",
    profilePic: "https://via.placeholder.com/150",
  });

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
          placeholder="Email"
          value={userData.email}
          onChangeText={(text) => handleInputChange("email", text)}
        />
        <TextInput
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder="Password"
          secureTextEntry
          value={userData.password}
          onChangeText={(text) => handleInputChange("password", text)}
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
          }}
        />
      </View>
      <View className="bg-white p-4 rounded-lg shadow-md mt-4">
        <Text className="text-2xl font-bold mb-4">Change Password</Text>
        <TextInput
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder="Old Password"
          secureTextEntry
          // Logic for handling old password input
        />
        <TextInput
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder="New Password"
          secureTextEntry
          // Logic for handling new password input
        />
        <TextInput
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder="Confirm New Password"
          secureTextEntry
          // Logic for handling confirm new password input
        />
        <Button
          title="Change Password"
          onPress={() => {
            // Logic for changing password
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default Profilepage;
