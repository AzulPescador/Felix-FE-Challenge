interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

const TableCell: React.FC<TableCellProps> = ({ children, className = '' }) => {
  return (
    <td className={`whitespace-nowrap px-6 py-4 ${className}`}>
      {children}
    </td>
  );
};

export default TableCell; 