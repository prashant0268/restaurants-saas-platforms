import { type CSSProperties, type FormEvent, useState } from 'react';

const styles: Record<string, CSSProperties> = {
  container: {
    padding: '80px 48px',
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    gap: 64,
    flexWrap: 'wrap',
  },
  formSection: {
    flex: '1 1 480px',
  },
  title: {
    fontSize: 36,
    fontWeight: 800,
    color: '#1a1a1a',
    margin: 0,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 17,
    color: '#6b7280',
    margin: 0,
    marginBottom: 40,
    lineHeight: 1.6,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    color: '#374151',
  },
  input: {
    padding: '12px 16px',
    fontSize: 16,
    border: '1px solid #d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  textarea: {
    padding: '12px 16px',
    fontSize: 16,
    border: '1px solid #d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    fontFamily: 'inherit',
    outline: 'none',
    minHeight: 140,
    resize: 'vertical' as const,
    transition: 'border-color 0.2s',
  },
  submitButton: {
    padding: '14px 36px',
    fontSize: 17,
    fontWeight: 700,
    backgroundColor: '#e63946',
    color: '#ffffff',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  successMessage: {
    padding: '16px 24px',
    backgroundColor: '#ecfdf5',
    border: '1px solid #a7f3d0',
    borderRadius: 8,
    color: '#065f46',
    fontSize: 16,
    fontWeight: 600,
  },
  infoSection: {
    flex: '1 1 320px',
    display: 'flex',
    flexDirection: 'column',
    gap: 40,
  },
  infoBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
  },
  infoText: {
    fontSize: 15,
    color: '#6b7280',
    margin: 0,
    lineHeight: 1.6,
  },
  infoLink: {
    fontSize: 15,
    color: '#e63946',
    textDecoration: 'none',
    fontWeight: 500,
  },
};

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    restaurantName: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
    setSubmitted(true);
  };

  const handleChange = (
    field: string,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.formSection}>
        <h1 style={styles.title}>Get in Touch</h1>
        <p style={styles.subtitle}>
          Ready to transform your restaurant? Fill out the form below and
          our team will get back to you within 24 hours.
        </p>

        {submitted ? (
          <div style={styles.successMessage}>
            Thank you for reaching out! We&apos;ll get back to you within
            24 hours.
          </div>
        ) : (
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.fieldGroup}>
              <label htmlFor="name" style={styles.label}>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="John Smith"
                required
                style={styles.input}
              />
            </div>
            <div style={styles.fieldGroup}>
              <label htmlFor="email" style={styles.label}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john@restaurant.com"
                required
                style={styles.input}
              />
            </div>
            <div style={styles.fieldGroup}>
              <label htmlFor="restaurantName" style={styles.label}>
                Restaurant Name
              </label>
              <input
                id="restaurantName"
                type="text"
                value={formData.restaurantName}
                onChange={(e) =>
                  handleChange('restaurantName', e.target.value)
                }
                placeholder="Your Restaurant"
                style={styles.input}
              />
            </div>
            <div style={styles.fieldGroup}>
              <label htmlFor="message" style={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Tell us about your restaurant and what you're looking for..."
                required
                style={styles.textarea}
              />
            </div>
            <button type="submit" style={styles.submitButton}>
              Send Message
            </button>
          </form>
        )}
      </div>

      <div style={styles.infoSection}>
        <div style={styles.infoBlock}>
          <h3 style={styles.infoTitle}>Email</h3>
          <a href="mailto:hello@restaurantos.com" style={styles.infoLink}>
            hello@restaurantos.com
          </a>
        </div>
        <div style={styles.infoBlock}>
          <h3 style={styles.infoTitle}>Phone</h3>
          <a href="tel:+18005551234" style={styles.infoLink}>
            (800) 555-1234
          </a>
        </div>
        <div style={styles.infoBlock}>
          <h3 style={styles.infoTitle}>Office</h3>
          <p style={styles.infoText}>
            123 Restaurant Row<br />
            Suite 456<br />
            San Francisco, CA 94105
          </p>
        </div>
        <div style={styles.infoBlock}>
          <h3 style={styles.infoTitle}>Hours</h3>
          <p style={styles.infoText}>
            Monday - Friday: 9am - 6pm PST<br />
            Saturday - Sunday: Closed
          </p>
        </div>
      </div>
    </div>
  );
};
