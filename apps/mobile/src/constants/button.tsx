import type { ComponentProps } from 'react';

import { Button } from 'react-native-paper';

type AppButtonProps = ComponentProps<typeof Button>;

export function AppButton({ style, ...props }: AppButtonProps) {
  return <Button style={[{ borderRadius: 999 }, style]} {...props} />;
}