import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Homepage from "./components/Homepage";

import Navigator from "./components/Navigator";

const App = () => {
  return (
    <SafeAreaView>
      <View>
        <Homepage />
      </View>
    </SafeAreaView>
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
