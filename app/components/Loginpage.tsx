import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Image, TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toastnotify from "./Toastnotify";

interface formInputs {
  email: string;
  password: string;
}
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const navigation = useNavigation();

  const postLogin = async (formdata: formInputs) => {
    try {
      // console.log(apiUrl);

      const response = await axios.post(apiUrl + "/api/login/", formdata, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data !== false) {
        Toastnotify("success", "Login successful", "");
        const user_id = response.data.user.id;
        const user_token = response.data.token;
        const user_first_name = response.data.user.first_name;
        const user_last_name = response.data.user.last_name;
        const user_email = response.data.user.email;

        await AsyncStorage.setItem("Token", user_token);
        await AsyncStorage.setItem("userID", user_id);
        await AsyncStorage.setItem("userFirstName", user_first_name);
        await AsyncStorage.setItem("userLastName", user_last_name);
        await AsyncStorage.setItem("userEmail", user_email);
        if (user_id) {
          setEmail("");
          setPassword("");
          setEmailError("");
          setPasswordError("");
          navigation.navigate("Home");
        }
      }
    } catch (error: any) {
      console.error("error response", error);
      // show toast failed
      Toastnotify("error", "Login failed", "Check credentials & trying again");

      const errormessage = error.response.data.error[0];
      console.log(errormessage);

      console.error("error: response data", error.response.data);
      // console.error("error: response status", error.response.status);
      // console.error("error: response headers", error.response.headers);
    }
  };
  const handleLogin = () => {
    console.log("not heere");
    if (email == "" && password == "") {
      setEmailError("Email is required");
      setPasswordError("Password is required");
      return;
    } else if (email == "") {
      setEmailError("Email is required");
      return;
    } else if (password == "") {
      setPasswordError("Password is required");
      return;
    } else if (email.length > 0 && password.length > 0) {
      const formdata: formInputs = {
        email: email.trim(),
        password: password.trim(),
      };
      console.log("foremd", formdata);

      postLogin(formdata);
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: "#877dfa" }}>
      <SafeAreaView className="flex p-2 pt-6">
        <View className="flex-row justify-center">
          <Image
            source={require("../../assets/login.png")}
            style={{ width: wp("45%"), height: wp("45%") }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          {emailError ? (
            <Text className="text-red-500 m-1 text-center">{emailError}</Text>
          ) : null}
          <TextInput
            placeholder="Enter Email:"
            value={email}
            onChangeText={setEmail}
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          />

          <Text className="text-gray-700 ml-4">Password</Text>
          {passwordError ? (
            <Text className="text-red-500 m-1 text-center">
              {passwordError}
            </Text>
          ) : null}

          <TextInput
            secureTextEntry
            placeholder="Enter Password:"
            value={password}
            onChangeText={setPassword}
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-5"
          />

          <TouchableOpacity
            className="py-3 bg-blue-800 rounded-xl"
            onPress={() => handleLogin()}
          >
            <Text className="font-extrabold text-center text-xl text-white">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">
          Or
        </Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image
              className="w-10 h-10"
              source={require("../../assets/google.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image
              className="w-10 h-10"
              source={require("../../assets/apple.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image
              className="w-10 h-10"
              source={require("../../assets/facebook.png")}
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row flex justify-center items-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            className="ml-2"
          >
            <Text className="text-blue-700 font-semibold text-xl">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
