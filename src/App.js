import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Profile from './pages/Profile';
import Test from './pages/Test';
import Articles from './pages/Articles';
import Login from './pages/Login';
import Product from './pages/Product';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <Header />
        <main className="p-6 flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/test" element={<Test />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

