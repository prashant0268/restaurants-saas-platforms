export interface MockMenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  emoji: string;
  dietary: string[];
  description: string;
}

export interface MockOrder {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: string;
  time: string;
}

export interface MockCampaign {
  id: string;
  name: string;
  channel: string;
  status: string;
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
  startDate: string;
  endDate: string;
}

export const mockMenuCategories = [
  { id: 'appetizers', name: 'Appetizers', emoji: '\u{1F958}', itemCount: 6 },
  { id: 'tandoori', name: 'Tandoori', emoji: '\u{1F525}', itemCount: 5 },
  { id: 'chicken', name: 'Chicken', emoji: '\u{1F357}', itemCount: 5 },
  { id: 'lamb-goat', name: 'Lamb & Goat', emoji: '\u{1F356}', itemCount: 5 },
  { id: 'vegetarian', name: 'Vegetarian', emoji: '\u{1F966}', itemCount: 5 },
  { id: 'biryani', name: 'Biryani & Rice', emoji: '\u{1F35A}', itemCount: 4 },
  { id: 'breads', name: 'Breads', emoji: '\u{1FAD3}', itemCount: 4 },
  { id: 'desserts', name: 'Desserts', emoji: '\u{1F36E}', itemCount: 4 },
];

export const mockMenuItems: MockMenuItem[] = [
  // Appetizers
  { id: '1', name: 'Vegetable Samosa', price: 8.00, category: 'appetizers', emoji: '\u{1F95F}', dietary: ['vegetarian'], description: 'Crisp turnover filled with spiced potatoes and peas' },
  { id: '2', name: 'Vegetable Pakora', price: 10.95, category: 'appetizers', emoji: '\u{1F9C6}', dietary: ['vegetarian'], description: 'Fresh vegetables in spiced batter, fried golden' },
  { id: '3', name: 'Pani Puri', price: 9.95, category: 'appetizers', emoji: '\u{1F963}', dietary: ['vegetarian'], description: 'Crispy puffed bread with tangy mint water' },
  { id: '4', name: 'Chicken Pakora', price: 12.95, category: 'appetizers', emoji: '\u{1F357}', dietary: [], description: 'Chicken pieces in spiced batter, fried crispy' },
  { id: '5', name: 'Aloo Tikki Chaat', price: 12.95, category: 'appetizers', emoji: '\u{1F954}', dietary: ['vegetarian'], description: 'Potato patties topped with chickpeas & chutneys' },
  { id: '6', name: 'Amritsari Fish', price: 15.95, category: 'appetizers', emoji: '\u{1F41F}', dietary: [], description: 'Chunks of fish lightly fried in spiced batter' },

  // Tandoori
  { id: '7', name: 'Tandoori Chicken', price: 17.95, category: 'tandoori', emoji: '\u{1F525}', dietary: [], description: 'Chicken marinated in spiced yogurt, roasted in clay oven' },
  { id: '8', name: 'Chicken Tikka', price: 17.95, category: 'tandoori', emoji: '\u{1F362}', dietary: [], description: 'Boneless chicken with flavored spices, tandoor roasted' },
  { id: '9', name: 'Seekh Kabab', price: 17.95, category: 'tandoori', emoji: '\u{1F356}', dietary: [], description: 'Minced lamb with onions and herbs on skewers' },
  { id: '10', name: 'Paneer Tikka', price: 16.95, category: 'tandoori', emoji: '\u{1F9C0}', dietary: ['vegetarian'], description: 'Cottage cheese marinated and roasted in tandoor' },
  { id: '11', name: 'Lamb Chops', price: 27.95, category: 'tandoori', emoji: '\u{1F969}', dietary: [], description: 'Ribs of lamb with special spices in tandoor' },

  // Chicken
  { id: '12', name: 'Chicken Makhni', price: 17.95, category: 'chicken', emoji: '\u{1F35B}', dietary: [], description: 'Butter chicken — tandoori chicken in creamy sauce' },
  { id: '13', name: 'Chicken Tikka Masala', price: 17.95, category: 'chicken', emoji: '\u{1F372}', dietary: [], description: 'Boneless chicken tikka in rich spiced gravy' },
  { id: '14', name: 'Chicken Saag', price: 16.95, category: 'chicken', emoji: '\u{1F33F}', dietary: [], description: 'Chicken cooked with mustard leaves and spinach' },
  { id: '15', name: 'Chicken Korma', price: 17.95, category: 'chicken', emoji: '\u{1F95B}', dietary: [], description: 'Chicken pieces flavored with coconut cream' },
  { id: '16', name: 'Chicken Vindaloo', price: 16.95, category: 'chicken', emoji: '\u{1F336}', dietary: [], description: 'Chicken and potato in tangy hot sauce' },

  // Lamb & Goat
  { id: '17', name: 'Goat Curry', price: 20.95, category: 'lamb-goat', emoji: '\u{1F372}', dietary: [], description: 'Tender goat pieces in authentic Indian curry' },
  { id: '18', name: 'Lamb Rogan Josh', price: 20.95, category: 'lamb-goat', emoji: '\u{1F525}', dietary: [], description: 'Lamb marinated in spices with chopped tomatoes' },
  { id: '19', name: 'Lamb Tikka Masala', price: 20.95, category: 'lamb-goat', emoji: '\u{1F356}', dietary: [], description: 'Tandoor-baked lamb in thick masala sauce' },
  { id: '20', name: 'Keema Mutter', price: 20.95, category: 'lamb-goat', emoji: '\u{1F95C}', dietary: [], description: 'Ground lamb with yogurt and green peas' },
  { id: '21', name: 'Lamb Saag', price: 20.95, category: 'lamb-goat', emoji: '\u{1F33F}', dietary: [], description: 'Lamb cooked in exotic spices and spinach' },

  // Vegetarian
  { id: '22', name: 'Saag Paneer', price: 16.95, category: 'vegetarian', emoji: '\u{1F966}', dietary: ['vegetarian'], description: 'Spinach and cottage cheese in tasty spices' },
  { id: '23', name: 'Malai Kofta', price: 16.95, category: 'vegetarian', emoji: '\u{1F9C6}', dietary: ['vegetarian'], description: 'Cheese-stuffed veggie balls in spiced cream' },
  { id: '24', name: 'Channa Masala', price: 15.95, category: 'vegetarian', emoji: '\u{1F35B}', dietary: ['vegetarian'], description: 'Chickpeas with onions and tomatoes in light sauce' },
  { id: '25', name: 'Dal Makhni', price: 15.95, category: 'vegetarian', emoji: '\u{1F958}', dietary: ['vegetarian'], description: 'Black lentils in butter with cream and spices' },
  { id: '26', name: 'Paneer Makhni', price: 16.95, category: 'vegetarian', emoji: '\u{1F9C0}', dietary: ['vegetarian'], description: 'Cottage cheese cubes in creamy butter sauce' },

  // Biryani & Rice
  { id: '27', name: 'Chicken Biryani', price: 17.95, category: 'biryani', emoji: '\u{1F35A}', dietary: [], description: 'Chicken with fragrant rice, herbs, and nuts' },
  { id: '28', name: 'Lamb Biryani', price: 19.95, category: 'biryani', emoji: '\u{1F35A}', dietary: [], description: 'Lamb with fragrant rice, herbs, and nuts' },
  { id: '29', name: 'Goat Biryani', price: 19.95, category: 'biryani', emoji: '\u{1F35A}', dietary: [], description: 'Goat with fragrant rice, herbs, and nuts' },
  { id: '30', name: 'Vegetable Biryani', price: 16.95, category: 'biryani', emoji: '\u{1F35A}', dietary: ['vegetarian'], description: 'Seasonal vegetables with fragrant rice and nuts' },

  // Breads
  { id: '31', name: 'Garlic Naan', price: 5.75, category: 'breads', emoji: '\u{1FAD3}', dietary: ['vegetarian'], description: 'Tandoor-baked bread with fresh garlic' },
  { id: '32', name: 'Peshawari Naan', price: 6.95, category: 'breads', emoji: '\u{1FAD3}', dietary: ['vegetarian'], description: 'Naan stuffed with dry fruits and nuts' },
  { id: '33', name: 'Aloo Kulcha', price: 6.95, category: 'breads', emoji: '\u{1FAD3}', dietary: ['vegetarian'], description: 'Naan with spiced potato filling' },
  { id: '34', name: 'Keema Kulcha', price: 7.95, category: 'breads', emoji: '\u{1FAD3}', dietary: [], description: 'Naan stuffed with spiced minced meat' },

  // Desserts
  { id: '35', name: 'Gulab Jamun', price: 6.95, category: 'desserts', emoji: '\u{1F36E}', dietary: ['vegetarian'], description: 'Deep-fried milk balls in rose sugar syrup' },
  { id: '36', name: 'Rasmalai', price: 6.95, category: 'desserts', emoji: '\u{1F95B}', dietary: ['vegetarian'], description: 'Cottage cheese patties in sweet cream' },
  { id: '37', name: 'Kulfi', price: 6.95, category: 'desserts', emoji: '\u{1F368}', dietary: ['vegetarian'], description: 'Authentic Indian ice cream with milk and nuts' },
  { id: '38', name: 'Gajar Halwa', price: 6.95, category: 'desserts', emoji: '\u{1F955}', dietary: ['vegetarian'], description: 'Sweet carrot pudding with cardamom and nuts' },
];

export const mockOrders: MockOrder[] = [
  { id: 'ORD-001', customer: 'John D.', items: ['Margherita Pizza', 'Tiramisu'], total: 23.98, status: 'preparing', time: '2 min ago' },
  { id: 'ORD-002', customer: 'Sarah M.', items: ['Grilled Salmon', 'House Red Wine'], total: 32.98, status: 'confirmed', time: '5 min ago' },
  { id: 'ORD-003', customer: 'Mike R.', items: ['Classic Burger', 'Sparkling Water'], total: 18.98, status: 'ready', time: '12 min ago' },
  { id: 'ORD-004', customer: 'Emily K.', items: ['Spaghetti Carbonara', 'Caprese Salad', 'Espresso'], total: 31.47, status: 'out_for_delivery', time: '18 min ago' },
  { id: 'ORD-005', customer: 'David L.', items: ['Pepperoni Pizza', 'Garlic Bread'], total: 23.98, status: 'delivered', time: '35 min ago' },
];

export const mockCampaigns: MockCampaign[] = [
  { id: '1', name: 'Weekend Brunch Special', channel: 'Email', status: 'active', sent: 2450, opened: 1180, clicked: 340, converted: 89, startDate: 'Feb 24, 2026', endDate: 'Feb 28, 2026' },
  { id: '2', name: 'Happy Hour Promo', channel: 'Instagram', status: 'active', sent: 0, opened: 0, clicked: 520, converted: 145, startDate: 'Feb 22, 2026', endDate: 'Mar 7, 2026' },
  { id: '3', name: 'New Menu Launch', channel: 'Facebook', status: 'scheduled', sent: 0, opened: 0, clicked: 0, converted: 0, startDate: 'Mar 3, 2026', endDate: 'Mar 10, 2026' },
  { id: '4', name: 'Loyalty Member Exclusive', channel: 'Push', status: 'completed', sent: 890, opened: 670, clicked: 230, converted: 67, startDate: 'Feb 8, 2026', endDate: 'Feb 21, 2026' },
  { id: '5', name: 'Valentine\'s Day Dinner', channel: 'Email', status: 'completed', sent: 3200, opened: 1920, clicked: 780, converted: 210, startDate: 'Jan 25, 2026', endDate: 'Feb 14, 2026' },
];

export const mockAnalytics = {
  revenue: { today: 2847, week: 18420, month: 67830, trend: 12.4 },
  orders: { today: 47, week: 312, month: 1205, trend: 8.7 },
  customers: { total: 3240, new: 186, returning: 78, trend: 15.2 },
  rating: { average: 4.7, total: 892, fivestar: 523 },
  topItems: [
    { name: 'Chicken Makhni', orders: 234, revenue: 4207 },
    { name: 'Lamb Biryani', orders: 198, revenue: 3940 },
    { name: 'Tandoori Chicken', orders: 176, revenue: 3160 },
    { name: 'Chicken Tikka Masala', orders: 145, revenue: 2605 },
    { name: 'Gulab Jamun', orders: 132, revenue: 917 },
  ],
  peakHours: [
    { hour: '11 AM', orders: 22 },
    { hour: '12 PM', orders: 38 },
    { hour: '1 PM', orders: 35 },
    { hour: '5 PM', orders: 28 },
    { hour: '6 PM', orders: 42 },
    { hour: '7 PM', orders: 45 },
    { hour: '8 PM', orders: 36 },
    { hour: '9 PM', orders: 18 },
  ],
};

export const mockStaff = [
  { id: '1', name: 'Priya Kaur', role: 'Manager', status: 'on-shift', hours: '9AM-5PM' },
  { id: '2', name: 'Rajinder Singh', role: 'Head Chef', status: 'on-shift', hours: '10AM-6PM' },
  { id: '3', name: 'Simran Sharma', role: 'Server', status: 'on-shift', hours: '11AM-7PM' },
  { id: '4', name: 'Harjit Patel', role: 'Server', status: 'off-shift', hours: '4PM-10PM' },
  { id: '5', name: 'Aman Verma', role: 'Bartender', status: 'on-shift', hours: '3PM-11PM' },
  { id: '6', name: 'Vikram Singh', role: 'Line Cook', status: 'on-shift', hours: '10AM-6PM' },
];

export const mockReservations = [
  { id: '1', name: 'Thompson Party', guests: 4, time: '6:00 PM', table: 'T-5', status: 'confirmed' },
  { id: '2', name: 'Davis Celebration', guests: 8, time: '7:00 PM', table: 'T-12', status: 'confirmed' },
  { id: '3', name: 'Lee Dinner', guests: 2, time: '7:30 PM', table: 'T-3', status: 'pending' },
  { id: '4', name: 'Martinez Family', guests: 6, time: '8:00 PM', table: 'T-8', status: 'confirmed' },
  { id: '5', name: 'Brown Anniversary', guests: 2, time: '8:30 PM', table: 'T-1', status: 'seated' },
];

export const mockLoyaltyStats = {
  totalMembers: 1840,
  activeMembers: 1245,
  pointsIssued: 48750,
  rewardsRedeemed: 312,
  topRewards: [
    { name: 'Free Dessert', redemptions: 145 },
    { name: '$10 Off Order', redemptions: 89 },
    { name: 'Free Appetizer', redemptions: 78 },
  ],
};
