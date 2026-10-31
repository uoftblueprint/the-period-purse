import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { usePathname } from 'expo-router';

import { theme } from '@/constants/theme';

export default function AppTabs() {
  const colors = theme.colors;
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
      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Learn</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      {/* TODO: Remove this temporary Cycle tab once cycle tracking is integrated into the final navigation. */}
      <NativeTabs.Trigger name="cycle">
        <NativeTabs.Trigger.Label>Cycle</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="calendar" md="calendar_month" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="gearshape" md="settings" />
      </NativeTabs.Trigger>

      {/* TODO: Remove this demo entry when logging is reachable from the real calendar route. */}
      <NativeTabs.Trigger name="logging-demo">
        <NativeTabs.Trigger.Label>Log UI</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="calendar" md="calendar_month" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}