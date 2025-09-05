import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../src/screens/Home';
import { AppNavigationProps } from '../src/types/navigation';

const AllProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <NavigationContainer>{children}</NavigationContainer>;

const nav = {} as AppNavigationProps;

jest.mock('../src/hooks', () => ({
  useSession: () => ({ user: { display_name: 'John Doe', locale: 'en' } }),
  useBoards: () => ({ boards: [{ id: '1', title: 'Groceries' }] }),
  useProgress: () => ({ progress: 0.42, isLoading: false }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn().mockResolvedValue(undefined) },
  }),
}));

describe('Home screen', () => {
  it('renders greeting with user name', () => {
    const { getByText } = render(<Home navigation={nav} />, {
      wrapper: AllProviders,
    });
    expect(getByText('John Doe')).toBeTruthy();
  });

  it('renders boards list', () => {
    const { getByText } = render(<Home navigation={nav} />, {
      wrapper: AllProviders,
    });
    expect(getByText('Groceries')).toBeTruthy();
  });
});
