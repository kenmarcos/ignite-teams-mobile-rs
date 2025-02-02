import { Groups } from "@/screens/Groups";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "styled-components";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Groups />
    </ThemeProvider>
  );
}
