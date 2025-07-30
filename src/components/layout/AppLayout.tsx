import { Outlet } from 'react-router';
import Header from '../Header';

const AppLayout = () => {
  return (
    <div className="w-full flex flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
