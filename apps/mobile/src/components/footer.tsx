import { useState } from 'react';
import { Linking, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';

const SOCIAL_LINKS = [
  { label: 'Instagram', url: 'https://www.instagram.com/theperiodpurse/' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@theperiodpurse' },
  { label: 'YouTube', url: 'https://www.youtube.com/channel/UC2YgDU_9XxbjJsGGvXwxwyA' },
  { label: 'Twitter', url: 'https://twitter.com/ThePeriodPurse' },
  { label: 'Facebook', url: 'https://www.facebook.com/theperiodpurse/' },
];

type LegalDoc = 'terms' | 'privacy' | null;

export function Footer() {
  const [activeDoc, setActiveDoc] = useState<LegalDoc>(null);

  return (
    <View style={styles.footer}>
      <View style={styles.socials}>
        {SOCIAL_LINKS.map((item) => (
          <Pressable
            key={item.label}
            accessibilityRole="link"
            onPress={() => Linking.openURL(item.url)}>
            <Text variant="labelLarge" style={styles.social}>
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text variant="bodySmall" style={styles.copyright}>
        © {new Date().getFullYear()} The Period Purse. All rights reserved.
      </Text>

      <View style={styles.termsRow}>
        <Pressable accessibilityRole="button" onPress={() => setActiveDoc('terms')}>
          <Text variant="bodySmall" style={styles.termsLink}>
            Terms and Conditions
          </Text>
        </Pressable>
        <Text variant="bodySmall" style={styles.copyright}>
          {' and '}
        </Text>
        <Pressable accessibilityRole="button" onPress={() => setActiveDoc('privacy')}>
          <Text variant="bodySmall" style={styles.termsLink}>
            Privacy Policy
          </Text>
        </Pressable>
      </View>

      <Modal
        visible={activeDoc !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setActiveDoc(null)}>
        <SafeAreaView style={styles.modalPage}>
          <View style={styles.modalHeader}>
            <Button mode="text" textColor="#5A9F93" onPress={() => setActiveDoc(null)}>
              Done
            </Button>
          </View>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {activeDoc === 'terms' ? (
              <>
                <Text variant="headlineMedium" style={styles.modalTitle}>
                  Terms and Conditions
                </Text>
                <Text variant="bodyMedium" style={styles.modalBody}>
                  These terms and conditions (the &quot;Terms and Conditions&quot;) govern the use
                  of www.theperiodpurse.com (the &quot;Site&quot;). This Site is owned and operated
                  by The Period Purse. This Site is a news or media website.{'\n\n'}
                  By using this Site, you indicate that you have read and understand these Terms and
                  Conditions and agree to abide by them at all times.{'\n\n'}
                  Intellectual Property{'\n'}
                  All content published and made available on our Site is the property of The Period
                  Purse and the Site&apos;s creators.{'\n\n'}
                  Applicable Law{'\n'}
                  These Terms and Conditions are governed by the laws of Canada. The Period Purse
                  headquarters is in Ontario.{'\n\n'}
                  Contact Details{'\n'}
                  hello@theperiodpurse.com{'\n'}
                  1460 The Queensway, Toronto, Ontario, M8S 1S7
                </Text>
              </>
            ) : (
              <>
                <Text variant="headlineMedium" style={styles.modalTitle}>
                  Privacy Policy
                </Text>
                <Text variant="bodyMedium" style={styles.modalBody}>
                  The Period Purse strives to achieve menstrual equity by providing people who
                  menstruate with access to free menstrual products, and to reduce the stigma
                  surrounding periods through public education and advocacy.{'\n\n'}
                  What do we do with your information?{'\n'}
                  Nothing! Neither The Period Purse nor any other organization can access your
                  personal information.{'\n\n'}
                  Do you share my information with anyone?{'\n'}
                  We do not disclose your data to any third party. All the data that you add to the
                  app to keep track of your periods and your health is stored locally on your phone.
                  {'\n\n'}
                  Questions and contact information{'\n'}
                  Any question? Just email us at hello@periodpurse.com.
                </Text>
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.two,
  },
  socials: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  social: {
    color: '#5A9F93',
    fontWeight: '700',
  },
  copyright: {
    color: '#6D6E71',
    textAlign: 'center',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsLink: {
    color: '#5A9F93',
    textDecorationLine: 'underline',
  },
  modalPage: {
    flex: 1,
    backgroundColor: '#FFF8F3',
  },
  modalHeader: {
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
  },
  modalContent: {
    padding: Spacing.four,
    gap: Spacing.three,
  },
  modalTitle: {
    fontWeight: '800',
    color: '#313836',
  },
  modalBody: {
    color: '#4D5653',
    lineHeight: 22,
  },
});