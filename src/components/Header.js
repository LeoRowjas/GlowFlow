import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const handleAvatarClick = (e) => {
    e.preventDefault();
    navigate('/profile');
  };

  return (
    <header className="flex justify-between items-center px-16 py-8 border-b-2 border-gray-200 bg-white shadow-md text-3xl">
      <div className="text-4xl font-extrabold text-gray-800">
        <Link to="/">GlowFlow</Link>
      </div>
      <nav className="flex space-x-4 items-center">
        <Link to="/articles" className="px-4 py-2 rounded-2xl font-bold text-violet-700 hover:text-violet-900 transition text-base" style={{background: "#F8F6FF"}}>Статьи</Link>
        <Link to="/test" className="px-4 py-2 rounded-2xl font-bold text-violet-700 hover:text-violet-900 transition text-base" style={{background: "#F8F6FF"}}>Тест на тип кожи</Link>
        {isAuthenticated ? (
          <div onClick={handleAvatarClick} className="flex items-center cursor-pointer ml-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-lg border-2 border-violet-200">
              200×200
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="ml-2 px-4 py-2 rounded-2xl font-bold text-white bg-violet-700 hover:bg-violet-800 transition text-base shadow"
          >
            Войти
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
