import { useTranslation } from 'react-i18next';

interface LanguageButtonProps {
  language: 'en' | 'es';
  icon: React.ReactNode;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({ language, icon }) => {
  const { t, i18n } = useTranslation();

  return (
    <button
      onClick={() => i18n.changeLanguage(language)}
      className={`p-1 rounded-md transition-all duration-200 ${
        i18n.language === language
          ? 'ring-2 ring-logo-blue'
          : 'opacity-50 hover:opacity-100'
      }`}
      title={t(`languages.${language === 'en' ? 'english' : 'spanish'}`)}
      aria-label={t(`languages.${language === 'en' ? 'english' : 'spanish'}`)}
    >
      {icon}
    </button>
  );
};

export default LanguageButton;
