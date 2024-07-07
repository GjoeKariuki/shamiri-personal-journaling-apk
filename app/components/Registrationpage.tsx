import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const registrationSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required().min(6),
});

function Registrationpage(navigation) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registrationSchema) });

  const onSubmit = async (data) => {
    try {
      // await axios.post("")
      // registration endpoint waiting......
      // if success navigate
      console.log(data);
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      <Text>Signup</Text>
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
      <Button title="Signup" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

export default Registrationpage;
