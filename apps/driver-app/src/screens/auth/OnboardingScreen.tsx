import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { AuthScreenProps } from '../../navigation/types';

interface OnboardingStep {
  title: string;
  description: string;
  icon: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    title: 'Accept Deliveries',
    description:
      'Receive delivery requests from nearby restaurants. Accept the ones that work for you.',
    icon: '[Delivery Icon]',
  },
  {
    title: 'Pick Up & Deliver',
    description:
      'Navigate to the restaurant, pick up the order, and deliver it to the customer.',
    icon: '[Navigation Icon]',
  },
  {
    title: 'Earn Money',
    description:
      'Get paid for every delivery. Track your earnings in real time and cash out weekly.',
    icon: '[Earnings Icon]',
  },
  {
    title: 'Upload Documents',
    description:
      'Submit your driver\'s license, insurance, and vehicle info to get verified.',
    icon: '[Documents Icon]',
  },
];

export const OnboardingScreen: React.FC<AuthScreenProps<'Onboarding'>> = ({
  navigation,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;
  const step = ONBOARDING_STEPS[currentStep];

  const handleNext = (): void => {
    if (isLastStep) {
      navigation.navigate('DocumentUpload');
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSkip = (): void => {
    navigation.navigate('DocumentUpload');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* Step Content */}
        <View style={styles.stepContent}>
          {/* Icon Placeholder */}
          <View style={styles.iconContainer}>
            <Text style={styles.iconPlaceholder}>{step.icon}</Text>
          </View>

          <Text style={styles.stepTitle}>{step.title}</Text>
          <Text style={styles.stepDescription}>{step.description}</Text>
        </View>

        {/* Step Indicators */}
        <View style={styles.indicators}>
          {ONBOARDING_STEPS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentStep && styles.indicatorActive,
                index < currentStep && styles.indicatorCompleted,
              ]}
            />
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          {currentStep > 0 && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentStep((prev) => prev - 1)}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.nextButton, currentStep === 0 && styles.nextButtonFull]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {isLastStep ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  skipButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipText: {
    fontSize: 14,
    color: '#737373',
    fontWeight: '500',
  },
  stepContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  iconPlaceholder: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '600',
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#171717',
    textAlign: 'center',
    marginBottom: 16,
  },
  stepDescription: {
    fontSize: 16,
    color: '#525252',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D4D4D4',
  },
  indicatorActive: {
    width: 24,
    backgroundColor: '#FF6B35',
  },
  indicatorCompleted: {
    backgroundColor: '#FFB08C',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 16,
  },
  backButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#525252',
  },
  nextButton: {
    flex: 2,
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonFull: {
    flex: 1,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
