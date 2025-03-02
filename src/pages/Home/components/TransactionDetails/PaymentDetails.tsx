import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import DetailSection from '../Details/DetailSection';
import DetailRow from '../Details/DetailRow';
import { PAYMENT_METHODS } from '../../../../constants/transaction.constants';

interface PaymentDetailsProps {
  method: string;
  details?: string;
  className?: string;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  method,
  details,
  className = '',
}) => {
  const { t } = useTranslation();

  const formatPaymentMethod = (method: string) => {
    if (!method) return t('payment.methods.unknown');

    const normalizedMethod = method.trim().toUpperCase().replace(/\s+/g, '_');

    if (PAYMENT_METHODS[normalizedMethod]) {
      return t(`payment.methods.${normalizedMethod.toLowerCase()}`);
    }

    return normalizedMethod
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <DetailSection
      title={t('transaction.modal.payment_details')}
      className={twMerge(className)}
    >
      <div className="space-y-2">
        <DetailRow
          label={t('transaction.modal.method')}
          value={formatPaymentMethod(method)}
        />
        {details && (
          <DetailRow
            label={t('transaction.modal.additional_details')}
            value={details}
          />
        )}
      </div>
    </DetailSection>
  );
};

export default PaymentDetails;
