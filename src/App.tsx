import { useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { deepPurple, orange } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';
import QuizDetailPage from './components/QuizDetailPage';
import QuizInfoPage from './components/QuizInfoPage';
import QuizListPage from './components/QuizListPage';
import TopBar from './components/TopBar';
import UserPage from './components/UserPage';
import { AppDispatchProvider } from './context/AppDispatchProvider';
import initialState from './context/initialState';
import reducer from './context/reducer';
import quizzes from './data/quizzes';
import { loadFromStorage } from './utils/storage';
import { ActionType } from './types/action';

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
    }
  });

  const availableQuizzes = appState.availableQuizzes;

  useEffect(() => {
    if (!Object.keys(availableQuizzes || []).length) {
      dispatch({ type: ActionType.SetAvailableQuizzes, payload: { quizzes } });
    }
  }, [availableQuizzes, dispatch])

  useEffect(() => {
    const loadedUserAnswers = loadFromStorage();
    if (loadedUserAnswers) {
      dispatch({ type: ActionType.SetLoadedAnswers, payload: { loadedUserAnswers } });
    }
  }, [])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppDispatchProvider>
          <TopBar />
          <Container maxWidth="sm">
            <Switch>
              <Route path="/quiz/:id/questions">
                <QuizDetailPage appState={appState} />
              </Route>
              <Route path="/quiz/:id">
                <QuizInfoPage appState={appState} />
              </Route>
              <Route path="/user">
                <UserPage appState={appState} />
              </Route>
              <Route path="/">
                <QuizListPage appState={appState} />
              </Route>
            </Switch>
          </Container>
        </AppDispatchProvider>
      </ThemeProvider>
    </Router>
  );
}
