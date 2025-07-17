import { useState } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    airFryerCost: '',
    spidrPin: '',
  });

  const [showPin, setShowPin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! Check the console.");
    console.log('Form submitted:', formData);
  };

  const formatPin = (pin) =>
    pin.replace(/[^0-9]/g, '').slice(0, 16).replace(/(.{4})(?=.)/g, '$1-');

  const getMaskedPin = (pin) =>
    formatPin(pin).replace(/\d/g, '#');

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0d0d0d] overflow-hidden px-4">
      {/* Background animation */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={{
          background: { color: { value: "#0d0d0d" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              resize: true,
            },
            modes: {
              grab: {
                distance: 200,
                links: { opacity: 0.4 },
              },
            },
          },
          particles: {
            number: { value: 80, density: { enable: true, area: 800 } },
            color: { value: "#ffffff" },
            links: {
              enable: true,
              distance: 140,
              color: "#ffffff",
              opacity: 0.2,
              width: 0.7,
            },
            move: { enable: true, speed: 0.6, outModes: { default: "bounce" } },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2.5 } },
          },
          detectRetina: true,
        }}
      />

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-xl bg-[#111] border border-purple-700 rounded-2xl shadow-xl shadow-purple-900/40 p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-white tracking-wider">
          Spidr Interest Form 🕸️
        </h2>

        {/* Fields */}
        {[
          { name: 'firstName', label: 'First Name' },
          { name: 'lastName', label: 'Last Name' },
          {
            name: 'phone',
            label: 'Phone Number',
            type: 'tel',
            pattern: '[0-9]{10}',
            maxLength: 10,
            inputMode: 'numeric',
            onKeyPress: (e) => {
              if (!/[0-9]/.test(e.key)) e.preventDefault();
            },
          },
          {
            name: 'email',
            label: 'Email Address',
            type: 'email',
            pattern: '^[\\w.+\\-]+@gmail\\.com$',
          },
          {
            name: 'airFryerCost',
            label: 'Guess the air fryer’s cost',
          },
        ].map(({ name, label, ...rest }) => (
          <div key={name} className="relative z-0 w-full group">
            <input
              type={rest.type || 'text'}
              name={name}
              id={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder=" "
              required
              {...rest}
              className="block px-4 pt-5 pb-2 w-full text-md text-white bg-transparent rounded-md border border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-purple-400 peer"
            />
            <label
              htmlFor={name}
              className="absolute text-md text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2.5 left-4 z-10 origin-[0] bg-[#111] px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              {label}
            </label>
          </div>
        ))}

        {/* Spidr PIN */}
        <div className="relative z-0 w-full group">
          {showPin ? (
            <input
              type="text"
              name="spidrPin"
              id="spidrPin"
              value={formatPin(formData.spidrPin)}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/[^0-9]/g, '').slice(0, 16);
                setFormData({ ...formData, spidrPin: digitsOnly });
              }}
              placeholder=" "
              required
              pattern="\\d{4}-\\d{4}-\\d{4}-\\d{4}"
              className="block px-4 pt-5 pb-2 w-full text-md text-white bg-transparent rounded-md border border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-purple-400 peer pr-10 tracking-widest font-mono"
            />
          ) : (
            <>
              <input
                type="text"
                disabled
                value={getMaskedPin(formData.spidrPin)}
                placeholder=" "
                className="block px-4 pt-5 pb-2 w-full text-md text-white bg-transparent rounded-md border border-gray-500 peer pr-10 tracking-widest font-mono opacity-70"
              />
              <input
                type="text"
                value={formatPin(formData.spidrPin)}
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/[^0-9]/g, '').slice(0, 16);
                  setFormData({ ...formData, spidrPin: digitsOnly });
                }}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-text"
              />
            </>
          )}

          <label
            htmlFor="spidrPin"
            className="absolute text-md text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2.5 left-4 z-10 origin-[0] bg-[#111] px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            16-digit Spidr PIN (####-####-####-####)
          </label>
          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-xl"
          >
            {showPin ? '👁️' : ' 🙈'}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="relative inline-block px-8 py-3 font-semibold text-white group hover:text-black transition-all duration-300"
        >
          <span className="absolute inset-0 w-full h-full bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-md"></span>
          <span className="relative z-10">Submit</span>
        </button>
      </form>
    </div>
  );
}

