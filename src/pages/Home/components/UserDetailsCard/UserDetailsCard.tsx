import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { UserDetails } from '../../../../types/user';

interface UserDetailsCardProps {
  label: string;
  details: UserDetails | null;
  className?: string;
}

const getStatusClass = (status?: string) => {
  switch (status) {
    case 'Verified':
      return 'text-green-600';
    case 'Pending':
      return 'text-yellow-600';
    default:
      return 'text-red-600';
  }
};

const UserDetailsCard: React.FC<UserDetailsCardProps> = ({
  label,
  details,
  className = '',
}) => {
  const { t } = useTranslation();
  const verificationStatusKey = details?.verification_status?.toLowerCase() || 'unknown';

  return (
    <div className={twMerge('p-4 border rounded-md shadow-sm bg-white', className)}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{details?.whatsapp_number || '-'}</p>

      {details && (
        <div className="mt-2 text-sm">
          <p>{details.first_name} {details.last_name}</p>
          <p className="text-gray-500">
            {t('transaction.modal.country')}: {details.country_code || '-'}
          </p>
          <p className="text-gray-500">
            {t('transaction.modal.status')}:
            <span className={twMerge('font-semibold', getStatusClass(details.verification_status))}>
              {t(`user.verification_status.${verificationStatusKey}`)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDetailsCard;
