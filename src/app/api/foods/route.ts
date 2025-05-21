import { NextResponse } from 'next/server';

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
}

const foodItems: FoodItem[] = [
  // Breakfast Items
  {
    id: 1,
    name: "Oats (100g)",
    calories: 389,
    protein: 16.9,
    carbs: 66.3,
    fat: 6.9,
    category: "Breakfast"
  },
  {
    id: 2,
    name: "Peanut Butter (100g)",
    calories: 588,
    protein: 25.1,
    carbs: 20,
    fat: 50,
    category: "Protein"
  },
  {
    id: 3,
    name: "Brown Bread (100g)",
    calories: 259,
    protein: 9.4,
    carbs: 48.5,
    fat: 3.2,
    category: "Carbs"
  },
  {
    id: 4,
    name: "Eggs (100g)",
    calories: 155,
    protein: 12.6,
    carbs: 1.1,
    fat: 11.3,
    category: "Protein"
  },
  // Protein Sources
  {
    id: 5,
    name: "Salmon (100g)",
    calories: 208,
    protein: 22,
    carbs: 0,
    fat: 13,
    category: "Protein"
  },
  {
    id: 6,
    name: "Mutton (100g)",
    calories: 294,
    protein: 25.6,
    carbs: 0,
    fat: 21.2,
    category: "Protein"
  },
  {
    id: 7,
    name: "Chicken Breast (100g)",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    category: "Protein"
  },
  {
    id: 8,
    name: "Tuna (100g)",
    calories: 132,
    protein: 28.2,
    carbs: 0,
    fat: 1.2,
    category: "Protein"
  },
  // Fruits
  {
    id: 9,
    name: "Apple (100g)",
    calories: 52,
    protein: 0.3,
    carbs: 13.8,
    fat: 0.2,
    category: "Fruits"
  },
  {
    id: 10,
    name: "Banana (100g)",
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fat: 0.3,
    category: "Fruits"
  },
  {
    id: 11,
    name: "Blueberries (100g)",
    calories: 57,
    protein: 0.7,
    carbs: 14.5,
    fat: 0.3,
    category: "Fruits"
  },
  // Vegetables
  {
    id: 12,
    name: "Broccoli (100g)",
    calories: 34,
    protein: 2.8,
    carbs: 6.6,
    fat: 0.4,
    category: "Vegetables"
  },
  {
    id: 13,
    name: "Spinach (100g)",
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    category: "Vegetables"
  },
  {
    id: 14,
    name: "Sweet Potato (100g)",
    calories: 86,
    protein: 1.6,
    carbs: 20.1,
    fat: 0.1,
    category: "Vegetables"
  },
  // Dairy
  {
    id: 15,
    name: "Greek Yogurt (100g)",
    calories: 59,
    protein: 10.3,
    carbs: 3.6,
    fat: 0.4,
    category: "Dairy"
  },
  {
    id: 16,
    name: "Cottage Cheese (100g)",
    calories: 98,
    protein: 11.1,
    carbs: 3.4,
    fat: 4.3,
    category: "Dairy"
  },
  // Nuts and Seeds
  {
    id: 17,
    name: "Almonds (100g)",
    calories: 579,
    protein: 21.2,
    carbs: 21.7,
    fat: 49.9,
    category: "Nuts"
  },
  {
    id: 18,
    name: "Chia Seeds (100g)",
    calories: 486,
    protein: 16.5,
    carbs: 42.1,
    fat: 30.7,
    category: "Seeds"
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let filteredFoods = [...foodItems];

  // Filter by category if provided
  if (category) {
    filteredFoods = filteredFoods.filter(food => 
      food.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by search term if provided
  if (search) {
    filteredFoods = filteredFoods.filter(food =>
      food.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return NextResponse.json({
    foods: filteredFoods,
    total: filteredFoods.length
  });
} 