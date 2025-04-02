import {FC} from 'react';
import {Link} from 'react-router-dom';
import UserInfo from './user-info';

const Header: FC = () => {
  return (
    <header className="bg-gradient-to-b from-white to-gray-50 sticky top-0 z-50 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between h-16 px-4">
          {/* Left Navigation */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-nowrap font-medium text-gray-800 hover:text-[#4263EB] transition-colors">
              New Drops 🔥
            </Link>
            <Link
              to="/#men"
              className="font-medium text-gray-800 hover:text-[#4263EB] transition-colors">
              Men
            </Link>
            <Link
              to="/#women"
              className="font-medium text-gray-800 hover:text-[#4263EB] transition-colors">
              Women
            </Link>
          </div>

          {/* Center Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img src="/logo.svg" alt="KICKS" className="h-8 w-auto" />
          </Link>

          {/* Right Section */}
          <div className="flex items-center">
            <UserInfo />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
