import { Children, isValidElement } from 'react';
import { NativeTabs } from 'expo-router/unstable-native-tabs';

import AppTabs from './app-tabs';

jest.mock('expo-router', () => ({ usePathname: () => '/learn' }));

it('registers each native tab screen once so the navigator can mount', () => {
  const names = Children.toArray(AppTabs().props.children)
    .filter((child) => isValidElement<{ name: string }>(child) && child.type === NativeTabs.Trigger)
    .map((child) => isValidElement<{ name: string }>(child) ? child.props.name : undefined);

  expect(names).toContain('logging-demo');
  expect(names.filter((name) => name === 'settings')).toHaveLength(1);
  expect(new Set(names).size).toBe(names.length);
});
