import { createMuiTheme, CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { deepPurple, orange } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";
import { useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppDispatchProvider } from "../context/AppDispatchProvider";
import initialState from "../context/initialState";
import reducer from "../context/reducer";
import useOnloadSetup from "../hooks/useOnloadSetup";
import QuestionsPage from "./Questions/QuestionsPage";
import QuizInfoPage from "./QuizDetail/QuizDetailPage";
import QuizListPage from "./QuizList/QuizListPage";
import TopBar from "./TopBar";
import UserPage from "./User/UserPage";

const App = () => {
  const [appState, dispatch] = useReducer(reducer, initialState);

  useOnloadSetup(appState, dispatch);

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
        <AppDispatchProvider>
          <TopBar />
          <Container maxWidth="sm">
            <Routes>
              <Route path="/" element={<QuizListPage appState={appState} />} />
              <Route
                path="/quiz/:id"
                element={<QuizInfoPage appState={appState} />}
              />
              <Route
                path="/quiz/:id/questions"
                element={<QuestionsPage appState={appState} />}
              />
              <Route path="/user" element={<UserPage appState={appState} />} />
            </Routes>
          </Container>
        </AppDispatchProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
