import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Homepage({ navigation }) {
  const [dairy, setDiary] = useState([]);
  const fetchDiaries = async () => {
    try {
      // get token from asyncstorage
      // get id
      // get diaries of login user
      // setDiary to response.data
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDiaries();
  }, []);

  return (
    <View>
      <Text>Your Journals</Text>
      <Button
        title="Add Journal"
        onPress={() => navigation.navigate("AddJournalpage")}
      />
      <FlatList
        data={dairy}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
            <Button
              title="Edit"
              onPress={() =>
                navigation.navigate("EditJournalpage", { entry: item })
              }
            />
            <Button
              title="Delete"
              onPress={() => {
                /*delete logic*/
              }}
            />
          </View>
        )}
      />
    </View>
  );
}

export default Homepage;
