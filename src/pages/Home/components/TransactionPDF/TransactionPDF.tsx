import type React from 'react';
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import type { Transaction } from '../../../../types/transaction';
import type { UserDetails } from '../../../../types/user';
import Button from '../../../../components/ui/buttons/Button';
import { DownloadIcon } from '../../../../components/ui/icons';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  section: {
    margin: 2,
    padding: 2,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 4,
  },
  text: {
    fontSize: 12,
    marginBottom: 2,
  },
});

const TransactionPDFDocument = ({
  transaction,
  senderDetails,
  receiverDetails,
}: {
  transaction: Transaction;
  senderDetails: UserDetails | null;
  receiverDetails: UserDetails | null;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Transaction Details</Text>
        <Text style={styles.text}>
          Transaction ID: {transaction.transaction_id}
        </Text>
        <Text style={styles.text}>Status: {transaction.status}</Text>
        <Text style={styles.text}>Amount Sent: {transaction.amount_sent}</Text>
        <Text style={styles.text}>
          Amount Received: {transaction.amount_received}
        </Text>
        <Text style={styles.text}>Fee: {transaction.fee}</Text>
        <Text style={styles.text}>
          Exchange Rate: {transaction.exchange_rate}
        </Text>
        <Text style={styles.text}>
          Date: {new Date(transaction.date).toLocaleString()}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Sender Details</Text>
        <Text style={styles.text}>
          Name: {senderDetails?.first_name} {senderDetails?.last_name}
        </Text>
        <Text style={styles.text}>
          Number: {senderDetails?.whatsapp_number}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Receiver Details</Text>
        <Text style={styles.text}>
          Name: {receiverDetails?.first_name} {receiverDetails?.last_name}
        </Text>
        <Text style={styles.text}>
          Number: {receiverDetails?.whatsapp_number}
        </Text>
      </View>
    </Page>
  </Document>
);

interface TransactionPDFProps {
  transaction: Transaction;
  senderDetails: UserDetails | null;
  receiverDetails: UserDetails | null;
  onPDFGenerated: (url: string) => void;
}

const TransactionPDF: React.FC<TransactionPDFProps> = ({
  transaction,
  senderDetails,
  receiverDetails,
  onPDFGenerated,
}) => {
  const { t } = useTranslation();

  return (
    <PDFDownloadLink
      document={
        <TransactionPDFDocument
          transaction={transaction}
          senderDetails={senderDetails}
          receiverDetails={receiverDetails}
        />
      }
      fileName={`transaction_${transaction.transaction_id}.pdf`}
    >
      {({ url, loading }) => {
        if (!loading && url) {
          onPDFGenerated(url);
        }
        return loading ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            disabled
          >
            Loading document...
          </button>
        ) : (
          <Button icon={<DownloadIcon />}>
            {t('transaction.modal.download_pdf')}
          </Button>
        );
      }}
    </PDFDownloadLink>
  );
};

export default TransactionPDF;
