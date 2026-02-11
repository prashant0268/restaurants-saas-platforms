import { Currency, Money, Timestamp } from '@restaurants/types';

export const formatCurrency = (amount: number, currency: Currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatMoney = (money: Money): string => {
  return formatCurrency(money.amount, money.currency);
};

export const formatDate = (timestamp: Timestamp, options?: Intl.DateTimeFormatOptions): string => {
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString('en-US', options ?? {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (timestamp: Timestamp): string => {
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDateTime = (timestamp: Timestamp): string => {
  return `${formatDate(timestamp)} ${formatTime(timestamp)}`;
};

export const formatRelativeTime = (timestamp: Timestamp): string => {
  const now = Date.now();
  const time = timestamp.seconds * 1000;
  const diff = now - time;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(timestamp);
};

export const formatPhone = (countryCode: string, number: string): string => {
  const cleaned = number.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+${countryCode} (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return `+${countryCode} ${number}`;
};

export const formatDistance = (distance: number, unit: 'miles' | 'km'): string => {
  if (distance < 0.1) {
    return unit === 'miles' ? '< 0.1 mi' : '< 100 m';
  }
  return `${distance.toFixed(1)} ${unit === 'miles' ? 'mi' : 'km'}`;
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

export const formatOrderNumber = (orderNumber: string): string => {
  return `#${orderNumber}`;
};

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatCompactNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
};
