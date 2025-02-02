import { LoadIndicator } from "@/components/Loading/styles";
import { Groups } from "@/screens/Groups";
import { theme } from "@/styles/theme";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { ThemeProvider } from "styled-components";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <ThemeProvider theme={theme}>
      {fontsLoaded ? <Groups /> : <LoadIndicator />}
    </ThemeProvider>
  );
}
