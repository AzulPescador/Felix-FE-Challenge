import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/config';
import Header from './Header';

describe('Header Component', () => {
  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <Header />
      </I18nextProvider>
    );
  });

  it('renders the logo', () => {
    const logo = screen.getByRole('logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the dashboard title', () => {
    const title = screen.getByRole('heading', {
      name: /Remittance Dashboard/i,
    });
    expect(title).toBeInTheDocument();
  });

  it('renders language buttons', () => {
    const englishButton = screen.getByLabelText('English');
    const spanishButton = screen.getByLabelText('Español');
    expect(englishButton).toBeInTheDocument();
    expect(spanishButton).toBeInTheDocument();
  });

  it('changes language when clicking on language buttons', async () => {
    const englishButton = screen.getByLabelText('English');
    const spanishButton = screen.getByLabelText('Español');

    fireEvent.click(spanishButton);
    expect(i18n.language).toBe('es');

    fireEvent.click(englishButton);
    expect(i18n.language).toBe('en');
  });
});
