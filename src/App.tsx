import { ThemeProvider } from './contexts/ThemeContext';
import Router from './router';

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router />
    </ThemeProvider>
  );
};

export default App;
