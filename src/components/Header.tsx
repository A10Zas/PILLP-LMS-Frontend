import { Phone, LogOut, MapPin, User } from 'lucide-react';
import ShinyText from './ShinyText';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate();

  // Get current user data from localStorage
  const getCurrentUser = () => {
    try {
      const user =
        localStorage.getItem('user') ||
        localStorage.getItem('partner') ||
        localStorage.getItem('manager') ||
        localStorage.getItem('hr-manager') ||
        localStorage.getItem('hr');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };

  const currentUser = getCurrentUser();

  const handleLogout = () => {
    // Clear all auth-related localStorage items
    ['user', 'partner', 'manager', 'hr-manager', 'hr'].forEach((key) =>
      localStorage.removeItem(key),
    );
    // Redirect to login page
    navigate('/');
  };

  return (
    <>
      <header className="w-full bg-white overflow-hidden sticky top-0 z-10 shadow-md">
        {/* Top info strip - responsive layout */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-2 px-4 flex flex-col sm:flex-row items-center justify-end text-xs sm:text-sm text-gray-600"
        >
          {/* User info and logout button - only shown when logged in */}
          {currentUser && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 mt-2 sm:mt-0"
            >
              <div className="flex items-center gap-1 text-gray-700">
                <User className="w-4 h-4" />
                <span className="font-medium">
                  {currentUser['Employee Name'] ||
                    currentUser['Partner Name'] ||
                    currentUser.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-600 hover:text-red-800 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Main header with logo and company name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="py-4 sm:py-6 px-4 relative"
        >
          <div className="flex flex-col items-center">
            {/* Logo positioned absolutely on larger screens */}
            <motion.img
              src="/plip_logo.png"
              alt="Presidency Infracon LLP Logo"
              className="w-16 h-16 sm:w-20 sm:h-32 absolute left-4 top-1/2 transform -translate-y-1/2 hidden md:block"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            />

            {/* Company name and tagline */}
            <div className="flex flex-col items-center gap-4">
              <motion.div
                className="flex items-center gap-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {/* Mobile logo - centered above text */}
                <motion.img
                  src="/plip_logo.png"
                  alt="Presidency Infracon LLP Logo"
                  className="w-12 h-24 mb-2 md:hidden"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                />
                <div className="flex flex-col items-center gap-2 sm:gap-4">
                  <motion.h1
                    className="text-xl sm:text-4xl md:text-5xl font-bold text-[#ed1c24] text-center tracking-tight"
                    initial={{ letterSpacing: '1em', opacity: 0 }}
                    animate={{ letterSpacing: 'normal', opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    Presidency Infracon LLP
                  </motion.h1>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-sm sm:text-base font-semibold">
                        55, Lela Roy Sarani, Kolkata - 700019
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-sm sm:text-base  font-semibold">
                        +91 9147389854
                      </span>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-1"
                  ></motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Hero banner - responsive padding and text */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, delay: 1.2 }}
        className="w-full bg-[#ed1c24] py-3 sm:py-4 md:py-6 overflow-hidden"
      >
        <div className="relative flex flex-col items-center justify-center space-y-1 sm:space-y-2 text-white px-2 sm:px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <ShinyText
              text="Welcome to Presidency Infracon LLP"
              disabled={false}
              speed={3}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <ShinyText
              text="Leave Management System"
              disabled={false}
              speed={3}
              className="text-sm sm:text-base md:text-lg font-medium text-center"
            />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Header;
