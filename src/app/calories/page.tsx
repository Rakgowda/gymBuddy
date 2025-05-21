'use client';

import { useState, useEffect } from 'react';

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
}

export default function CaloriePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        // add category to the url
        const response = await fetch(`/api/foods${category ? `?search=${searchTerm}&category=${category}` : ''}`);
        if (!response.ok) {
          throw new Error('Failed to fetch food items');
        }
        const data = await response.json();
        setFoodItems(data.foods);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [searchTerm, category]);

  const categories = Array.from(new Set(foodItems.map(item => item.category)));

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4">Loading food items...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-red-500">
            <p>Error: {error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Calorie Tracker
        </h1>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for food items..."
            className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              onClick={() => setCategory(category)}
            >
              {category}
            </button>
          ))}
          {/* add clear filter button */}
          <button
            className="px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            onClick={() => setCategory('')}
          >
            Clear Filter
          </button>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.map((food) => (
            <div
              key={food.id}
              className="bg-gray-800 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">{food.name}</h2>
                <span className="px-3 py-1 bg-blue-500 rounded-full text-sm">
                  {food.category}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Calories</span>
                  <span className="font-semibold">{food.calories} kcal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Protein</span>
                  <span className="font-semibold">{food.protein}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Carbs</span>
                  <span className="font-semibold">{food.carbs}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fat</span>
                  <span className="font-semibold">{food.fat}g</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Food Button */}
        <div className="fixed bottom-8 right-8">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:opacity-90 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}