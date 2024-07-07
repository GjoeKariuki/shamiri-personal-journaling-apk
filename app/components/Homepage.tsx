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
      <View>
        <Text style={styles.heading}>Your Journals</Text>
        {/* <Button
          title="Add Journal"
          onPress={() => router.navigate("AddJournalpage")}
        /> */}
        <TouchableOpacity>
          <Icon name="plus" size={30} color="blue" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={sampleJournal}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
            <Text>{item.category}</Text>
            {/* <Button
              title="Edit"
              onPress={() =>
                router.navigate(
                  `EditJournalpage?entry=${encodeURIComponent(
                    JSON.stringify(item)
                  )} }`
                )
              }
            /> */}
            <View>
              <TouchableOpacity>
                <Icon name="edit" size={30} color="green" />
              </TouchableOpacity>
              <TouchableOpacity>
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
});

export default Homepage;
