import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/config';
import { USFlag } from '../ui/icons';
import LanguageButton from './LanguageButton';

describe('LanguageButton Component', () => {
  beforeEach(() => {
    // Reset language to English before each test
    i18n.changeLanguage('en');
  });

  it('renders the language button with icon', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageButton language="en" icon={<USFlag />} />
      </I18nextProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'English');
  });

  it('applies active styling when language matches current i18n language', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageButton language="en" icon={<USFlag />} />
      </I18nextProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('ring-2');
    expect(button).toHaveClass('ring-logo-blue');
  });

  it('applies inactive styling when language does not match current i18n language', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageButton language="es" icon={<USFlag />} />
      </I18nextProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('opacity-50');
  });

  it('changes language when clicked', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageButton language="es" icon={<USFlag />} />
      </I18nextProvider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(i18n.language).toBe('es');
  });
});
