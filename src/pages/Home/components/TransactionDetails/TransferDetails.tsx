import { useTranslation } from 'react-i18next';
import DetailSection from '../Details/DetailSection';
import DetailRow from '../Details/DetailRow';

interface TransferDetailsProps {
  amountSent: number;
  amountReceived: number;
  fee: number;
  exchangeRate: number;
  currencyReceived: string;
  className?: string;
}

const TransferDetails: React.FC<TransferDetailsProps> = ({
  amountSent,
  amountReceived,
  fee,
  exchangeRate,
  currencyReceived,
  className = ''
}) => {
  const { t } = useTranslation();

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return currency === 'USD' ? `$${amount.toFixed(2)} ${currency}` : `${amount.toFixed(2)} ${currency}`;
  };

  return (
    <DetailSection 
      title={t('transaction.modal.transfer_breakdown')}
      className={className}
    >
      <div className="space-y-3">
        <DetailRow
          label={t('transaction.modal.amount_sent')}
          value={formatCurrency(amountSent)}
        />
        <DetailRow
          label={t('transaction.modal.transfer_fee')}
          value={formatCurrency(fee)}
        />
        <DetailRow
          label={t('transaction.modal.exchange_rate')}
          value={`1 USD = ${exchangeRate.toFixed(4)} ${currencyReceived}`}
        />
        <DetailRow
          label={t('transaction.modal.total_received')}
          value={formatCurrency(amountReceived, currencyReceived)}
          isTotal
        />
      </div>
    </DetailSection>
  );
};

export default TransferDetails; 