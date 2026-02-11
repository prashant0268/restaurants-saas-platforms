import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type { AuthScreenProps } from '../../navigation/types';

export const ForgotPasswordScreen: React.FC<
  AuthScreenProps<'ForgotPassword'>
> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetPassword = (): void => {
    // TODO: Send password reset email via Firebase Auth
    setIsSubmitted(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {!isSubmitted ? (
            <>
              {/* Instructions */}
              <View style={styles.headerSection}>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subtitle}>
                  Enter the email address associated with your account and
                  we&apos;ll send you a link to reset your password.
                </Text>
              </View>

              {/* Email input */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#93959F"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Submit button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleResetPassword}
              >
                <Text style={styles.submitButtonText}>Send Reset Link</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Success state */}
              <View style={styles.successSection}>
                <View style={styles.successIcon}>
                  <Text style={styles.successIconText}>
                    {/* TODO: Replace with proper icon */}
                    Check
                  </Text>
                </View>
                <Text style={styles.successTitle}>Check Your Email</Text>
                <Text style={styles.successSubtitle}>
                  We&apos;ve sent a password reset link to {email}. Please check
                  your inbox and follow the instructions.
                </Text>
              </View>

              {/* Back to login button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.submitButtonText}>Back to Login</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Back to login link */}
          {!isSubmitted && (
            <TouchableOpacity
              style={styles.backLink}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.backLinkText}>Back to Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  headerSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#93959F',
    lineHeight: 24,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1C',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1C1C1C',
  },
  submitButton: {
    backgroundColor: '#E23744',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backLink: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  backLinkText: {
    fontSize: 14,
    color: '#E23744',
    fontWeight: '500',
  },
  successSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 48,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successIconText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 12,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#93959F',
    textAlign: 'center',
    lineHeight: 24,
  },
});
