export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Your AI-Powered Fitness Companion
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your fitness journey with personalized workout guidance, form correction, and nutrition planning.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Muscle Building */}
          <div className="bg-gray-800 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-blue-400 text-4xl mb-4">💪</div>
            <h2 className="text-2xl font-semibold mb-4">Smart Muscle Building</h2>
            <p className="text-gray-300">
              Get personalized workout plans that adapt to your progress. Our AI analyzes your performance and adjusts your routine for optimal muscle growth.
            </p>
          </div>

          {/* Calorie Count */}
          <div className="bg-gray-800 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-purple-400 text-4xl mb-4">📊</div>
            <h2 className="text-2xl font-semibold mb-4">Smart Calorie Tracking</h2>
            <p className="text-gray-300">
              Track your daily calorie intake and expenditure with precision. Our AI helps you maintain the perfect caloric balance for your fitness goals.
            </p>
          </div>

          {/* Nutrition Planning */}
          <div className="bg-gray-800 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
            <div className="text-green-400 text-4xl mb-4">🥗</div>
            <h2 className="text-2xl font-semibold mb-4">Personalized Nutrition</h2>
            <p className="text-gray-300">
              Fuel your gains with customized meal plans and nutrition advice. Get recommendations based on your goals, preferences, and dietary restrictions.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity">
            Start Your Journey
          </button>
        </div>
      </section>
    </main>
  )
}
