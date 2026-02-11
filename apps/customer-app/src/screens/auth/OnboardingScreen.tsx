import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import type { AuthScreenProps } from '../../navigation/types';

export const OnboardingScreen: React.FC<AuthScreenProps<'Onboarding'>> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Hero image / illustration carousel */}
      <View style={styles.heroSection}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>Onboarding Illustration</Text>
        </View>
      </View>

      {/* Welcome text */}
      <View style={styles.contentSection}>
        <Text style={styles.title}>Welcome to Restaurants</Text>
        <Text style={styles.subtitle}>
          Order delicious food from your favorite restaurants, delivered right to
          your door.
        </Text>
      </View>

      {/* Page indicator dots */}
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Action buttons */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.secondaryButtonText}>
            Already have an account? Log In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroSection: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  imagePlaceholder: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#93959F',
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1C',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#93959F',
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#E23744',
    width: 24,
  },
  buttonSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  primaryButton: {
    backgroundColor: '#E23744',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#E23744',
    fontSize: 14,
    fontWeight: '500',
  },
});
