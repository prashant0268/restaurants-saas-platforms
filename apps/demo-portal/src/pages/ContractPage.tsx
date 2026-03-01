import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { StepIndicator } from '../components/shared/StepIndicator';
import { SignatureCanvas } from '../components/shared/SignatureCanvas';
import { FeatureList } from '../components/shared/FeatureList';
import { useContractStore } from '../stores/contractStore';
import { usePricingStore } from '../stores/pricingStore';
import { pricingTiers } from '../data/mockPricing';

const contractSteps = [
  { id: 'details', label: 'Restaurant Details' },
  { id: 'plan-review', label: 'Plan Review' },
  { id: 'terms', label: 'Terms' },
  { id: 'signature', label: 'Signature' },
];

const styles: Record<string, CSSProperties> = {
  page: {
    padding: '0',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    padding: '32px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 24px 0',
  },
  formRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
  },
  formRow3: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151',
  },
  requiredStar: {
    color: '#dc2626',
    marginLeft: '2px',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    outline: 'none',
    backgroundColor: '#f9fafb',
    color: '#111827',
    boxSizing: 'border-box' as const,
  },
  buttonRow: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '24px',
  },
  primaryButton: {
    padding: '12px 28px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#0d9488',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  primaryButtonDisabled: {
    padding: '12px 28px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#0d9488',
    border: 'none',
    borderRadius: '8px',
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  backButton: {
    padding: '12px 28px',
    fontSize: '15px',
    fontWeight: 600,
    color: '#374151',
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  errorMessage: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    fontSize: '13px',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #fecaca',
    margin: '0 0 16px 0',
  },
  reviewRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f3f4f6',
  },
  reviewLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: 500,
    margin: 0,
  },
  reviewValue: {
    fontSize: '14px',
    color: '#111827',
    fontWeight: 600,
    margin: 0,
  },
  planName: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#0d9488',
    margin: '0 0 4px 0',
  },
  planPrice: {
    fontSize: '32px',
    fontWeight: 800,
    color: '#111827',
    margin: '0 0 4px 0',
  },
  planPeriod: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 20px 0',
  },
  featureListSection: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #e5e7eb',
  },
  featureListHeading: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 12px 0',
  },
  termsContainer: {
    maxHeight: '400px',
    overflowY: 'auto' as const,
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '24px',
    backgroundColor: '#f9fafb',
    marginBottom: '20px',
  },
  termsTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 12px 0',
  },
  termsSectionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#374151',
    margin: '20px 0 8px 0',
  },
  termsText: {
    fontSize: '13px',
    color: '#6b7280',
    lineHeight: '1.7',
    margin: '0 0 12px 0',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '16px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    accentColor: '#0d9488',
    cursor: 'pointer',
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#374151',
    fontWeight: 500,
    cursor: 'pointer',
  },
  summaryCard: {
    backgroundColor: '#f0fdfa',
    borderRadius: '12px',
    border: '1px solid #99f6e4',
    padding: '24px',
    marginBottom: '24px',
  },
  summaryTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 16px 0',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
  },
  summaryLabel: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  summaryValue: {
    fontSize: '14px',
    color: '#111827',
    fontWeight: 600,
    margin: 0,
  },
  contractDocument: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '40px',
    marginBottom: '24px',
    fontSize: '13px',
    lineHeight: '1.8',
    color: '#374151',
    maxHeight: '600px',
    overflowY: 'auto' as const,
  },
  contractTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#111827',
    textAlign: 'center' as const,
    marginBottom: '8px',
  },
  contractSubtitle: {
    fontSize: '13px',
    color: '#6b7280',
    textAlign: 'center' as const,
    marginBottom: '24px',
  },
  contractSection: {
    marginBottom: '20px',
  },
  contractSectionTitle: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#111827',
    marginBottom: '8px',
  },
  contractParagraph: {
    margin: '8px 0',
    textAlign: 'justify' as const,
  },
  signatureSection: {
    marginBottom: '24px',
  },
  signatureHeading: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 16px 0',
  },
  signatureOptions: {
    display: 'flex',
    gap: '20px',
    marginBottom: '24px',
  },
  signatureOption: {
    flex: 1,
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  signatureOptionActive: {
    flex: 1,
    border: '2px solid #0d9488',
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: '#f0fdfa',
    cursor: 'pointer',
  },
  optionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 8px 0',
  },
  optionDescription: {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0,
  },
  docusignButton: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#003d82',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '12px',
  },
  loadingOverlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    flexDirection: 'column',
    gap: '16px',
  },
  loadingText: {
    fontSize: '16px',
    fontWeight: 500,
    color: '#6b7280',
    margin: 0,
  },
};

const ContractDocument = ({ restaurantName, tierName }: { restaurantName: string; tierName: string }) => (
  <div style={styles.contractDocument}>
    <p style={styles.contractTitle}>RESTAURANT MANAGEMENT PLATFORM SERVICES AGREEMENT</p>
    <p style={styles.contractSubtitle}>This Agreement is entered into as of {new Date().toLocaleDateString()}</p>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>1. PARTIES</p>
      <p style={styles.contractParagraph}>
        This Agreement is between <strong>Shamyra Naturals LLC</strong> ("Company"), a software and services provider, and <strong>{restaurantName || 'Restaurant Name'}</strong> ("Restaurant Owner"), collectively referred to as the "Parties."
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>2. SERVICES PROVIDED</p>
      <p style={styles.contractParagraph}>
        Company agrees to provide a comprehensive digital restaurant management platform including: (a) Mobile customer ordering application; (b) Menu management and digital menu builder; (c) Order management system; (d) Restaurant owner dashboard with analytics and reporting; (e) Staff management and scheduling tools; (f) Loyalty program and customer rewards system; (g) Table reservation management; (h) Fire TV digital menu displays; (k) Kitchen Display System (KDS); (l) Delivery platform integrations; (m) POS system integrations; (n) Social media campaign management; (o) Website builder; (p) Self-service kiosk application; and (q) Dedicated customer support. These services are collectively referred to as the "Platform."
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>3. TERM AND RENEWAL</p>
      <p style={styles.contractParagraph}>
        This Agreement shall commence on the date of execution and continue for an initial period as selected by Restaurant Owner (monthly, annual, or three-year term). Upon expiration, this Agreement shall automatically renew for successive periods on the same terms unless either Party provides written notice of non-renewal at least thirty (30) days before expiration.
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>4. FEES AND BILLING</p>
      <p style={styles.contractParagraph}>
        Restaurant Owner shall pay Company the subscription fee corresponding to the selected plan ({tierName}) and billing cycle. Monthly plans include a $500 setup fee. Annual and three-year plans include no setup fee. All fees are due in advance of service provision. Company reserves the right to increase fees upon thirty (30) days' written notice.
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>5. PAYMENT TERMS</p>
      <p style={styles.contractParagraph}>
        Invoices are issued upon service commencement and on each renewal date. Payment is due net thirty (30) days from invoice date. Late payments accrue interest at 1.5% per month. Non-payment for sixty (60) days may result in suspension of service without additional notice.
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>6. DATA AND SECURITY</p>
      <p style={styles.contractParagraph}>
        Company implements industry-standard security measures to protect Restaurant Owner's data. Restaurant Owner remains the owner of all data submitted to the Platform. Company shall not access, use, or disclose Restaurant Owner's data except as necessary to provide the Platform services. Company shall comply with all applicable data protection laws including GDPR, CCPA, and similar regulations. Company maintains encrypted data storage and regular security audits.
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>7. INTELLECTUAL PROPERTY</p>
      <p style={styles.contractParagraph}>
        All Platform intellectual property, including software, code, features, designs, and documentation, remains the exclusive property of Company. Restaurant Owner receives a non-exclusive, non-transferable license to use the Platform solely for its restaurant operations. Restaurant Owner may not copy, modify, reverse-engineer, or create derivative works of the Platform.
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>8. TERMINATION</p>
      <p style={styles.contractParagraph}>
        Either Party may terminate this Agreement for cause (material breach not cured within 15 days of written notice) or without cause with thirty (30) days' written notice for monthly plans, or upon plan expiration for longer-term plans. Upon termination, all fees are due, and Company will provide data export for thirty (30) days before deletion.
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>9. CONFIDENTIALITY</p>
      <p style={styles.contractParagraph}>
        Both Parties agree to maintain strict confidentiality of any proprietary information shared during this Agreement. This obligation survives termination for a period of two (2) years. Exceptions include information that becomes publicly available through no fault of the receiving Party or that is independently developed.
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>10. WARRANTY DISCLAIMER</p>
      <p style={styles.contractParagraph}>
        THE PLATFORM IS PROVIDED "AS-IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. COMPANY DOES NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE FROM HARMFUL COMPONENTS. COMPANY SPECIFICALLY DISCLAIMS ANY WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR TITLE.
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>11. LIMITATION OF LIABILITY</p>
      <p style={styles.contractParagraph}>
        IN NO EVENT SHALL COMPANY BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. COMPANY'S TOTAL LIABILITY SHALL NOT EXCEED THE FEES PAID IN THE PRECEDING TWELVE (12) MONTHS. Some jurisdictions do not allow liability limitations; this clause applies to the fullest extent permitted by law.
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>12. INDEMNIFICATION</p>
      <p style={styles.contractParagraph}>
        Restaurant Owner shall indemnify, defend, and hold harmless Company from any claims, losses, or damages arising from: (a) Restaurant Owner's use of the Platform in violation of this Agreement; (b) Restaurant Owner's content or data; or (c) violation of any applicable law. Company shall indemnify Restaurant Owner for claims that the Platform infringes third-party intellectual property rights.
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>13. SERVICE AVAILABILITY</p>
      <p style={styles.contractParagraph}>
        Company strives to maintain 99% uptime but does not guarantee uninterrupted service. Scheduled maintenance may occur with seventy-two (72) hours' notice. Emergency maintenance may occur without notice. Company shall notify Restaurant Owner of service disruptions exceeding one (1) hour.
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>14. ACCEPTABLE USE</p>
      <p style={styles.contractParagraph}>
        Restaurant Owner agrees not to: (a) Use the Platform for illegal activities; (b) Attempt to gain unauthorized access; (c) Disrupt service or attack the Platform; (d) Harass other users; (e) Violate third-party rights; or (f) Engage in fraudulent activities. Violation may result in immediate termination without refund.
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>15. MODIFICATIONS TO AGREEMENT</p>
      <p style={styles.contractParagraph}>
        Company may modify this Agreement at any time by posting updated terms with thirty (30) days' notice. Continued use of the Platform constitutes acceptance of modifications. Restaurant Owner's sole remedy for unacceptable modifications is termination.
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>16. GOVERNING LAW AND JURISDICTION</p>
      <p style={styles.contractParagraph}>
        This Agreement shall be governed by and construed in accordance with the laws of the United States, without regard to conflicts of law principles. Both Parties consent to the exclusive jurisdiction of state and federal courts in the applicable jurisdiction.
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>17. DISPUTE RESOLUTION</p>
      <p style={styles.contractParagraph}>
        Prior to litigation, Parties agree to attempt informal resolution through good-faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration administered by the American Arbitration Association, with costs split equally.
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>18. ENTIRE AGREEMENT</p>
      <p style={styles.contractParagraph}>
        This Agreement constitutes the entire agreement between the Parties and supersedes all prior negotiations, understandings, and agreements. Any modification must be in writing and signed by both Parties.
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>19. SEVERABILITY</p>
      <p style={styles.contractParagraph}>
        If any provision is found unenforceable, such provision shall be modified to the minimum extent necessary to make it enforceable, and all other provisions shall remain in full force and effect.
      </p>
    </div>

    <div style={styles.contractSection}>
      <p style={styles.contractSectionTitle}>20. CONTACT INFORMATION</p>
      <p style={styles.contractParagraph}>
        For questions or notices, contact: Shamyra Naturals LLC, support@shamyranaturals.com, 1-800-SHAMYRA
      </p>
    </div>
  </div>
);

export const ContractPage = () => {
  const navigate = useNavigate();
  const [signatureMethod, setSignatureMethod] = useState<'canvas' | 'docusign'>('canvas');
  const {
    currentStep,
    details,
    agreedToTerms,
    isSubmitting,
    setStep,
    setDetails,
    setAgreedToTerms,
    setSignature,
    submitContract,
  } = useContractStore();
  const { selectedPlan, billingCycle } = usePricingStore();
  const [validationError, setValidationError] = useState<string | null>(null);

  const selectedTier = pricingTiers.find((t) => t.id === selectedPlan);
  const price = selectedTier
    ? billingCycle === 'monthly'
      ? selectedTier.monthlyPrice
      : selectedTier.annualPrice
    : 0;

  const getPlanFeatures = (): string[] => {
    if (selectedTier?.id === 'professional') {
      return [
        'Unlimited menu items',
        'Unlimited staff accounts',
        'Mobile ordering app',
        'Loyalty program & reservations',
        'Analytics & reporting',
      ];
    }
    if (selectedTier?.id === 'enterprise') {
      return [
        'Everything in Professional',
        'Delivery management & driver app',
        'Website builder',
        'Self-service kiosk',
        'API access & dedicated support',
      ];
    }
    return [];
  };

  const handleDetailsSubmit = () => {
    if (
      !details.restaurantName.trim() ||
      !details.ownerName.trim() ||
      !details.email.trim() ||
      !details.phone.trim()
    ) {
      setValidationError('Please fill in all required fields.');
      return;
    }
    setValidationError(null);
    setStep('plan-review');
  };

  const handleSignatureSave = async (dataUrl: string) => {
    setSignature(dataUrl);
    await submitContract();
    navigate('/payment');
  };

  const renderDetailsStep = () => (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Restaurant Details</h2>

      {validationError && (
        <p style={styles.errorMessage}>{validationError}</p>
      )}

      <div style={styles.formRow}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            Restaurant Name<span style={styles.requiredStar}>*</span>
          </label>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter restaurant name"
            value={details.restaurantName}
            onChange={(e) => setDetails({ restaurantName: e.target.value })}
          />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            Owner Name<span style={styles.requiredStar}>*</span>
          </label>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter owner name"
            value={details.ownerName}
            onChange={(e) => setDetails({ ownerName: e.target.value })}
          />
        </div>
      </div>

      <div style={styles.formRow}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            Email<span style={styles.requiredStar}>*</span>
          </label>
          <input
            style={styles.input}
            type="email"
            placeholder="you@restaurant.com"
            value={details.email}
            onChange={(e) => setDetails({ email: e.target.value })}
          />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            Phone<span style={styles.requiredStar}>*</span>
          </label>
          <input
            style={styles.input}
            type="tel"
            placeholder="(555) 123-4567"
            value={details.phone}
            onChange={(e) => setDetails({ phone: e.target.value })}
          />
        </div>
      </div>

      <div style={{ ...styles.formRow, marginBottom: '16px' }}>
        <div style={{ ...styles.fieldGroup, flex: 'unset', width: '100%' }}>
          <label style={styles.label}>Street Address</label>
          <input
            style={styles.input}
            type="text"
            placeholder="123 Main Street"
            value={details.address}
            onChange={(e) => setDetails({ address: e.target.value })}
          />
        </div>
      </div>

      <div style={styles.formRow3}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>City</label>
          <input
            style={styles.input}
            type="text"
            placeholder="City"
            value={details.city}
            onChange={(e) => setDetails({ city: e.target.value })}
          />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>State</label>
          <input
            style={styles.input}
            type="text"
            placeholder="State"
            value={details.state}
            onChange={(e) => setDetails({ state: e.target.value })}
          />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Zip Code</label>
          <input
            style={styles.input}
            type="text"
            placeholder="12345"
            value={details.zipCode}
            onChange={(e) => setDetails({ zipCode: e.target.value })}
          />
        </div>
      </div>

      <div style={styles.formRow}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Cuisine Type</label>
          <input
            style={styles.input}
            type="text"
            placeholder="e.g., Italian, Mexican, Japanese"
            value={details.cuisine}
            onChange={(e) => setDetails({ cuisine: e.target.value })}
          />
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Number of Locations</label>
          <input
            style={styles.input}
            type="number"
            min="1"
            placeholder="1"
            value={details.locations}
            onChange={(e) =>
              setDetails({ locations: parseInt(e.target.value, 10) || 1 })
            }
          />
        </div>
      </div>

      <div style={styles.buttonRow}>
        <button style={styles.primaryButton} onClick={handleDetailsSubmit}>
          Continue
        </button>
      </div>
    </div>
  );

  const renderPlanReviewStep = () => (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Plan Review</h2>

      {selectedTier ? (
        <>
          <p style={styles.planName}>{selectedTier.name}</p>
          <p style={styles.planPrice}>${price}/mo</p>
          <p style={styles.planPeriod}>
            Billed {billingCycle === 'annual' ? 'annually' : 'monthly'}
          </p>

          <div style={styles.reviewRow}>
            <p style={styles.reviewLabel}>Plan</p>
            <p style={styles.reviewValue}>{selectedTier.name}</p>
          </div>
          <div style={styles.reviewRow}>
            <p style={styles.reviewLabel}>Billing Cycle</p>
            <p style={styles.reviewValue}>
              {billingCycle === 'annual' ? 'Annual' : 'Monthly'}
            </p>
          </div>
          <div style={styles.reviewRow}>
            <p style={styles.reviewLabel}>Monthly Price</p>
            <p style={styles.reviewValue}>${price}</p>
          </div>

          <div style={styles.featureListSection}>
            <p style={styles.featureListHeading}>Plan Includes</p>
            <FeatureList features={getPlanFeatures()} />
          </div>
        </>
      ) : (
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          No plan selected. Please go back to the pricing page to select a plan.
        </p>
      )}

      <div style={styles.buttonRow}>
        <button style={styles.backButton} onClick={() => setStep('details')}>
          Back
        </button>
        <button style={styles.primaryButton} onClick={() => setStep('terms')}>
          Continue
        </button>
      </div>
    </div>
  );

  const renderTermsStep = () => (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Terms &amp; Conditions</h2>

      <div style={styles.termsContainer}>
        <h3 style={styles.termsTitle}>
          Restaurant Platform Service Agreement
        </h3>

        <h4 style={styles.termsSectionTitle}>1. Service Agreement</h4>
        <p style={styles.termsText}>
          This Service Agreement (&quot;Agreement&quot;) is entered into by and
          between Restaurant Platform Inc. (&quot;Provider&quot;) and the
          subscribing restaurant entity (&quot;Client&quot;). By signing this
          Agreement, the Client agrees to the terms and conditions outlined
          herein for the use of the Provider&apos;s restaurant management
          platform, including but not limited to digital ordering, menu
          management, analytics, and customer engagement tools. The Provider
          grants the Client a non-exclusive, non-transferable license to access
          and use the platform for the duration of the subscription period.
        </p>

        <h4 style={styles.termsSectionTitle}>2. Cancellation Policy</h4>
        <p style={styles.termsText}>
          Either party may terminate this Agreement with thirty (30) days
          written notice. Upon cancellation, the Client&apos;s access to the
          platform will remain active until the end of the current billing
          period. No refunds will be issued for partial months of service. For
          annual subscriptions, a pro-rated refund may be issued for unused
          months remaining in the billing cycle, less a 10% early termination
          fee. All Client data will be retained for ninety (90) days following
          termination, after which it will be permanently deleted unless an
          export is requested.
        </p>

        <h4 style={styles.termsSectionTitle}>3. Data Privacy</h4>
        <p style={styles.termsText}>
          The Provider is committed to protecting the privacy and security of
          Client data. All data collected through the platform, including
          customer information, order history, and business analytics, is stored
          securely using industry-standard encryption protocols. The Provider
          will not sell, share, or distribute Client data to third parties
          without prior written consent, except as required by law. The Client
          retains full ownership of their data and may request a complete export
          at any time. The Provider complies with all applicable data protection
          regulations, including GDPR and CCPA where applicable.
        </p>

        <h4 style={styles.termsSectionTitle}>4. Payment Terms</h4>
        <p style={styles.termsText}>
          Subscription fees are due at the beginning of each billing cycle
          (monthly or annually, as selected). The Provider will charge the
          payment method on file automatically. If a payment fails, the Provider
          will attempt to process the payment up to three (3) additional times
          over a ten (10) day period. If payment remains unsuccessful, the
          Client&apos;s account may be suspended until payment is received. All
          fees are exclusive of applicable taxes, which will be added where
          required. The Provider reserves the right to adjust pricing with sixty
          (60) days prior written notice.
        </p>
      </div>

      <div style={styles.checkboxRow}>
        <input
          type="checkbox"
          style={styles.checkbox}
          id="agree-terms"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
        />
        <label style={styles.checkboxLabel} htmlFor="agree-terms">
          I have read and agree to the terms and conditions
        </label>
      </div>

      <div style={styles.buttonRow}>
        <button
          style={styles.backButton}
          onClick={() => setStep('plan-review')}
        >
          Back
        </button>
        <button
          style={
            agreedToTerms ? styles.primaryButton : styles.primaryButtonDisabled
          }
          onClick={() => setStep('signature')}
          disabled={!agreedToTerms}
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderSignatureStep = () => (
    <>
      <ContractDocument
        restaurantName={details.restaurantName}
        tierName={selectedTier?.name || 'Not selected'}
      />

      {isSubmitting ? (
        <div style={styles.card}>
          <div style={styles.loadingOverlay}>
            <p style={styles.loadingText}>Submitting contract...</p>
          </div>
        </div>
      ) : (
        <div style={styles.card}>
          <div style={styles.signatureSection}>
            <h3 style={styles.signatureHeading}>Sign Contract</h3>

            <div style={styles.signatureOptions}>
              <div
                style={signatureMethod === 'canvas' ? styles.signatureOptionActive : styles.signatureOption}
                onClick={() => setSignatureMethod('canvas')}
              >
                <p style={styles.optionTitle}>✏️ Draw Signature</p>
                <p style={styles.optionDescription}>Sign directly using your mouse or touch screen</p>
              </div>
              <div
                style={signatureMethod === 'docusign' ? styles.signatureOptionActive : styles.signatureOption}
                onClick={() => setSignatureMethod('docusign')}
              >
                <p style={styles.optionTitle}>📧 DocuSign</p>
                <p style={styles.optionDescription}>Receive signing link via email from DocuSign</p>
              </div>
            </div>

            {signatureMethod === 'canvas' ? (
              <div>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>
                  Please sign below to accept and execute this agreement.
                </p>
                <SignatureCanvas onSave={handleSignatureSave} />
              </div>
            ) : (
              <div style={{ padding: '20px', backgroundColor: '#f0fdfa', borderRadius: '8px', textAlign: 'center' as const }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>
                  DocuSign E-Signature
                </p>
                <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>
                  A signing link will be sent to {details.email || 'your email address'}
                </p>
                <button
                  style={styles.docusignButton}
                  onClick={() => {
                    alert(`DocuSign envelope would be sent to ${details.email}. This is a demo integration.`);
                    handleSignatureSave('docusign-signing-initiated');
                  }}
                >
                  Send DocuSign Signing Link
                </button>
              </div>
            )}
          </div>

          <div style={styles.buttonRow}>
            <button
              style={styles.backButton}
              onClick={() => setStep('terms')}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'details':
        return renderDetailsStep();
      case 'plan-review':
        return renderPlanReviewStep();
      case 'terms':
        return renderTermsStep();
      case 'signature':
        return renderSignatureStep();
      default:
        return renderDetailsStep();
    }
  };

  return (
    <div style={styles.page}>
      <Header
        title="Contract"
        subtitle="Complete your restaurant onboarding"
      />

      <StepIndicator steps={contractSteps} currentStep={currentStep} />

      {renderCurrentStep()}
    </div>
  );
};
