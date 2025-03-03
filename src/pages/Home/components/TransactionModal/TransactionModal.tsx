'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Transaction } from '../../../../types/transaction';
import type { UserDetails } from '../../../../types/user';
import useClickOutside from '../../../../hooks/useClickOutside';
import useKeyPress from '../../../../hooks/useKeyPress';
import CloseButton from '../../../../components/ui/buttons/CloseButton';
import StatusSteps from '../TransactionStatus/StatusSteps';
import UserDetailsCard from '../UserDetailsCard/UserDetailsCard';
import TransferDetails from '../TransactionDetails/TransferDetails';
import PaymentDetails from '../TransactionDetails/PaymentDetails';
import LoadingSpinner from '../../../../components/ui/loading/LoadingSpinner';
import {
  ReceiveIcon,
  SendIcon,
  ShareIcon,
} from '../../../../components/ui/icons';
import TransactionPDF from '../TransactionPDF/TransactionPDF';
import Button from '../../../../components/ui/buttons/Button';

interface TransactionModalProps {
  transaction: Transaction;
  senderDetails: UserDetails | null;
  receiverDetails: UserDetails | null;
  onClose: () => void;
  isLoadingDetails: boolean;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  transaction,
  senderDetails,
  receiverDetails,
  onClose,
  isLoadingDetails,
}) => {
  const { t } = useTranslation();
  const modalRef = useClickOutside<HTMLDivElement>(onClose);
  useKeyPress('Escape', onClose);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleShare = () => {
    if (pdfUrl) {
      const message = encodeURIComponent(
        `Check out this transaction details: ${pdfUrl}`
      );
      window.open(`https://wa.me/?text=${message}`, '_blank');
    }
  };

  const handlePDFGenerated = (url: string) => {
    setPdfUrl(url);
  };

  if (isLoadingDetails) {
    return <LoadingSpinner />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              {t('transaction.modal.title')}
            </h2>
            <p className="text-sm text-gray-500">
              {t('transaction.modal.id')}: {transaction.transaction_id}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
            <TransactionPDF
              transaction={transaction}
              senderDetails={senderDetails}
              receiverDetails={receiverDetails}
              onPDFGenerated={handlePDFGenerated}
            />
            <Button
              icon={<ShareIcon />}
              onClick={handleShare}
              className="bg-green-500 hover:bg-green-600 max-w-28 md:max-w-full"
            >
              <span className="text-xs md:text-sm">
                {t('transaction.modal.share_whatsapp')}
              </span>
            </Button>
          </div>
          <CloseButton onClick={onClose} />
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-500 mb-3">
              {t('transaction.modal.contact_details')}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <UserDetailsCard
                label={t('transaction.modal.sender')}
                details={senderDetails}
                icon={<SendIcon />}
              />
              <UserDetailsCard
                label={t('transaction.modal.receiver')}
                details={receiverDetails}
                icon={<ReceiveIcon />}
              />
            </div>
          </div>

          <TransferDetails
            amountSent={transaction.amount_sent}
            amountReceived={transaction.amount_received}
            fee={transaction.fee}
            exchangeRate={transaction.exchange_rate}
            currencyReceived={transaction.currency_received}
          />

          <PaymentDetails
            method={transaction.payment_method}
            details={transaction.payment_details}
          />

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-500 mb-4">
              {t('transaction.modal.status_tracking')}
            </h3>
            <StatusSteps currentStatus={transaction.status} />
          </div>

          <div className="text-right text-sm text-gray-500">
            {t('transaction.modal.transaction_date')}:{' '}
            {new Date(transaction.date).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
