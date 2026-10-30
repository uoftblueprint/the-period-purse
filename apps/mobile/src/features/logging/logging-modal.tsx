import { useEffect, useRef, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { useReducedMotion } from 'react-native-reanimated';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

import { LoggingColors } from '@/constants/theme';

import { DailySymptoms, type DailySymptomsHandle } from './symptoms/daily-symptoms';
import { LoggingOptionsOverlay } from './launcher/logging-options-overlay';

export type LoggingMode = 'choose' | 'symptoms' | null;
type Props = { mode: LoggingMode; initialDate: string; onClose: () => void; onDaily: () => void };

// A single native Modal avoids presenting a second modal while the chooser dismisses.
// Its own Paper host keeps discard dialogs above the form, with neutral defaults.
// TODO: Use the shared app theme once issue #3's styling is approved. Keep the
// modal's own Paper/Portal host so discard dialogs stay above its native content.
const theme = {
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

export function LoggingModal({ mode, initialDate, onClose, onDaily }: Props) {
  const form = useRef<DailySymptomsHandle>(null);
  const [presentedMode, setPresentedMode] = useState(mode);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (mode !== null) setPresentedMode(mode);
  }, [mode]);

  // Keep the outgoing content mounted while the native modal fades away.
  // Clearing it immediately would turn the dismissal into an abrupt disappearance.
  const contentMode = mode ?? presentedMode;

  return (
    <Modal
      transparent
      visible={mode !== null}
      animationType={reducedMotion ? 'none' : 'fade'}
      onDismiss={() => { if (mode === null) setPresentedMode(null); }}
      onRequestClose={() => {
        if (mode === null) return;
        if (mode === 'symptoms' && form.current) form.current.requestClose();
        else onClose();
      }}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <PaperProvider theme={theme}>
          <View style={styles.content} pointerEvents={mode === null ? 'none' : 'auto'}>
            {contentMode === 'symptoms' ? (
              <DailySymptoms ref={form} initialDate={initialDate} onClose={onClose} />
            ) : contentMode === 'choose' ? (
              <LoggingOptionsOverlay onClose={onClose} onDaily={onDaily} />
            ) : null}
          </View>
        </PaperProvider>
      </SafeAreaProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1 },
});
