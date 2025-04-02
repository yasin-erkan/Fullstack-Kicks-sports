import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import authApi from '../service/auth';
import {LoginValues, RegisterValues} from '../types';
import {toast} from 'react-toastify';

// Custom Hook - Our own hooks
// useAuth hook allows us to perform all auth-related operations
const useAuth = () => {
  const navigate = useNavigate();

  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginValues) => authApi.login(data),
    onSuccess: () => {
      navigate('/');
      toast.success('Login successful');
    },
    onError: (error: any) => {
      toast.error(error.response.data?.message || 'An error occurred');
    },
  });

  const register = useMutation({
    mutationKey: ['register'],
    mutationFn: (data: RegisterValues) => authApi.register(data),
    onSuccess: () => {
      navigate('/');
      toast.success('Registration successful');
    },
    onError: (error: any) => {
      toast.error(error.response.data?.message || 'An error occurred');
    },
  });

  const logout = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      navigate('/login');
      toast.success('Logout successful');
    },
    onError: (error: any) => {
      toast.error(error.response.data?.message || 'An error occurred');
    },
  });

  return {
    login,
    register,
    logout,
  };
};

export default useAuth;
