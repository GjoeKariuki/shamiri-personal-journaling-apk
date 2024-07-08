import React from "react";
import { Text, TouchableOpacity, View, Image, TextInput } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation();

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
            source={require("../../assets/login.png")}
            style={{ width: 300, height: 300 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            placeholder="Enter Email:"
            value="johnstack@gmail.com"
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            secureTextEntry
            placeholder="Enter Password:"
            value="johnstack@gmail.com"
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-5"
          />

          <TouchableOpacity className="py-3 bg-blue-800 rounded-xl">
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
