import type { CSSProperties, ReactNode } from 'react';
import { Header } from './Header';

interface PageContainerProps {
  title: string;
  children: ReactNode;
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    marginLeft: '260px',
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
  },
  content: {
    padding: '32px',
  },
};

export const PageContainer = ({ title, children }: PageContainerProps) => {
  return (
    <div style={styles.wrapper}>
      <Header title={title} />
      <main style={styles.content}>
        {children}
      </main>
    </div>
  );
};
