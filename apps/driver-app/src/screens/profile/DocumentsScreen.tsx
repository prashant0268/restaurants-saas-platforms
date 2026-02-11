import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../stores/authStore';
import type { ProfileScreenProps } from '../../navigation/types';
import type { DocumentUpload } from '@restaurants/types';

interface DocumentCardProps {
  title: string;
  document?: DocumentUpload;
  onUpload: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ title, document, onUpload }) => {
  const getStatusColor = (status?: DocumentUpload['status']): string => {
    switch (status) {
      case 'approved':
        return '#22C55E';
      case 'pending':
        return '#F59E0B';
      case 'rejected':
        return '#EF4444';
      default:
        return '#A3A3A3';
    }
  };

  const getStatusLabel = (status?: DocumentUpload['status']): string => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Under Review';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Not Uploaded';
    }
  };

  return (
    <View style={styles.documentCard}>
      <View style={styles.documentInfo}>
        <Text style={styles.documentTitle}>{title}</Text>
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: getStatusColor(document?.status) },
            ]}
          />
          <Text
            style={[
              styles.statusLabel,
              { color: getStatusColor(document?.status) },
            ]}
          >
            {getStatusLabel(document?.status)}
          </Text>
        </View>
        {document?.fileName && (
          <Text style={styles.fileName}>{document.fileName}</Text>
        )}
        {document?.status === 'rejected' && document.rejectionReason && (
          <View style={styles.rejectionContainer}>
            <Text style={styles.rejectionText}>
              Reason: {document.rejectionReason}
            </Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={[
          styles.uploadAction,
          document?.status === 'approved' && styles.uploadActionDisabled,
        ]}
        onPress={onUpload}
        disabled={document?.status === 'approved'}
      >
        <Text
          style={[
            styles.uploadActionText,
            document?.status === 'approved' && styles.uploadActionTextDisabled,
          ]}
        >
          {document ? 'Replace' : 'Upload'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const DocumentsScreen: React.FC<ProfileScreenProps<'Documents'>> = () => {
  const { driver } = useAuthStore();
  const documents = driver?.documents;

  const handleUpload = (documentType: string): void => {
    // TODO: Implement document picker and Firebase Storage upload
    console.log('Upload document:', documentType);
  };

  const approvedCount = [
    documents?.driversLicense,
    documents?.insurance,
    documents?.vehicleRegistration,
    documents?.backgroundCheck,
  ].filter((d) => d?.status === 'approved').length;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Status Overview */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Document Status</Text>
          <View style={styles.overviewProgress}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(approvedCount / 4) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{approvedCount}/4 approved</Text>
          </View>
          <Text style={styles.overviewDescription}>
            {approvedCount === 4
              ? 'All documents are approved. You are ready to deliver.'
              : 'Upload and get all documents approved to start delivering.'}
          </Text>
        </View>

        {/* Document Cards */}
        <View style={styles.documentsList}>
          <DocumentCard
            title="Driver's License"
            document={documents?.driversLicense}
            onUpload={() => handleUpload('driversLicense')}
          />
          <DocumentCard
            title="Insurance"
            document={documents?.insurance}
            onUpload={() => handleUpload('insurance')}
          />
          <DocumentCard
            title="Vehicle Registration"
            document={documents?.vehicleRegistration}
            onUpload={() => handleUpload('vehicleRegistration')}
          />
          <DocumentCard
            title="Background Check"
            document={documents?.backgroundCheck}
            onUpload={() => handleUpload('backgroundCheck')}
          />
        </View>

        {/* Help Note */}
        <View style={styles.helpNote}>
          <Text style={styles.helpNoteTitle}>Need Help?</Text>
          <Text style={styles.helpNoteText}>
            Documents are reviewed within 24-48 hours. If your document was rejected,
            please upload a clearer copy that meets the requirements.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    padding: 16,
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 12,
  },
  overviewProgress: {
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
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
  overviewDescription: {
    fontSize: 13,
    color: '#525252',
    lineHeight: 18,
  },
  documentsList: {
    gap: 12,
    marginBottom: 20,
  },
  documentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  documentInfo: {
    flex: 1,
    marginRight: 12,
  },
  documentTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  fileName: {
    fontSize: 11,
    color: '#A3A3A3',
    marginTop: 2,
  },
  rejectionContainer: {
    backgroundColor: '#FEF2F2',
    borderRadius: 6,
    padding: 8,
    marginTop: 6,
  },
  rejectionText: {
    fontSize: 12,
    color: '#EF4444',
  },
  uploadAction: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  uploadActionDisabled: {
    backgroundColor: '#E5E5E5',
  },
  uploadActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  uploadActionTextDisabled: {
    color: '#A3A3A3',
  },
  helpNote: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  helpNoteTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 4,
  },
  helpNoteText: {
    fontSize: 13,
    color: '#78350F',
    lineHeight: 18,
  },
});
