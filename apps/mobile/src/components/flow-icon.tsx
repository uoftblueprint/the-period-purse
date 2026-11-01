import { Image } from 'expo-image';

import LightIcon from '@/assets/icons/logging/symptoms/flow/flow-light.svg';
import MediumIcon from '@/assets/icons/logging/symptoms/flow/flow-medium.svg';
import HeavyIcon from '@/assets/icons/logging/symptoms/flow/flow-heavy.svg';
import SpottingIcon from '@/assets/icons/logging/symptoms/flow/flow-spotting.svg';
import NoneIcon from '@/assets/icons/logging/symptoms/flow/flow-none.svg';
import type { FlowLevel } from '@/features/daily-log';

const icons = { Light: LightIcon, Medium: MediumIcon, Heavy: HeavyIcon, Spotting: SpottingIcon, None: NoneIcon };

export function FlowIcon({ level, size = 32, color = '#242424' }: { level: FlowLevel; size?: number; color?: string }) {
  return <Image source={icons[level]} tintColor={color} contentFit="contain" style={{ width: size, height: size }} accessible={false} />;
}
