import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="flex justify-between items-center px-16 py-8 border-b-2 border-gray-200 bg-white shadow-md text-3xl">
      <div className="text-4xl font-extrabold text-gray-800">
        <Link to="/">GlowFlow</Link>
      </div>
      <nav className="flex space-x-12">
        <Link to="/articles" className="px-8 py-4 rounded-2xl font-bold text-violet-700 hover:text-violet-900 transition text-2xl"
                                    style={{background: "#F8F6FF"}} >Статьи</Link>
        <Link to="/test" className="px-8 py-4 rounded-2xl font-bold text-violet-700 hover:text-violet-900 transition text-2xl"
                                    style={{background: "#F8F6FF"}}>Тест</Link>
        <Link to="/login" className="px-8 py-4 rounded-2xl font-bold text-violet-700 hover:text-violet-900 transition text-2xl"
                                    style={{background: "#F8F6FF"}}>Войти</Link>
      </nav>
    </header>
  );
}

export default Header;
