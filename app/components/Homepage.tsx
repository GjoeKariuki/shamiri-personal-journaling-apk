import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
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

function Homepage() {
  const [dairy, setDiary] = useState([{}]);
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

  useEffect(() => {
    fetchDiaries();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <Text style={styles.heading}>Your Journals</Text>
        <TouchableOpacity
          style={styles.addbutton}
          onPress={() => {
            router.navigate("components/AddJournalpage");
          }}
        >
          <Icon name="plus" size={30} color="blue" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={sampleJournal}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.journalist}>
            <View>
              <Text>{item.title}</Text>
              <Text>{item.content}</Text>
              <Text>{item.category}</Text>
            </View>
            <View style={styles.controls}>
              <TouchableOpacity
                style={styles.iconbutton}
                onPress={() => {
                  router.navigate(
                    `components/EditJournalpage?entry=${encodeURIComponent(
                      JSON.stringify(item)
                    )} }`
                  );
                }}
              >
                <Icon name="edit" size={30} color="green" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconbutton}
                onPress={() => {
                  /* delete logic */
                }}
              >
                <Icon name="trash" size={30} color="red" />
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
    paddingVertical: hp("1.5%"),
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
});

export default Homepage;
