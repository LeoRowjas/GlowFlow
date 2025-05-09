import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
      <div className="text-xl font-bold text-gray-800">
        <Link to="/">GlowFlow</Link>
      </div>
      <nav className="flex space-x-6">
        <Link to="/articles" className="px-4 py-2 rounded-lg font-medium text-violet-700 hover:text-violet-900 transition"
                                    style={{background: "#F8F6FF"}} >Статьи</Link>
        <Link to="/test" className="px-4 py-2 rounded-lg font-medium text-violet-700 hover:text-violet-900 transition"
                                    style={{background: "#F8F6FF"}}>Тест</Link>
        <Link to="/login" className="px-4 py-2 rounded-lg font-medium text-violet-700 hover:text-violet-900 transition"
                                    style={{background: "#F8F6FF"}}>Войти</Link>
      </nav>
    </header>
  );
}

export default Header;
