import { View, type ViewProps } from 'react-native';

import { theme, type ThemeColorName } from '@/constants/theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColorName;
};

export function ThemedView({ style, type, ...otherProps }: ThemedViewProps) {
  return <View style={[{ backgroundColor: theme.colors[type ?? 'background'] }, style]} {...otherProps} />;
}
