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
import Icon from "react-native-vector-icons/AntDesign";
import { sampleJournal } from "../store/store";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toastnotify from "./Toastnotify";

function Editmodal() {
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    id: item.id,
    title: item.title,
    content: item.content,
    category: item.category,
    date: item.date, // Initialize with current date
    user: item.user,
  });
  const [titleErrors, setTitleErrors] = useState("");
  const [contentErrors, setContentErrors] = useState("");
  const [categoryErrors, setCategoryErrors] = useState("");
  const onClose = () => {
    navigation.goBack();
  };

  const [datePicker, setDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [customCategory, setCustomCategory] = useState(false);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const handleInputChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const changeDate = (event: any, selectdate: any) => {
    const date = selectdate || formData.date;
    setDatePicker(false);
    setFormData({ ...formData, date: date });
  };
  const handleCategoryChange = (itemValue) => {
    if (itemValue === "Custom") {
      setCustomCategory(true);
      setFormData({ ...formData, category: "" });
    } else {
      setCustomCategory(false);
      setFormData({ ...formData, category: itemValue });
    }
  };
  const getuser = async () => {
    const fetched = await AsyncStorage.getItem("userID");
    const user: string = fetched!.toString();
    setFormData({ ...formData, user: user });
  };
  useEffect(() => {
    getuser();
  }, []);

  const validateFormInputs = () => {
    if (
      formData.title == "" &&
      formData.category == "" &&
      formData.content == ""
    ) {
      setTitleErrors("Title is required");
      setCategoryErrors("Category is required");
      setContentErrors("Content is required");
      return;
    } else if (formData.title == "") {
      setTitleErrors("Title is required");
      return;
    } else if (formData.category == "") {
      setCategoryErrors("Category is required");
      return;
    } else if (formData.content == "") {
      setContentErrors("Content is required");
      return;
    } else if (
      formData.title.length > 0 &&
      formData.category.length > 0 &&
      formData.content.length > 0
    ) {
      console.log("edit data", formData);
      handleCreation();
    }
  };

  const handleCreation = async () => {
    try {
      const token = await AsyncStorage.getItem("Token");
      console.log("token", token);
      const updatEndpoint = apiUrl + `/journals/journal_detail/${formData.id}/`;
      console.log("updatEndpoint", updatEndpoint);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      };

      // format time
      if (formData.date.length > 11) {
        const datedd = formData.date;
        const det = datedd.toISOString().split("T");
        console.log("not");

        console.log(det[0]);
        setFormData({ ...formData, date: det[0] });
        return;
      }

      const formdata = {
        id: formData.id,
        category: formData.category,
        content: formData.content,
        date: formData.date,
        title: formData.title,
      };

      console.log("formdata", formdata);

      // /journals/journal_detail/b79930f4-c0bf-4d95-a9bd-4c87846bc60a/

      const response = await axios.put(updatEndpoint, formdata, config);
      // console.log("update response", response.data);

      if (response.data !== false) {
        // display toast success
        console.log("succeeded");
        Toastnotify("success", "Journal updated successful", "");
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error(error.response.data);
      // display failure toast
      Toastnotify("error", "Failed updating journal", "Try again");
    }
  };

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onClose}
      >
        <View
          style={styles.modalContainer}
          className="flex-1 justify-center items-center"
        >
          <View style={styles.modalContent} className="bg-white p-5">
            <Text className="text-xl font-bold mb-4">Journal Entry</Text>
            {titleErrors ? (
              <Text className="text-red-500 m-1 text-center">
                {titleErrors}
              </Text>
            ) : null}
            <TextInput
              className="border border-gray-300 rounded p-2 mb-2 w-full"
              placeholder={item.title}
              value={formData.title}
              onChangeText={(text) => handleInputChange("title", text)}
            />
            {contentErrors ? (
              <Text className="text-red-500 m-1 text-center">
                {contentErrors}
              </Text>
            ) : null}
            <TextInput
              className="border border-gray-300 rounded p-2 mb-2 w-full"
              placeholder={item.content}
              value={formData.content}
              onChangeText={(text) => handleInputChange("content", text)}
              multiline
              numberOfLines={6}
            />
            {categoryErrors ? (
              <Text className="text-red-500 m-1 text-center">
                {categoryErrors}
              </Text>
            ) : null}
            {!customCategory ? (
              <View className="border border-gray-300 rounded p-2 mb-2 w-full">
                <Picker
                  selectedValue={formData.category}
                  onValueChange={handleCategoryChange}
                >
                  <Picker.Item label="Personal" value="Personal" />
                  <Picker.Item label="Work" value="Work" />
                  <Picker.Item label="Travel" value="Travel" />
                  <Picker.Item label="Custom" value="Custom" />
                </Picker>
              </View>
            ) : (
              <View className="border border-gray-300 rounded p-2 mb-2 w-full flex">
                <TextInput
                  className="border border-gray-300 rounded p-2 mb-2 w-full"
                  placeholder={item.category}
                  value={formData.category}
                  onChangeText={(text) => handleInputChange("category", text)}
                />
                <TouchableOpacity
                  className="p-2 rounded mt-2"
                  onPress={() => setCustomCategory(false)}
                >
                  <Icon name="upcircleo" size={20} color="blue" />
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              className="border border-gray-300 rounded p-2 mb-2 w-full"
              onPress={() => setDatePicker(true)}
            >
              <Text>{format(formData.date, "yyyy-MM-dd")}</Text>
            </TouchableOpacity>
            {datePicker && (
              <DateTimePicker
                value={formData.date}
                mode="date"
                display="default"
                onChange={changeDate}
              />
            )}
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-blue-500 p-3 rounded-lg"
                onPress={onClose}
              >
                <Text className="text-white text-center">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-green-500 p-3 rounded-lg"
                onPress={() => {
                  // Save logic here
                  // onClose();

                  validateFormInputs();
                }}
              >
                <Text className="text-white text-center">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default Editmodal;

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
    // padding: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#4d4dff",
    alignItems: "center",
    justifyContent: "center",
    width: wp("85%"),
    height: hp("40%"),
  },
});
