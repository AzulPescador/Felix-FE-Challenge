interface TableHeaderProps {
  headers: string[];
  className?: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers, className = '' }) => {
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            className={`px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader; 