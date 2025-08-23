
export const PAYMENT_PLANS: PaymentPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 999,
    originalPrice: 1299,
    features: [
      'View up to 50 profiles',
      'Send up to 10 interests',
      'Basic search filters',
      '24/7 customer support'
    ],
    duration: '3 months'
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 2499,
    originalPrice: 2999,
    features: [
      'View unlimited profiles',
      'Send unlimited interests',
      'Advanced search filters',
      'Horoscope matching',
      'Priority customer support',
      'Profile highlighting'
    ],
    duration: '6 months',
    popular: true
  },
  {
    id: 'vip',
    name: 'VIP Plan',
    price: 4999,
    originalPrice: 5999,
    features: [
      'All Premium features',
      'Personal relationship manager',
      'Expert consultation',
      'Premium profile badge',
      'First preference in search',
      'Video call assistance'
    ],
    duration: '12 months'
  }
];

export const BANKS = [
  { id: 'sbi', name: 'State Bank of India' },
  { id: 'hdfc', name: 'HDFC Bank' },
  { id: 'icici', name: 'ICICI Bank' },
  { id: 'axis', name: 'Axis Bank' },
  { id: 'kotak', name: 'Kotak Mahindra Bank' },
  { id: 'pnb', name: 'Punjab National Bank' },
  { id: 'bob', name: 'Bank of Baroda' },
  { id: 'canara', name: 'Canara Bank' }
];

export const UPI_APPS = [
  { id: 'gpay', name: 'Google Pay', icon: '🟢' },
  { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
  { id: 'paytm', name: 'Paytm', icon: '🔵' },
  { id: 'bhim', name: 'BHIM UPI', icon: '🟠' }
];
