import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { AuthScreenProps } from '../../navigation/types';

interface DocumentItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'uploading' | 'uploaded' | 'approved' | 'rejected';
  required: boolean;
}

const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'drivers_license',
    title: "Driver's License",
    description: 'Valid, non-expired government-issued driver\'s license.',
    status: 'pending',
    required: true,
  },
  {
    id: 'insurance',
    title: 'Insurance',
    description: 'Proof of auto insurance coverage.',
    status: 'pending',
    required: true,
  },
  {
    id: 'vehicle_registration',
    title: 'Vehicle Registration',
    description: 'Current vehicle registration document.',
    status: 'pending',
    required: true,
  },
  {
    id: 'background_check',
    title: 'Background Check Consent',
    description: 'Authorization for background verification.',
    status: 'pending',
    required: true,
  },
];

export const DocumentUploadScreen: React.FC<AuthScreenProps<'DocumentUpload'>> = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploadedCount = documents.filter(
    (d) => d.status === 'uploaded' || d.status === 'approved',
  ).length;
  const allUploaded = documents.every(
    (d) => !d.required || d.status === 'uploaded' || d.status === 'approved',
  );

  const handleUpload = (documentId: string): void => {
    // TODO: Implement document picker and Firebase Storage upload
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === documentId ? { ...d, status: 'uploaded' as const } : d,
      ),
    );
  };

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      // TODO: Submit documents for review via Firestore
      console.log('Documents submitted for review');
    } catch (err) {
      console.error('Failed to submit documents:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: DocumentItem['status']): string => {
    switch (status) {
      case 'uploaded':
        return '#3B82F6';
      case 'approved':
        return '#22C55E';
      case 'rejected':
        return '#EF4444';
      case 'uploading':
        return '#F59E0B';
      default:
        return '#A3A3A3';
    }
  };

  const getStatusLabel = (status: DocumentItem['status']): string => {
    switch (status) {
      case 'uploaded':
        return 'Uploaded';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'uploading':
        return 'Uploading...';
      default:
        return 'Not Uploaded';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Upload Documents</Text>
          <Text style={styles.subtitle}>
            Submit the required documents to get verified and start delivering.
          </Text>
        </View>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(uploadedCount / documents.length) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {uploadedCount} of {documents.length} uploaded
          </Text>
        </View>

        {/* Document List */}
        {documents.map((doc) => (
          <View key={doc.id} style={styles.documentCard}>
            <View style={styles.documentInfo}>
              <View style={styles.documentHeader}>
                <Text style={styles.documentTitle}>{doc.title}</Text>
                {doc.required && <Text style={styles.requiredBadge}>Required</Text>}
              </View>
              <Text style={styles.documentDescription}>{doc.description}</Text>
              <Text style={[styles.statusText, { color: getStatusColor(doc.status) }]}>
                {getStatusLabel(doc.status)}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.uploadButton,
                doc.status === 'uploaded' && styles.uploadButtonDone,
                doc.status === 'rejected' && styles.uploadButtonRetry,
              ]}
              onPress={() => handleUpload(doc.id)}
              disabled={doc.status === 'uploading' || doc.status === 'approved'}
            >
              <Text
                style={[
                  styles.uploadButtonText,
                  doc.status === 'uploaded' && styles.uploadButtonTextDone,
                ]}
              >
                {doc.status === 'pending'
                  ? 'Upload'
                  : doc.status === 'rejected'
                    ? 'Retry'
                    : doc.status === 'uploaded'
                      ? 'Replace'
                      : 'Done'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, !allUploaded && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!allUploaded || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.submitButtonText}>Submit for Review</Text>
          )}
        </TouchableOpacity>

        {!allUploaded && (
          <Text style={styles.helperText}>
            Please upload all required documents to continue.
          </Text>
        )}
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
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#525252',
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#737373',
    textAlign: 'right',
  },
  documentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  documentInfo: {
    flex: 1,
    marginRight: 12,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171717',
  },
  requiredBadge: {
    fontSize: 10,
    fontWeight: '600',
    color: '#EF4444',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  documentDescription: {
    fontSize: 12,
    color: '#737373',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  uploadButtonDone: {
    backgroundColor: '#E5E5E5',
  },
  uploadButtonRetry: {
    backgroundColor: '#EF4444',
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  uploadButtonTextDone: {
    color: '#525252',
  },
  submitButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#D4D4D4',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  helperText: {
    fontSize: 12,
    color: '#A3A3A3',
    textAlign: 'center',
  },
});
