import { useEffect, useRef, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { PaperProvider, useTheme } from 'react-native-paper';
import { useReducedMotion } from 'react-native-reanimated';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

import type { AppTheme } from '@/constants/theme';

import { DailySymptoms } from './symptoms/daily-symptoms';
import { LoggingOptionsOverlay } from './launcher/logging-options-overlay';
import { PeriodDateSelector } from './period-dates/period-date-selector';

export type LoggingMode = 'choose' | 'symptoms' | 'period-dates' | null;
type Props = {
  mode: LoggingMode;
  initialDate: string;
  onClose: () => void;
  onDaily: () => void;
  onPeriodDates: () => void;
};

// A single native Modal avoids presenting a second modal while the chooser dismisses.
// Its own Paper/Portal host keeps discard dialogs above the native modal content.

export function LoggingModal({ mode, initialDate, onClose, onDaily, onPeriodDates }: Props) {
  const theme = useTheme<AppTheme>();
  const form = useRef<{ requestClose: () => void }>(null);
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
        if ((mode === 'symptoms' || mode === 'period-dates') && form.current) form.current.requestClose();
        else onClose();
      }}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <PaperProvider theme={theme}>
          <View style={styles.content} pointerEvents={mode === null ? 'none' : 'auto'}>
            {contentMode === 'symptoms' ? (
              <DailySymptoms ref={form} initialDate={initialDate} onClose={onClose} />
            ) : contentMode === 'period-dates' ? (
              <PeriodDateSelector ref={form} initialDate={initialDate} onClose={onClose} />
            ) : contentMode === 'choose' ? (
              <LoggingOptionsOverlay onClose={onClose} onDaily={onDaily} onPeriodDates={onPeriodDates} />
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
