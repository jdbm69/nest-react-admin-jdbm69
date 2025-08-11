import { BookOpen, Home, LogOut, Users } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import sideMenuBg from '../../assets/sidemenu-bg.jpg';
import sideLogo from '../../assets/urbano-logo-white.png';
import useAuth from '../../hooks/useAuth';
import authService from '../../services/AuthService';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  className: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const navigate = useNavigate();

  const { authenticatedUser, setAuthenticatedUser } = useAuth();

  const handleLogout = async () => {
    await authService.logout();
    setAuthenticatedUser(null);
    navigate('/login');
  };

  return (
    <div
      className={'sidebar ' + className}
      style={{
        backgroundImage: `url(${sideMenuBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Link to="/" className="no-underline text-black"></Link>
      <img src={sideLogo} alt="urbano" style={{ paddingBottom: '2rem' }} />
      <nav className="mt-5 flex flex-col gap-3 flex-grow items-center">
        <SidebarItem to="/">
          <Home /> Dashboard
        </SidebarItem>
        <SidebarItem to="/courses">
          <BookOpen /> Courses
        </SidebarItem>
        {authenticatedUser.role === 'admin' ? (
          <SidebarItem to="/users">
            <Users /> Users
          </SidebarItem>
        ) : null}
      </nav>
      <button
        className="text-white hover:text-black rounded-md p-3 transition-colors flex gap-3 justify-center items-center font-semibold focus:outline-none"
        onClick={handleLogout}
      >
        <LogOut /> Logout
      </button>
    </div>
  );
}
