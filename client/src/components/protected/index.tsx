import {FC} from 'react';
import Header from '../header';
import {Navigate, Outlet} from 'react-router-dom';
import useUser from '../../hooks/useUser';
import Loader from '../loader';

interface ProtectedProps {
  allowedRoles?: string[];
}

const Protected: FC<ProtectedProps> = ({allowedRoles}) => {
  // access active user data
  const {
    user,
    isLoading,
    error,
  }: {user: any; isLoading: boolean; error: Error | null} = useUser();

  // show loader while user data is loading
  if (isLoading) return <Loader />;

  // redirect to login if role is insufficient
  if (allowedRoles && user?.role && !allowedRoles.includes(user.role))
    return <Navigate to="/login" />;

  // show page content if user data is loaded
  if (user)
    return (
      <div>
        <Header />
        <Outlet />
      </div>
    );

  // redirect to login if user data cannot be loaded
  if (error) return <Navigate to="/login" />;
};

export default Protected;
