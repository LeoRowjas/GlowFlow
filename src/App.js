import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <AuthProvider>
    <Router>
      <MainLayout />
    </Router>
    </AuthProvider>
  );
}

export default App;

