import {FC, useEffect, useRef, useState} from 'react';
import useUser from '../../hooks/useUser';
import useShoes from '../../hooks/useShoes';
import {FaSearch, FaShoppingCart, FaUserCircle} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {useCart} from '../../context/cart';

const UserInfo: FC = () => {
  const {user} = useUser();
  const {logout} = useAuth();
  const {items} = useCart();
  const {shoes} = useShoes();
  const {data: allShoes} = shoes();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLButtonElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const isAdmin = user?.role === 'admin';

  const filteredShoes = searchQuery
    ? allShoes?.filter(shoe =>
        shoe.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSearchItemClick = (id: string) => {
    navigate(`/shoe/${id}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleAdminClick = () => {
    alert(
      'Admin users cannot perform shopping actions. Please use a customer account.',
    );
  };

  return (
    <div className="flex items-center gap-6">
      {/* Search */}
      <div ref={searchRef} className="relative">
        <button
          onClick={
            isAdmin ? handleAdminClick : () => setIsSearchOpen(!isSearchOpen)
          }
          className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
            isAdmin ? 'text-gray-400 cursor-not-allowed' : ''
          }`}>
          <FaSearch className="w-5 h-5" />
        </button>

        {!isAdmin && isSearchOpen && (
          <div className="absolute top-12 -right-4 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#4263EB]"
                autoFocus
              />
            </form>

            {searchQuery && filteredShoes && filteredShoes.length > 0 && (
              <div className="mt-4 max-h-64 overflow-auto">
                {filteredShoes.map(shoe => (
                  <div
                    key={shoe._id}
                    onClick={() => handleSearchItemClick(shoe._id)}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <img
                      src={`${import.meta.env.BASE_URL}${shoe.picture[0]}`}
                      alt={shoe.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{shoe.name}</h3>
                      <p className="text-sm text-gray-500">${shoe.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cart */}
      <div className="relative">
        {isAdmin ? (
          <button
            onClick={handleAdminClick}
            className="p-2 rounded-full text-gray-400 cursor-not-allowed">
            <FaShoppingCart className="w-5 h-5" />
          </button>
        ) : (
          <Link
            to="/cart"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
            <FaShoppingCart className="w-5 h-5" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#4263EB] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
        )}
      </div>

      {/* User Menu */}
      <div className="relative">
        <button
          ref={dropdownRef}
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <FaUserCircle className="w-5 h-5" />
        </button>

        {isOpen && (
          <div className="absolute top-12 right-0 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm text-gray-500">Signed in as</p>
              <p className="font-medium text-gray-900 truncate">
                {user?.firstName} {user?.lastName}
              </p>
            </div>

            {isAdmin && (
              <Link
                to="/admin"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Dashboard
              </Link>
            )}

            <button
              onClick={() => logout.mutate()}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
