import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserDetails } from '../types/user';
import { fetchServer } from '../services/utils/fetchServer';

interface UserResult {
  user: UserDetails | null;
}

const getUserByWhatsappEndpoint = (whatsappNumber: string) => {
  const formattedNumber = whatsappNumber.replace('+', '');
  return `/user?whatsapp_number=${formattedNumber}`;
};

const useGetUserByWhatsappNumber = (
  whatsappNumber: string
): UseQueryResult<UserResult, Error> => {
  return useQuery({
    queryKey: ['user', whatsappNumber],
    queryFn: async () => {
      const result = await fetchServer({
        method: 'GET',
        url: getUserByWhatsappEndpoint(whatsappNumber),
        useToken: true,
      });
      return { user: result.length > 0 ? result[0] : null };
    },
    enabled: !!whatsappNumber,
  });
};

export default useGetUserByWhatsappNumber;
