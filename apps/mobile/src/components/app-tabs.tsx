import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { usePathname } from 'expo-router';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
  // TODO: Remove this demo-only tab hiding when the final app navigation replaces
  // CalendarLogScreen's compact Home / Explore / Log UI row.
  const isLoggingDemo = usePathname() === '/logging-demo';

  return (
    <NativeTabs
      hidden={isLoggingDemo}
      backgroundColor={colors.background}
      indicatorColor="transparent"
      tintColor={colors.tabActive}
      iconColor={{ default: colors.tabInactive, selected: colors.tabActive }}
      labelStyle={{
        default: { color: colors.tabInactive },
        selected: { color: colors.tabActive },
      }}>
      <NativeTabs.Trigger name="learn">
        <NativeTabs.Trigger.Label>Learn</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="info.circle" md="info" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="gearshape" md="settings" />
      </NativeTabs.Trigger>

      {/* Temporarly added this to view the grid. Aim to integrate with Jadyn's learn page */}
      <NativeTabs.Trigger name="product-grid">
        <NativeTabs.Trigger.Label>Products</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      {/* TODO: Remove this demo entry when logging is reachable from the real calendar route. */}
      <NativeTabs.Trigger name="logging-demo">
        <NativeTabs.Trigger.Label>Log UI</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="calendar" md="calendar_month" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}