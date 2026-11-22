import { MD3LightTheme } from 'react-native-paper';

import { LoggingColors } from '@/constants/theme';

// Preserve the embedded calendar's previous inherited theme. Calendar styling
// belongs to #43; the logger's Paper theme must not restyle its Today button.
export const calendarTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: LoggingColors.action,
    onPrimary: LoggingColors.surface,
    onSurface: LoggingColors.text,
    onSurfaceVariant: LoggingColors.muted,
    surface: LoggingColors.surface,
    background: LoggingColors.background,
    surfaceVariant: LoggingColors.disabled,
    onSurfaceDisabled: LoggingColors.muted,
    surfaceDisabled: LoggingColors.disabled,
    backdrop: 'rgba(0,0,0,0.32)',
    elevation: { level0: 'transparent', level1: '#FFFFFF', level2: '#FFFFFF', level3: '#FFFFFF', level4: '#FFFFFF', level5: '#FFFFFF' },
  },
};
