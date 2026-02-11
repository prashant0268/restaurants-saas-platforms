import { CartItem, Currency, Money } from '@restaurants/types';

export const createMoney = (amount: number, currency: Currency = 'USD'): Money => ({
  amount: Math.round(amount * 100) / 100,
  currency,
});

export const addMoney = (a: Money, b: Money): Money => {
  return createMoney(a.amount + b.amount, a.currency);
};

export const subtractMoney = (a: Money, b: Money): Money => {
  return createMoney(Math.max(0, a.amount - b.amount), a.currency);
};

export const multiplyMoney = (money: Money, multiplier: number): Money => {
  return createMoney(money.amount * multiplier, money.currency);
};

export const calculateItemTotal = (item: CartItem): Money => {
  const modifierTotal = item.modifiers.reduce(
    (sum, mod) => sum + mod.price.amount,
    0,
  );
  const unitTotal = item.unitPrice.amount + modifierTotal;
  return createMoney(unitTotal * item.quantity, item.unitPrice.currency);
};

export const calculateSubtotal = (items: CartItem[]): Money => {
  const currency = items[0]?.unitPrice.currency ?? 'USD';
  const total = items.reduce(
    (sum, item) => sum + calculateItemTotal(item).amount,
    0,
  );
  return createMoney(total, currency);
};

export const calculateTax = (subtotal: Money, taxRate: number): Money => {
  return createMoney(subtotal.amount * (taxRate / 100), subtotal.currency);
};

export const calculateOrderTotal = (params: {
  subtotal: Money;
  tax: Money;
  deliveryFee: Money;
  serviceFee: Money;
  tip: Money;
  discount: Money;
}): Money => {
  const total =
    params.subtotal.amount +
    params.tax.amount +
    params.deliveryFee.amount +
    params.serviceFee.amount +
    params.tip.amount -
    params.discount.amount;
  return createMoney(Math.max(0, total), params.subtotal.currency);
};

export const calculateTipAmount = (subtotal: Money, tipPercentage: number): Money => {
  return createMoney(subtotal.amount * (tipPercentage / 100), subtotal.currency);
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit: 'miles' | 'km' = 'miles',
): number => {
  const R = unit === 'miles' ? 3959 : 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
};

const toRad = (deg: number): number => deg * (Math.PI / 180);

export const estimateDeliveryTime = (distanceMiles: number): number => {
  const baseTime = 10;
  const perMileTime = 5;
  return Math.ceil(baseTime + distanceMiles * perMileTime);
};
