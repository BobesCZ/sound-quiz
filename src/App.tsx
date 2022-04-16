import { useEffect, useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { deepPurple, orange } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/styles";
import QuizDetailPage from "./components/QuizDetailPage";
import QuizInfoPage from "./components/QuizInfoPage";
import QuizListPage from "./components/QuizListPage";
import TopBar from "./components/TopBar";
import UserPage from "./components/UserPage";
import { AppDispatchProvider } from "./context/AppDispatchProvider";
import initialState from "./context/initialState";
import reducer from "./context/reducer";
import quizzes from "./data/quizzes";
import { loadFromStorage } from "./utils/storage";
import { ActionType } from "./types/action";

export default function App() {
  const [appState, dispatch] = useReducer(reducer, initialState);

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

  const availableQuizzes = appState.availableQuizzes;

  useEffect(() => {
    if (!Object.keys(availableQuizzes || []).length) {
      dispatch({ type: ActionType.SetAvailableQuizzes, payload: { quizzes } });
    }
  }, [availableQuizzes, dispatch]);

  useEffect(() => {
    const loadedUserAnswers = loadFromStorage();
    if (loadedUserAnswers) {
      dispatch({
        type: ActionType.SetLoadedAnswers,
        payload: { loadedUserAnswers },
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppDispatchProvider>
          <TopBar />
          <Container maxWidth="sm">
            <Routes>
              <Route
                path="/quiz/:id/questions"
                element={<QuizDetailPage appState={appState} />}
              />
              <Route
                path="/quiz/:id"
                element={<QuizInfoPage appState={appState} />}
              />
              <Route path="/user" element={<UserPage appState={appState} />} />
              <Route path="/" element={<QuizListPage appState={appState} />} />
            </Routes>
          </Container>
        </AppDispatchProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
