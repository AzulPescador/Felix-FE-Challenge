import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { UserDetails } from '../../../../types/user';

interface UserDetailsCardProps {
  label: string;
  details: UserDetails | null;
  className?: string;
  icon?: React.ReactNode;
}

const statusColors: Record<string, string> = {
  verified: 'text-green-600',
  pending: 'text-yellow-600',
  unknown: 'text-red-600',
};

const UserDetailsCard: React.FC<UserDetailsCardProps> = ({
  label,
  details,
  className = '',
  icon,
}) => {
  const { t } = useTranslation();
  const verificationStatusKey =
    details?.verification_status?.toLowerCase() || 'unknown';

  return (
    <div
      className={twMerge(
        'p-4 flex flex-col gap-2 border rounded-md shadow-sm bg-white',
        className
      )}
    >
      <div className="flex gap-2 items-center border-b">
        {icon}
        <h3 className="text-sm text-gray-500 font-semibold">{label}</h3>
      </div>

      {details && (
        <div className="text-xs md:text-md space-y-1">
          <p className="font-medium">{details.whatsapp_number || '-'}</p>
          <p>{`${details.first_name} ${details.last_name}`}</p>
          <p className="text-gray-500">
            {t('transaction.modal.country')}: {details.country_code || '-'}
          </p>
          <p className="text-gray-500 flex items-center gap-1">
            {t('transaction.modal.status')}:{' '}
            <span
              className={twMerge(
                'font-semibold',
                statusColors[verificationStatusKey]
              )}
            >
              {t(`user.verification_status.${verificationStatusKey}`)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDetailsCard;
