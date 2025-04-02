import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import shoeApi from '../service/shoe';
import {ShoeFormValues} from '../types';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const useShoes = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const shoes = () =>
    useQuery({
      queryKey: ['shoes'],
      queryFn: () => shoeApi.getAll(),
      select: data => data.data,
    });

  const shoe = (id: string) =>
    useQuery({
      queryKey: ['shoe', id],
      queryFn: () => shoeApi.getById(id),
      select: data => data.data,
    });

  const create = useMutation({
    mutationKey: ['create-shoe'],
    mutationFn: (data: ShoeFormValues) => shoeApi.create(data),
    onSuccess: () => {
      // update cache when new data is created
      // invalidate query with shoes key
      queryClient.invalidateQueries({queryKey: ['shoes']});
      navigate('/admin');
      toast.success('Product created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response.data?.message || 'An error occurred');
    },
  });

  const update = useMutation({
    mutationKey: ['update-shoe'],
    mutationFn: ({id, data}: {id: string; data: Partial<ShoeFormValues>}) =>
      shoeApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['shoes']});
      navigate('/admin');
      toast.success('Product updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response.data?.message || 'An error occurred');
    },
  });

  const remove = useMutation({
    mutationKey: ['remove-shoe'],
    mutationFn: (id: string) => shoeApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['shoes']});
      toast.success('Product deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response.data?.message || 'An error occurred');
    },
  });

  return {shoes, shoe, create, update, remove};
};

export default useShoes;
