import { useTranslation } from 'react-i18next';
import { LanguageButton } from '../LanguageButton';
import { USFlag, SpainFlag } from '../ui/icons';
import Logo from '../Logo/Logo';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Logo width="120px" height="32px" className="text-gray-900" />
            <h1 className="text-3xl font-semibold text-logo-blue hidden sm:block mt-2">
              {t('dashboard.title')}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageButton language="en" icon={<USFlag />} />
            <LanguageButton language="es" icon={<SpainFlag />} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
