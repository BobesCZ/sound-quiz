import { useReducer } from 'react';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { deepPurple, orange } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';
import QuizDetailPage from './components/QuizDetailPage';
import TopBar from './components/TopBar';
import AppDispatch from './context/AppDispatch';
import initialState from './context/initialState';
import reducer from './context/reducer';

function App() {
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppDispatch.Provider value={dispatch}>
        <TopBar />
        <Container maxWidth="sm">
          <QuizDetailPage appState={appState} />
        </Container>
      </AppDispatch.Provider>
    </ThemeProvider>
  );
}

export default App;
