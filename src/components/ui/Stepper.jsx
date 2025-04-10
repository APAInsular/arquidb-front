const Stepper = ({ currentStep, totalSteps = 3 }) => {

    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center my-2">
            {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                    <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold transition-all duration-300 ${currentStep === step
                            ? "bg-red-800 scale-110"
                            : currentStep > step
                                ? "bg-red-300"
                                : "bg-gray-300 text-gray-800"}`}>
                        {step}
                    </div>

                    {index < steps.length - 1 && (
                        <div className="w-10 h-[2px] bg-gray-500 mx-2 rounded"></div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Stepper;