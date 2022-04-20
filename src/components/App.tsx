import { createMuiTheme, CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { deepPurple, orange } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppContextProvider from "../store/provider";
import { firebaseDb } from "../utils/firebase";
import QuestionsPage from "./Questions/QuestionsPage";
import QuizInfoPage from "./QuizDetail/QuizDetailPage";
import QuizListPage from "./QuizList/QuizListPage";
import TopBar from "./TopBar";
import UserPage from "./User/UserPage";

const App = () => {
  console.log(firebaseDb);

  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: orange[700],
      },
      secondary: {
        main: deepPurple[500],
      },
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContextProvider>
          <TopBar />
          <Container maxWidth="sm">
            <Routes>
              <Route path="/" element={<QuizListPage />} />
              <Route path="/quiz/:id" element={<QuizInfoPage />} />
              <Route path="/quiz/:id/questions" element={<QuestionsPage />} />
              <Route path="/user" element={<UserPage />} />
            </Routes>
          </Container>
        </AppContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
