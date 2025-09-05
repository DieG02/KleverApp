import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DeleteAccount from '../src/screens/DeleteAccount';

// Mock navigation
const mockGoBack = jest.fn();
const mockDispatch = jest.fn();

const navigation: any = {
  goBack: mockGoBack,
  dispatch: mockDispatch,
};

// Mock hooks/services
jest.mock('../src/hooks', () => ({
  useSession: () => ({ user: { provider: 'email' } }),
}));
jest.mock('../src/context/LoadingContext', () => ({
  useLoading: () => ({ setLoading: jest.fn() }),
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));
jest.mock('../src/services/firestore/auth', () => ({
  ReauthenticateUser: jest.fn().mockResolvedValue({ success: true }),
}));
jest.mock('../src/services/firestore/user', () => ({
  deleteUserData: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('@react-native-firebase/auth', () => ({
  getAuth: () => ({ currentUser: { uid: '123', providerData: [{}] } }),
}));

describe('DeleteAccount: Auth with Credentials', () => {
  it('renders warning checkbox and toggles it', () => {
    const { getByText, queryByTestId, getByTestId } = render(
      <DeleteAccount
        navigation={navigation}
        route={{ key: '1', name: 'DeleteAccount' }}
      />,
    );
    // Icon is hidden
    expect(queryByTestId('check-icon')).toBeNull();

    const checkbox = getByTestId('warning-checkbox');
    fireEvent.press(checkbox);

    // Icon is visible
    expect(getByTestId('check-icon')).toBeTruthy();

    // Display confirm button
    const label = getByText('account.offboarding.confirm');
    expect(label).toBeTruthy();
  });

  it('disables confirm button when password is empty', () => {
    const { getByTestId, queryByTestId } = render(
      <DeleteAccount
        navigation={navigation}
        route={{ key: '1', name: 'DeleteAccount' }}
      />,
    );
    // Toggle Checkbox
    const checkbox = getByTestId('warning-checkbox');
    fireEvent.press(checkbox);

    const password = getByTestId('password-field');
    expect(password.props.value).toBe('');

    const label = queryByTestId('btn-delete');
    expect(label?.props.accessibilityState.disabled).toBe(true);
  });

  it('allows entering password and calls delete flow', async () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(
      <DeleteAccount
        navigation={navigation}
        route={{ key: '1', name: 'DeleteAccount' }}
      />,
    );
    // Toggle Checkbox
    const checkbox = getByTestId('warning-checkbox');
    fireEvent.press(checkbox);

    const placeholder = getByPlaceholderText(
      'account.offboarding.delete.placeholder',
    );
    fireEvent.changeText(placeholder, 'secret123');

    const label = getByText('account.offboarding.confirm');
    fireEvent.press(label);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
