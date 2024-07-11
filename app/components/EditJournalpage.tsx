import React, { useState, useEffect } from "react";
import { useRouter, useGlobalSearchParams } from "expo-router";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import { JournalEntry } from "../store/store";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const editschema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  category: yup.string().required("Category is required"),
  date: yup.date().required("Date is required"),
});

function EditJournalpage() {
  // const { entry } = useGlobalSearchParams();
  // const parsedEntry: JournalEntry = JSON.parse(decodeURIComponent(entry));
  const parsedEntry: JournalEntry = {
    id: "1a",
    title: "Sample Title",
    content: "Sample Content",
    category: "Sample Category",
    date: "2024-07-04",
    user: "23489h23h234rfh",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(editschema),
  });
  // useEffect(() => {
  //   // console.log("entry object", entry);
  //   reset(parsedEntry);
  // }, [parsedEntry, reset]);

  const onSubmit = async (data) => {
    try {
      // get token from asynstorage
      // update journal
      // respond accodingly
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Journal Entry</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="title"
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}
      <Controller
        control={control}
        name="content"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="content"
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.content && (
        <Text style={styles.error}>{errors.content.message}</Text>
      )}
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="category"
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.category && (
        <Text style={styles.error}>{errors.category.message}</Text>
      )}
      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="date"
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.date && <Text style={styles.error}>{errors.date.message}</Text>}
      <Button title="Update Journal" onPress={handleSubmit(onSubmit)}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 10,
    borderColor: "#ere",
    padding: 10,
  },
  error: {
    color: "red",
  },
});
export default EditJournalpage;
