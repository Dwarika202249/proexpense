const TestimonialsSection = () => {
    const reviews = [
      {
        name: "Aman",
        comment: "ProExpense helped me control my monthly spending. Love the UI!"
      },
      {
        name: "Neha",
        comment: "Simple, clean, and useful. I check my dashboard every day!"
      },
      {
        name: "Ravi",
        comment: "The Google login was seamless. Excited for the AI features!"
      }
    ];
  
    return (
      <section className="py-16 px-4 bg-gray-100 text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-6">What Users Say</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {reviews.map((r, idx) => (
            <div key={idx} className="w-64 bg-white p-6 rounded shadow text-gray-700">
              <p className="italic">"{r.comment}"</p>
              <p className="mt-4 font-semibold text-green-600">- {r.name}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default TestimonialsSection;
  