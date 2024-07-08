import { StatusBar } from "expo-status-bar";
import Navigator from "./app/components/Navigator";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#fff6e6" barStyle="dark-content" />
      <Navigator />
    </>
  );
}
