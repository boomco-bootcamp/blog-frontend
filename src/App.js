import { UserProvider } from './context/UserContext';
import Router from './router/Router';


function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}

export default App;

