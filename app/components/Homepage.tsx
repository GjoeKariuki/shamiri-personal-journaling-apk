import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { sampleJournal } from "../store/store";

function Homepage() {
  const navigation = useNavigation();
  const [dairy, setDiary] = useState([{}]);
  const [columns, setColumns] = useState(2);
  const [filter, setFilter] = useState("all");
  const fetchDiaries = async () => {
    try {
      // get token from asyncstorage
      // get id
      // get diaries of login user
      // setDiary to response.data
      setDiary(sampleJournal);
    } catch (error) {
      console.error(error);
    }
  };

  const updateFlatlist = () => {
    const width = Dimensions.get("window").width;
    if (width < 390) {
      setColumns(1);
    } else {
      setColumns(2);
    }
  };

  const filterDiaries = (period) => {
    setFilter(period);
  };

  useEffect(() => {
    fetchDiaries();
    updateFlatlist();
    Dimensions.addEventListener("change", updateFlatlist);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <Text style={styles.heading}>Your Journals</Text>
        <TouchableOpacity
          style={styles.addbutton}
          onPress={() => {
            navigation.navigate("Modal");
          }}
        >
          <Icon name="plus" size={30} color="blue" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by:</Text>
        <Picker
          selectedValue={filter}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => filterDiaries(itemValue)}
        >
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Daily" value="daily" />
          <Picker.Item label="Weekly" value="weekly" />
          <Picker.Item label="Monthly" value="monthly" />
        </Picker>
      </View>

      <FlatList
        data={sampleJournal}
        keyExtractor={(item) => item.id.toString()}
        numColumns={columns}
        className="bg-blue-50 flex content-between p-10 mb-9"
        renderItem={({ item }) => (
          <View
            style={styles.journalist}
            className="bg-white m-2 p-4 rounded-lg shadow-emerald-950 flex-1 mb-8"
          >
            <View>
              <Text className="text-black text-2xl font-semibold mb-1">
                {item.title}
              </Text>
              <Text className="text-black text-lg mb-1 ">{item.content}</Text>
              <Text className=" text-sm text-slate-950">{item.category}</Text>
              <Text className="k text-sm text-slate-950">{item.date}</Text>
            </View>
            <View
              style={styles.controls}
              className="flex-row justify-between mt-3"
            >
              <TouchableOpacity
                style={styles.iconbutton}
                className="p-2 rounded-full bg-green-200"
                onPress={() => {
                  router.navigate(
                    `components/EditJournalpage?entry=${encodeURIComponent(
                      JSON.stringify(item)
                    )} }`
                  );
                }}
              >
                <Icon name="edit" size={30} color="#006600" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconbutton}
                className="p-2 rounded-full bg-red-100"
                onPress={() => {
                  /* delete logic */
                }}
              >
                <Icon name="trash" size={30} color="#ff6666" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: wp("1%"),
    paddingVertical: hp("3%"),
  },
  heading: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    lineHeight: hp("3%"),
  },
  innercontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp("2%"),
  },
  addbutton: {
    marginTop: 20,
    padding: 10,
  },
  journalist: {
    display: "flex",
    paddingHorizontal: wp("2%"),
    // flexDirection: "column",
    // justifyContent: "center",
  },
  controls: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "center",
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("1%"),
  },
  iconbutton: {
    padding: 10,
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("2%"),
    marginVertical: 10,
  },
  filterLabel: {
    fontSize: hp("2%"),
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    width: 150,
  },
});

export default Homepage;
