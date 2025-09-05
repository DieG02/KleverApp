import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { render } from '@testing-library/react-native';
import Collection from '../src/screens/Collection';
import { Platform } from 'react-native';

jest.mock('../src/hooks', () => ({
  useCollection: jest.fn(),
}));

jest.mock('../src/components', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    Item: jest.fn(({ item }) =>
      React.createElement(Text, { testID: `item` }, item.label),
    ),
    TextInputCollection: jest.fn(() =>
      React.createElement(Text, { testID: 'input-collection' }, ''),
    ),
  };
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn().mockResolvedValue(undefined) },
  }),
}));

jest.mock('@react-navigation/elements', () => ({
  useHeaderHeight: jest.fn(() => 110), // iPhone 14 pro header
}));

const mockRoute = { params: { id: 'board-123' } } as any;

const insetMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, right: 0, bottom: 34, left: 0 },
};

describe('Collection screen', () => {
  afterEach(() => jest.clearAllMocks());

  it('renders list when items exist', () => {
    const { useCollection } = require('../src/hooks');
    useCollection.mockReturnValue({
      items: [
        { id: '1', label: 'Milk', checked: false, parent_id: 'board-123' },
        { id: '2', label: 'Orange', checked: true, parent_id: 'board-123' },
        { id: '4', label: 'Juice', checked: true, parent_id: 'board-123' },
      ],
    });

    const { getByTestId, getAllByTestId } = render(
      <SafeAreaProvider initialMetrics={insetMetrics}>
        <Collection route={mockRoute} navigation={{} as any} />
      </SafeAreaProvider>,
    );

    expect(getByTestId('keyboard-controller')).toBeTruthy(); // wrapper exists
    expect(getAllByTestId('item')).toHaveLength(3); // Item rendered
  });

  it('applies safe-area insets and header height', () => {
    const { useCollection } = require('../src/hooks');
    useCollection.mockReturnValue({ items: [] });

    const { getByTestId } = render(
      <SafeAreaProvider initialMetrics={insetMetrics}>
        <Collection route={mockRoute} navigation={{} as any} />
      </SafeAreaProvider>,
    );

    const kav = getByTestId('keyboard-controller');
    expect(kav).toHaveProp('behavior');

    expect(kav.props.keyboardVerticalOffset).toBeTruthy();
    expect(kav.props.behavior).toBe(
      Platform.OS === 'ios' ? 'padding' : undefined,
    );
  });
});
