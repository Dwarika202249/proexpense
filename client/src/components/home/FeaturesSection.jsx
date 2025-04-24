const FeaturesSection = () => {
    const features = [
      "💸 Add & Track Expenses",
      "📊 Visualize Monthly Trends",
      "📁 Export as CSV",
      "🔒 Secure Login & Google OAuth",
      "📈 AI-Powered Categorization (coming soon!)"
    ];
  
    return (
      <section className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Features You'll Love</h2>
        <ul className="space-y-3 text-lg text-gray-700">
          {features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </section>
    );
  };
  
  export default FeaturesSection;
  