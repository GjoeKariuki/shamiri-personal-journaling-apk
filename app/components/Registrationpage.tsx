import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Image, TextInput } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import Toastnotify from "./Toastnotify";

interface formInputs {
  email: string;
  password: string;
}

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpasswordError, setConfirmPasswordError] = useState("");

  const navigation = useNavigation();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleRegister = () => {
    if (email == "") {
      setEmailError("Email is required");
      return;
    } else {
      setEmailError("");
    }
    if (validatePassword(password, confirmpassword)) {
      const formdata: formInputs = {
        email: email.trim(),
        password: password.trim(),
      };
      postRegister(formdata);
      // return;
    }
  };

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    if (email.trim() === "") {
      setEmailError("Email is required");
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    }

    setEmailError("");
  };

  const postRegister = async (formdata: formInputs) => {
    try {
      console.log("myapu", apiUrl);
      console.log(formdata);

      const response = await axios.post(apiUrl + "/api/register/", formdata, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      if (response.data !== false) {
        Toastnotify("success", "Sign up successfull", "");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("error response", error);
      // show toast login failed
      Toastnotify("error", "Signup failed", "Try again");
    }
  };

  const validatePassword = (
    formpassword: string,
    confirmformpassword: string
  ) => {
    // Regular expression to check password criteria

    let isValid = true;

    if (!passwordRegex.test(formpassword)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (formpassword !== confirmformpassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: "#877dfa" }}>
      <SafeAreaView className="flex p-2 pt-6">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-blue-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../../assets/signup.png")}
            style={{ width: "70%", height: 380 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          {/* <Text className="text-gray-700 ml-4">Full Name</Text>
          <TextInput
            placeholder="Enter name:"
            value="John Stack"
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          /> */}
          <Text className="text-gray-700 ml-4">Email Address</Text>
          {emailError ? (
            <Text className="text-red-500 m-1 text-center">{emailError}</Text>
          ) : null}
          <TextInput
            placeholder="Enter Email:"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              validateForm();
            }}
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
            onChangeText={(text) => {
              setPassword(text);
              validateForm();
            }}
            className="mb-3 p-4 bg-gray-100 text-gray-700 rounded-2xl"
          />
          <Text className="text-gray-700 ml-4">Confirm Password</Text>
          {confirmpasswordError ? (
            <Text className="text-red-500 m-1 text-center">
              {confirmpasswordError}
            </Text>
          ) : null}
          <TextInput
            secureTextEntry
            placeholder="Confirm Password:"
            value={confirmpassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              validateForm();
            }}
            className="mb-3 p-4 bg-gray-100 text-gray-700 rounded-2xl"
          />

          <TouchableOpacity
            className="py-3 bg-blue-800 rounded-xl"
            onPress={() => handleRegister()}
          >
            <Text className="font-extrabold text-center text-xl text-white">
              Sign Up
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
            Already have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            className="ml-2"
          >
            <Text className="text-blue-700 font-semibold text-xl">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
