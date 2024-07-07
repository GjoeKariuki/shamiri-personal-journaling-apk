import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Homepage from "./components/Homepage";

const App = () => {
  return (
    <View>
      <Homepage />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
