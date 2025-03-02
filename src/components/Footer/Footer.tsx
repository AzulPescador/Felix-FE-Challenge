interface FooterProps {
  className: string;
}
const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-white shadow py-4 ${className}`}>
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-600">
          © {currentYear} Félix Pago. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
