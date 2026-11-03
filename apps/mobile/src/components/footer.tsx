import { Image } from 'expo-image';
import { type Href, useRouter } from 'expo-router';
import { Alert, Linking, StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';

import { Spacing } from '@/constants/theme';

const TERMS_ROUTE = '/terms-and-conditions' as Href;
const PRIVACY_ROUTE = '/privacy-policy' as Href;

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
          <TouchableRipple
            key={social.name}
            accessibilityLabel={`Open The Period Purse on ${social.name}`}
            accessibilityRole="link"
            borderless
            onPress={() => openSocialLink(social.url)}
            rippleColor={theme.colors.primaryContainer}
            style={styles.socialButton}>
            <Image source={social.icon} contentFit="contain" style={styles.socialIcon} />
          </TouchableRipple>
        ))}
      </View>

      <Text
        style={[styles.copyright, { color: theme.colors.onSurfaceVariant }]}
        variant="bodySmall">
        © {currentYear} The Period Purse. All rights reserved.
      </Text>

      <View style={styles.legalLinks}>
        <TouchableRipple
          accessibilityLabel="Open Terms and Conditions"
          accessibilityRole="link"
          borderless
          onPress={() => router.push(TERMS_ROUTE)}
          rippleColor={theme.colors.primaryContainer}
          style={styles.legalButton}>
          <Text style={[styles.legalLinkText, { color: theme.colors.primary }]} variant="bodyMedium">
            Terms and Conditions
          </Text>
        </TouchableRipple>

        <Text style={{ color: theme.colors.onSurfaceVariant }} variant="bodyMedium">
          {' and '}
        </Text>

        <TouchableRipple
          accessibilityLabel="Open Privacy Policy"
          accessibilityRole="link"
          borderless
          onPress={() => router.push(PRIVACY_ROUTE)}
          rippleColor={theme.colors.primaryContainer}
          style={styles.legalButton}>
          <Text style={[styles.legalLinkText, { color: theme.colors.primary }]} variant="bodyMedium">
            Privacy Policy
          </Text>
        </TouchableRipple>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
  },
  socialLinks: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  socialButton: {
    alignItems: 'center',
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
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
    paddingVertical: Spacing.two,
    textDecorationLine: 'underline',
  },
});

