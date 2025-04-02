// get active user data
// hook makes API request and gets user data when the component using it is rendered

import {useQuery} from '@tanstack/react-query';
import authApi from '../service/auth';

const useUser = () => {
  const {data, isLoading, error} = useQuery({
    queryKey: ['user'],
    queryFn: () => authApi.getMe(),
    retry: false,
    select: data => data.data.user,
  });

  return {user: data, isLoading, error};
};

export default useUser;


