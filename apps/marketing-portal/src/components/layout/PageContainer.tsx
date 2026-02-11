import type { ReactNode } from 'react';
import { Header } from './Header';

interface PageContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const PageContainer = ({ title, subtitle, children }: PageContainerProps) => {
  return (
    <div style={styles.container}>
      <Header title={title} subtitle={subtitle} />
      <main style={styles.content}>
        {children}
      </main>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f7fafc',
  },
  content: {
    flex: 1,
    padding: 32,
  },
};
