import { Slot } from "expo-router";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";

export default function HomeLayout() {
  return (
    <>
      <StatusBar style="auto" />

      <Slot />
      <Toast />
    </>
  );
}
