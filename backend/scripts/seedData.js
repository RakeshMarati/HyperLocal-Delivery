const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Merchant = require('../models/Merchant');
const Product = require('../models/Product');

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Merchant.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing merchants and products...');

    // Kadapa coordinates (default location)
    const kadapaCoords = {
      latitude: 14.4673,
      longitude: 78.8242,
    };

    // Create Merchants
    const merchants = [
      {
        name: 'Spice Garden Restaurant',
        description: 'Authentic South Indian cuisine with a modern twist. Best biryani in town!',
        category: 'food',
        phone: '+91 9876543210',
        email: 'spicegarden@example.com',
        address: {
          street: 'MG Road, Near Clock Tower',
          city: 'Kadapa',
          state: 'Andhra Pradesh',
          pincode: '516001',
          coordinates: {
            latitude: 14.4673,
            longitude: 78.8242,
          },
        },
        rating: 4.5,
        deliveryTime: '30-45 mins',
        minimumOrder: 200,
        isActive: true,
      },
      {
        name: 'Fresh Mart Grocery',
        description: 'Your one-stop shop for fresh vegetables, fruits, and daily essentials.',
        category: 'grocery',
        phone: '+91 9876543211',
        email: 'freshmart@example.com',
        address: {
          street: 'Gandhi Nagar, Main Street',
          city: 'Kadapa',
          state: 'Andhra Pradesh',
          pincode: '516002',
          coordinates: {
            latitude: 14.4700,
            longitude: 78.8300,
          },
        },
        rating: 4.3,
        deliveryTime: '20-30 mins',
        minimumOrder: 150,
        isActive: true,
      },
      {
        name: 'MediCare Pharmacy',
        description: '24/7 pharmacy with all your health and wellness needs.',
        category: 'pharmacy',
        phone: '+91 9876543212',
        email: 'medicare@example.com',
        address: {
          street: 'Hospital Road',
          city: 'Kadapa',
          state: 'Andhra Pradesh',
          pincode: '516003',
          coordinates: {
            latitude: 14.4650,
            longitude: 78.8200,
          },
        },
        rating: 4.7,
        deliveryTime: '15-25 mins',
        minimumOrder: 100,
        isActive: true,
      },
      {
        name: 'Pizza Corner',
        description: 'Delicious pizzas, pastas, and Italian cuisine. Fast delivery guaranteed!',
        category: 'food',
        phone: '+91 9876543213',
        email: 'pizzacorner@example.com',
        address: {
          street: 'RTC Complex Road',
          city: 'Kadapa',
          state: 'Andhra Pradesh',
          pincode: '516004',
          coordinates: {
            latitude: 14.4720,
            longitude: 78.8280,
          },
        },
        rating: 4.4,
        deliveryTime: '25-35 mins',
        minimumOrder: 250,
        isActive: true,
      },
      {
        name: 'Super Store',
        description: 'Everything you need under one roof - groceries, household items, and more.',
        category: 'grocery',
        phone: '+91 9876543214',
        email: 'superstore@example.com',
        address: {
          street: 'Bypass Road',
          city: 'Kadapa',
          state: 'Andhra Pradesh',
          pincode: '516005',
          coordinates: {
            latitude: 14.4600,
            longitude: 78.8150,
          },
        },
        rating: 4.2,
        deliveryTime: '30-40 mins',
        minimumOrder: 200,
        isActive: true,
      },
    ];

    const createdMerchants = await Merchant.insertMany(merchants);
    console.log(`Created ${createdMerchants.length} merchants...`);

    // Create Products for each merchant
    const products = [];

    // Products for Spice Garden Restaurant
    const spiceGardenId = createdMerchants[0]._id;
    products.push(
      {
        name: 'Chicken Biryani',
        description: 'Aromatic basmati rice cooked with tender chicken pieces and special spices',
        price: 250,
        category: 'main course',
        merchant: spiceGardenId,
        unit: 'plate',
        stock: 50,
        isAvailable: true,
      },
      {
        name: 'Mutton Biryani',
        description: 'Traditional mutton biryani with rich flavors and tender meat',
        price: 300,
        category: 'main course',
        merchant: spiceGardenId,
        unit: 'plate',
        stock: 30,
        isAvailable: true,
      },
      {
        name: 'Veg Thali',
        description: 'Complete vegetarian meal with rice, dal, vegetables, and roti',
        price: 120,
        category: 'thali',
        merchant: spiceGardenId,
        unit: 'plate',
        stock: 100,
        isAvailable: true,
      },
      {
        name: 'Butter Chicken',
        description: 'Creamy butter chicken with naan bread',
        price: 280,
        category: 'main course',
        merchant: spiceGardenId,
        unit: 'plate',
        stock: 40,
        isAvailable: true,
      },
      {
        name: 'Gulab Jamun',
        description: 'Sweet dessert - 2 pieces',
        price: 60,
        category: 'dessert',
        merchant: spiceGardenId,
        unit: 'piece',
        stock: 80,
        isAvailable: true,
      },
      {
        name: 'Chicken Curry',
        description: 'Spicy chicken curry with basmati rice',
        price: 220,
        category: 'main course',
        merchant: spiceGardenId,
        unit: 'plate',
        stock: 45,
        isAvailable: true,
      },
      {
        name: 'Paneer Tikka',
        description: 'Grilled cottage cheese with spices and mint chutney',
        price: 180,
        category: 'starter',
        merchant: spiceGardenId,
        unit: 'plate',
        stock: 60,
        isAvailable: true,
      },
      {
        name: 'Naan Bread',
        description: 'Fresh baked naan - 2 pieces',
        price: 50,
        category: 'bread',
        merchant: spiceGardenId,
        unit: 'piece',
        stock: 100,
        isAvailable: true,
      },
      {
        name: 'Raita',
        description: 'Cool yogurt with cucumber and spices',
        price: 40,
        category: 'side',
        merchant: spiceGardenId,
        unit: 'bowl',
        stock: 120,
        isAvailable: true,
      },
      {
        name: 'Lassi',
        description: 'Sweet yogurt drink - 300ml',
        price: 50,
        category: 'beverage',
        merchant: spiceGardenId,
        unit: 'glass',
        stock: 90,
        isAvailable: true,
      }
    );

    // Products for Fresh Mart Grocery
    const freshMartId = createdMerchants[1]._id;
    products.push(
      {
        name: 'Fresh Tomatoes',
        description: 'Fresh red tomatoes - farm to table',
        price: 40,
        category: 'vegetables',
        merchant: freshMartId,
        unit: 'kg',
        stock: 200,
        isAvailable: true,
      },
      {
        name: 'Onions',
        description: 'Fresh onions - 1 kg',
        price: 35,
        category: 'vegetables',
        merchant: freshMartId,
        unit: 'kg',
        stock: 300,
        isAvailable: true,
      },
      {
        name: 'Potatoes',
        description: 'Fresh potatoes - 1 kg',
        price: 30,
        category: 'vegetables',
        merchant: freshMartId,
        unit: 'kg',
        stock: 250,
        isAvailable: true,
      },
      {
        name: 'Bananas',
        description: 'Fresh ripe bananas - 1 dozen',
        price: 50,
        category: 'fruits',
        merchant: freshMartId,
        unit: 'dozen',
        stock: 100,
        isAvailable: true,
      },
      {
        name: 'Milk',
        description: 'Fresh full cream milk - 1 liter',
        price: 60,
        category: 'dairy',
        merchant: freshMartId,
        unit: 'liter',
        stock: 150,
        isAvailable: true,
      },
      {
        name: 'Bread',
        description: 'Fresh white bread - 1 loaf',
        price: 35,
        category: 'bakery',
        merchant: freshMartId,
        unit: 'loaf',
        stock: 80,
        isAvailable: true,
      },
      {
        name: 'Carrots',
        description: 'Fresh carrots - 1 kg',
        price: 45,
        category: 'vegetables',
        merchant: freshMartId,
        unit: 'kg',
        stock: 150,
        isAvailable: true,
      },
      {
        name: 'Apples',
        description: 'Fresh red apples - 1 kg',
        price: 120,
        category: 'fruits',
        merchant: freshMartId,
        unit: 'kg',
        stock: 80,
        isAvailable: true,
      },
      {
        name: 'Eggs',
        description: 'Farm fresh eggs - 1 dozen',
        price: 80,
        category: 'dairy',
        merchant: freshMartId,
        unit: 'dozen',
        stock: 200,
        isAvailable: true,
      },
      {
        name: 'Curd',
        description: 'Fresh curd - 500g',
        price: 40,
        category: 'dairy',
        merchant: freshMartId,
        unit: 'pack',
        stock: 100,
        isAvailable: true,
      },
      {
        name: 'Capsicum',
        description: 'Fresh green capsicum - 1 kg',
        price: 60,
        category: 'vegetables',
        merchant: freshMartId,
        unit: 'kg',
        stock: 70,
        isAvailable: true,
      },
      {
        name: 'Oranges',
        description: 'Sweet oranges - 1 kg',
        price: 80,
        category: 'fruits',
        merchant: freshMartId,
        unit: 'kg',
        stock: 90,
        isAvailable: true,
      }
    );

    // Products for MediCare Pharmacy
    const mediCareId = createdMerchants[2]._id;
    products.push(
      {
        name: 'Paracetamol 500mg',
        description: 'Pain relief and fever reducer - 10 tablets',
        price: 25,
        category: 'medicine',
        merchant: mediCareId,
        unit: 'strip',
        stock: 200,
        isAvailable: true,
      },
      {
        name: 'Band-Aid',
        description: 'Adhesive bandages - 20 pieces',
        price: 50,
        category: 'first aid',
        merchant: mediCareId,
        unit: 'pack',
        stock: 150,
        isAvailable: true,
      },
      {
        name: 'Cough Syrup',
        description: 'Relief from cough and cold - 100ml',
        price: 120,
        category: 'medicine',
        merchant: mediCareId,
        unit: 'bottle',
        stock: 80,
        isAvailable: true,
      },
      {
        name: 'Vitamin C Tablets',
        description: 'Immune booster - 30 tablets',
        price: 150,
        category: 'supplements',
        merchant: mediCareId,
        unit: 'strip',
        stock: 100,
        isAvailable: true,
      },
      {
        name: 'Hand Sanitizer',
        description: 'Alcohol-based hand sanitizer - 200ml',
        price: 80,
        category: 'hygiene',
        merchant: mediCareId,
        unit: 'bottle',
        stock: 120,
        isAvailable: true,
      },
      {
        name: 'Antacid Tablets',
        description: 'Relief from acidity - 10 tablets',
        price: 35,
        category: 'medicine',
        merchant: mediCareId,
        unit: 'strip',
        stock: 180,
        isAvailable: true,
      },
      {
        name: 'Thermometer',
        description: 'Digital thermometer',
        price: 200,
        category: 'medical device',
        merchant: mediCareId,
        unit: 'piece',
        stock: 50,
        isAvailable: true,
      },
      {
        name: 'Face Mask',
        description: 'Surgical face mask - pack of 10',
        price: 100,
        category: 'hygiene',
        merchant: mediCareId,
        unit: 'pack',
        stock: 200,
        isAvailable: true,
      },
      {
        name: 'Antiseptic Lotion',
        description: 'Dettol antiseptic - 100ml',
        price: 60,
        category: 'first aid',
        merchant: mediCareId,
        unit: 'bottle',
        stock: 100,
        isAvailable: true,
      },
      {
        name: 'Calcium Tablets',
        description: 'Calcium supplement - 30 tablets',
        price: 180,
        category: 'supplements',
        merchant: mediCareId,
        unit: 'strip',
        stock: 90,
        isAvailable: true,
      }
    );

    // Products for Pizza Corner
    const pizzaCornerId = createdMerchants[3]._id;
    products.push(
      {
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and basil',
        price: 199,
        category: 'pizza',
        merchant: pizzaCornerId,
        unit: 'medium',
        stock: 60,
        isAvailable: true,
      },
      {
        name: 'Pepperoni Pizza',
        description: 'Spicy pepperoni with cheese and herbs',
        price: 299,
        category: 'pizza',
        merchant: pizzaCornerId,
        unit: 'medium',
        stock: 50,
        isAvailable: true,
      },
      {
        name: 'Veg Supreme Pizza',
        description: 'Loaded with fresh vegetables and cheese',
        price: 249,
        category: 'pizza',
        merchant: pizzaCornerId,
        unit: 'medium',
        stock: 45,
        isAvailable: true,
      },
      {
        name: 'Garlic Bread',
        description: 'Crispy garlic bread with butter - 4 pieces',
        price: 99,
        category: 'sides',
        merchant: pizzaCornerId,
        unit: 'pack',
        stock: 80,
        isAvailable: true,
      },
      {
        name: 'Pasta Alfredo',
        description: 'Creamy white sauce pasta',
        price: 179,
        category: 'pasta',
        merchant: pizzaCornerId,
        unit: 'plate',
        stock: 40,
        isAvailable: true,
      },
      {
        name: 'Cheese Burst Pizza',
        description: 'Extra cheese pizza with stuffed crust',
        price: 349,
        category: 'pizza',
        merchant: pizzaCornerId,
        unit: 'medium',
        stock: 40,
        isAvailable: true,
      },
      {
        name: 'Chicken Wings',
        description: 'Spicy chicken wings - 6 pieces',
        price: 199,
        category: 'sides',
        merchant: pizzaCornerId,
        unit: 'pack',
        stock: 50,
        isAvailable: true,
      },
      {
        name: 'Caesar Salad',
        description: 'Fresh lettuce with caesar dressing',
        price: 149,
        category: 'salad',
        merchant: pizzaCornerId,
        unit: 'bowl',
        stock: 60,
        isAvailable: true,
      },
      {
        name: 'Coca Cola',
        description: 'Cold drink - 750ml',
        price: 50,
        category: 'beverage',
        merchant: pizzaCornerId,
        unit: 'bottle',
        stock: 150,
        isAvailable: true,
      },
      {
        name: 'Chocolate Brownie',
        description: 'Warm chocolate brownie with ice cream',
        price: 129,
        category: 'dessert',
        merchant: pizzaCornerId,
        unit: 'piece',
        stock: 70,
        isAvailable: true,
      }
    );

    // Products for Super Store
    const superStoreId = createdMerchants[4]._id;
    products.push(
      {
        name: 'Rice',
        description: 'Premium basmati rice - 5 kg',
        price: 350,
        category: 'staples',
        merchant: superStoreId,
        unit: 'pack',
        stock: 100,
        isAvailable: true,
      },
      {
        name: 'Cooking Oil',
        description: 'Sunflower oil - 1 liter',
        price: 140,
        category: 'staples',
        merchant: superStoreId,
        unit: 'bottle',
        stock: 150,
        isAvailable: true,
      },
      {
        name: 'Sugar',
        description: 'White sugar - 1 kg',
        price: 45,
        category: 'staples',
        merchant: superStoreId,
        unit: 'kg',
        stock: 200,
        isAvailable: true,
      },
      {
        name: 'Salt',
        description: 'Iodized salt - 1 kg',
        price: 20,
        category: 'staples',
        merchant: superStoreId,
        unit: 'kg',
        stock: 300,
        isAvailable: true,
      },
      {
        name: 'Toilet Paper',
        description: 'Soft toilet paper - 4 rolls',
        price: 120,
        category: 'household',
        merchant: superStoreId,
        unit: 'pack',
        stock: 100,
        isAvailable: true,
      },
      {
        name: 'Wheat Flour',
        description: 'Premium wheat flour - 5 kg',
        price: 180,
        category: 'staples',
        merchant: superStoreId,
        unit: 'pack',
        stock: 120,
        isAvailable: true,
      },
      {
        name: 'Turmeric Powder',
        description: 'Pure turmeric powder - 200g',
        price: 60,
        category: 'spices',
        merchant: superStoreId,
        unit: 'pack',
        stock: 150,
        isAvailable: true,
      },
      {
        name: 'Red Chili Powder',
        description: 'Spicy red chili powder - 200g',
        price: 55,
        category: 'spices',
        merchant: superStoreId,
        unit: 'pack',
        stock: 140,
        isAvailable: true,
      },
      {
        name: 'Tea',
        description: 'Premium tea leaves - 250g',
        price: 120,
        category: 'beverages',
        merchant: superStoreId,
        unit: 'pack',
        stock: 110,
        isAvailable: true,
      },
      {
        name: 'Coffee',
        description: 'Instant coffee - 200g',
        price: 150,
        category: 'beverages',
        merchant: superStoreId,
        unit: 'pack',
        stock: 100,
        isAvailable: true,
      },
      {
        name: 'Soap',
        description: 'Bathing soap - 3 pieces',
        price: 90,
        category: 'household',
        merchant: superStoreId,
        unit: 'pack',
        stock: 200,
        isAvailable: true,
      },
      {
        name: 'Detergent Powder',
        description: 'Washing powder - 1 kg',
        price: 110,
        category: 'household',
        merchant: superStoreId,
        unit: 'pack',
        stock: 130,
        isAvailable: true,
      }
    );

    const createdProducts = await Product.insertMany(products);
    console.log(`Created ${createdProducts.length} products...`);

    console.log('\n✅ Seed data created successfully!');
    console.log(`   - ${createdMerchants.length} Merchants`);
    console.log(`   - ${createdProducts.length} Products`);
    console.log('\nYou can now test the application with this sample data.');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run seed
connectDB().then(() => {
  seedData();
});

