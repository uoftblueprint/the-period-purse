import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Alert, Linking, Pressable, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { theme as appTheme } from '@/constants/theme';

const TERMS_ROUTE = '/terms-and-conditions';
const PRIVACY_ROUTE = '/privacy-policy';

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/theperiodpurse/',
    icon: require('../../assets/icons/instagram.svg'),
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@theperiodpurse',
    icon: require('../../assets/icons/tiktok.svg'),
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/channel/UC2YgDU_9XxbjJsGGvXwxwyA',
    icon: require('../../assets/icons/youtube.svg'),
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/ThePeriodPurse',
    icon: require('../../assets/icons/twitter.svg'),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/theperiodpurse/',
    icon: require('../../assets/icons/facebook.svg'),
  },
] as const;

export function Footer() {
  const router = useRouter();
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  async function openSocialLink(url: string) {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Unable to open link', 'Please try again later.');
    }
  }

  return (
    <View style={styles.footer}>
      <View style={styles.socialLinks}>
        {SOCIAL_LINKS.map((social) => (
          <Pressable
            key={social.name}
            accessibilityLabel={`Open The Period Purse on ${social.name}`}
            accessibilityRole="link"
            onPress={() => openSocialLink(social.url)}
            style={({ pressed }) => [styles.socialButton, pressed && styles.pressed]}>
            <Image source={social.icon} contentFit="contain" style={styles.socialIcon} />
          </Pressable>
        ))}
      </View>

      <Text
        style={[styles.copyright, { color: theme.colors.onSurfaceVariant }]}
        variant="bodySmall">
        © {currentYear} The Period Purse. All rights reserved.
      </Text>

      <View style={styles.legalLinks}>
        <Pressable
          accessibilityLabel="Open Terms and Conditions"
          accessibilityRole="link"
          onPress={() => router.push(TERMS_ROUTE)}
          style={({ pressed }) => [styles.legalButton, pressed && styles.pressed]}>
          <Text style={[styles.legalLinkText, { color: theme.colors.onBackground }]} variant="bodyMedium">
            Terms and Conditions
          </Text>
        </Pressable>

        <Text style={{ color: theme.colors.onSurfaceVariant }} variant="bodyMedium">
          {' and '}
        </Text>

        <Pressable
          accessibilityLabel="Open Privacy Policy"
          accessibilityRole="link"
          onPress={() => router.push(PRIVACY_ROUTE)}
          style={({ pressed }) => [styles.legalButton, pressed && styles.pressed]}>
          <Text style={[styles.legalLinkText, { color: theme.colors.onBackground }]} variant="bodyMedium">
            Privacy Policy
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    gap: appTheme.spacing.two,
    paddingHorizontal: appTheme.spacing.three,
    paddingVertical: appTheme.spacing.four,
  },
  socialLinks: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: appTheme.spacing.two,
  },
  socialButton: {
    alignItems: 'center',
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  pressed: {
    opacity: 0.7,
  },
  socialIcon: {
    height: 24,
    width: 25,
  },
  copyright: {
    textAlign: 'center',
  },
  legalLinks: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  legalButton: {
    justifyContent: 'center',
    minHeight: 44,
  },
  legalLinkText: {
    paddingVertical: appTheme.spacing.two,
    textDecorationLine: 'underline',
  },
});
