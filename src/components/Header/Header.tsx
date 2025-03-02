import { useTranslation } from 'react-i18next';
import { LanguageButton } from '../LanguageButton';
import { USFlag, SpainFlag } from '../ui/flags';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('dashboard.title')}
          </h1>
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