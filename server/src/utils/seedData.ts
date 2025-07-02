import User from '../models/User';
import Product from '../models/Product';
import connectDB from '../config/database';
import dotenv from 'dotenv';

dotenv.config();

const sampleProducts = [
  {
    name: 'Fresh Organic Apples',
    description: 'Crisp and sweet organic apples, perfect for snacking or baking.',
    price: 4.99,
    category: 'fruits',
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400'
  },
  {
    name: 'Organic Bananas',
    description: 'Ripe organic bananas, great source of potassium and energy.',
    price: 2.99,
    category: 'fruits',
    stock: 150,
    imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400'
  },
  {
    name: 'Fresh Spinach',
    description: 'Nutrient-rich fresh spinach leaves, perfect for salads and cooking.',
    price: 3.49,
    category: 'vegetables',
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400'
  },
  {
    name: 'Organic Broccoli',
    description: 'Fresh organic broccoli crowns, packed with vitamins and minerals.',
    price: 3.99,
    category: 'vegetables',
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400'
  },
  {
    name: 'Whole Milk',
    description: 'Fresh whole milk, rich in calcium and protein.',
    price: 3.79,
    category: 'dairy',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400'
  },
  {
    name: 'Greek Yogurt',
    description: 'Creamy Greek yogurt with probiotics, available in various flavors.',
    price: 5.99,
    category: 'dairy',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?w=400'
  },
  {
    name: 'Fresh Salmon Fillet',
    description: 'Wild-caught salmon fillet, rich in omega-3 fatty acids.',
    price: 12.99,
    category: 'meat',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400'
  },
  {
    name: 'Organic Chicken Breast',
    description: 'Lean organic chicken breast, perfect for healthy meals.',
    price: 8.99,
    category: 'meat',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400'
  },
  {
    name: 'Artisan Sourdough Bread',
    description: 'Freshly baked artisan sourdough bread with a perfect crust.',
    price: 4.49,
    category: 'bakery',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'
  },
  {
    name: 'Chocolate Croissants',
    description: 'Buttery, flaky croissants filled with rich chocolate.',
    price: 6.99,
    category: 'bakery',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
  },
  {
    name: 'Orange Juice',
    description: 'Fresh squeezed orange juice, no added sugar or preservatives.',
    price: 4.99,
    category: 'beverages',
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400'
  },
  {
    name: 'Organic Green Tea',
    description: 'Premium organic green tea leaves, antioxidant-rich and refreshing.',
    price: 7.99,
    category: 'beverages',
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=400'
  }
];

const createAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@urbanmunch.com' });
    
    if (!existingAdmin) {
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@urbanmunch.com',
        password: 'admin123',
        isAdmin: true
      });
      
      await adminUser.save();
      console.log('✅ Admin user created successfully');
      console.log('📧 Email: admin@urbanmunch.com');
      console.log('🔑 Password: admin123');
    } else {
      console.log('ℹ️  Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
};

const seedProducts = async () => {
  try {
    const existingProducts = await Product.countDocuments();
    
    if (existingProducts === 0) {
      await Product.insertMany(sampleProducts);
      console.log(`✅ ${sampleProducts.length} sample products added successfully`);
    } else {
      console.log('ℹ️  Products already exist in database');
    }
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('🌱 Starting database seeding...');
    
    await createAdminUser();
    await seedProducts();
    
    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

export { seedDatabase, createAdminUser, seedProducts };