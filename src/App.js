import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Profile from './pages/Profile';
import Test from './pages/Test';
import Articles from './pages/Articles';
import Login from './pages/Login';
import Product from './pages/Product';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/test" element={<Test />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

