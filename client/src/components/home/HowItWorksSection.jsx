const HowItWorksSection = () => {
    const steps = [
      { step: "1", text: "Sign up or Login with Google" },
      { step: "2", text: "Set your monthly income" },
      { step: "3", text: "Add daily expenses" },
      { step: "4", text: "Track trends & insights" },
      { step: "5", text: "Get smart AI tips (soon!)" }
    ];
  
    return (
      <section className="py-16 bg-white text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-6">How It Works</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {steps.map((s, idx) => (
            <div key={idx} className="w-48 bg-green-50 p-4 rounded shadow text-gray-700">
              <div className="text-4xl font-bold text-green-600 mb-2">{s.step}</div>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default HowItWorksSection;
  