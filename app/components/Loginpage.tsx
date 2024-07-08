import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

function Loginpage(navigation) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      // await axios.post("")
      // registration endpoint waiting......
      // if success navigate
      // get token from response

      console.log(data);
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      <Text>Login</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email address"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text>{errors.email.message}</Text>}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && <Text>{errors.password.message}</Text>}
      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

export default Loginpage;
