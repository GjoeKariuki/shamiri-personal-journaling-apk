import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/FontAwesome";
import { sampleJournal } from "../store/store";
import { SafeAreaView } from "react-native-safe-area-context";

function Detailsmodal() {
  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        // onRequestClose={close logic} // Close modal on back button press
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}></View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default Detailsmodal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    width: wp("100%"),
    // height: hp("100%"),
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: wp("30%"),
    height: hp("50%"),
  },
});
