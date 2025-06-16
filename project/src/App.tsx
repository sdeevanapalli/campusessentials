import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Store,
  User,
  Bus,
  Car,
  Phone,
  Utensils,
  MapPin,
  AlertTriangle
} from 'lucide-react';

// Collapsible Section with smooth animations
interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  children,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(isOpen ? scrollHeight : 0);
    }
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg mb-6 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <button
        onClick={toggleOpen}
        className="w-full p-6 flex items-center justify-between text-left bg-gradient-to-r from-blue-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 hover:from-blue-100 hover:to-orange-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300"
      >
        <div className="flex items-center space-x-3">
          <div className={`text-blue-600 dark:text-orange-400 transition-transform duration-300 ${isOpen ? 'scale-110' : 'scale-100'}`}>
            {icon}
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
        </div>
        <div className={`text-blue-600 dark:text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <ChevronDown size={24} />
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ height: height }}
      >
        <div ref={contentRef} className="p-6 pt-0">
          <div className={`transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mess Menu with slide animation
const MessMenuToggle: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  
  return (
    <>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-medium transform hover:scale-105 active:scale-95"
      >
        <span className="flex items-center space-x-2">
          <span>{showMenu ? 'Hide Menu' : 'Show Menu'}</span>
          <ChevronDown className={`transition-transform duration-300 ${showMenu ? 'rotate-180' : 'rotate-0'}`} size={16} />
        </span>
      </button>
      <div className={`mt-4 transition-all duration-500 ease-in-out overflow-hidden ${showMenu ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className={`transition-all duration-500 ${showMenu ? 'transform translate-y-0' : 'transform -translate-y-4'}`}>
          <img
            src="/menu-photo.jpg"
            alt="Mess Menu"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>
    </>
  );
};

// Contact Card with hover animations
const ContactCard: React.FC<{ name: string; phone: string; label?: string }> = ({
  name,
  phone,
  label
}) => (
  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-102 hover:shadow-md">
    <div className="flex justify-between items-center">
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-white transition-colors duration-200">{name}</h4>
        {label && <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">{label}</p>}
      </div>
      <a
        href={`tel:${phone}`}
        className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center space-x-1 transform hover:scale-105 active:scale-95"
      >
        <Phone size={16} className="transition-transform duration-200 hover:rotate-12" />
        <span className="text-sm font-medium">{phone}</span>
      </a>
    </div>
  </div>
);

// Auto Driver Grid with staggered animations
const AutoDriverGrid: React.FC = () => {
  const drivers = [
    '96035 11629', '98481 65044', '99484 83171', '90000 92037',
    '63025 36271', '98664 72092', '99599 78917', '96768 07459',
    '99484 83171', '77023 86068', '95533 75890', '90106 97472',
    '97055 52391', '98481 65044', '95248 76740', '98664 72092',
    '90107 90411', '99484 83171', '90000 92037', '98481 28649',
    '91775 20097', '80740 12874', '86869 37544'
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {drivers.map((phone, index) => (
        <a
          key={index}
          href={`tel:${phone}`}
          className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900 p-3 rounded-lg text-center hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-800 dark:hover:to-red-800 transition-all duration-300 border border-orange-200 dark:border-orange-700 hover:border-orange-300 transform hover:scale-105 hover:shadow-md"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="text-sm font-medium text-gray-700 dark:text-white mb-1 transition-colors duration-200">{index + 1}</div>
          <div className="text-sm font-mono text-orange-700 dark:text-orange-300 transition-colors duration-200">{phone}</div>
        </a>
      ))}
    </div>
  );
};

// Bus Schedule Item with pulse animation
const BusScheduleItem: React.FC<{ time: string; color: string }> = ({ time, color }) => (
  <div className={`bg-white dark:bg-gray-800 p-2 rounded text-center font-medium transition-all duration-300 hover:shadow-md transform hover:scale-105 ${color} border-l-4 ${color === 'text-green-700 dark:text-green-200' ? 'border-green-500' : 'border-blue-500'}`}>
    {time}
  </div>
);

// Route Badge with bounce animation
const RouteBadge: React.FC<{ route: string }> = ({ route }) => (
  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:bg-blue-200 dark:hover:bg-blue-700 transform hover:scale-110 cursor-default">
    {route}
  </span>
);

// Main App
const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 dark:from-gray-800 dark:to-gray-700 text-white py-6 px-4 transition-all duration-300">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <div className="transform transition-all duration-500 hover:scale-105">
            <h1 className="text-3xl md:text-4xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Campus Essentials
            </h1>
            <p className="text-blue-100 dark:text-orange-100 text-lg transition-colors duration-300">
              BITS Pilani, Hyderabad Campus
            </p>
          </div>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-800 text-sm px-4 py-2 rounded shadow text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 active:scale-95"
          >
            <span className="flex items-center space-x-2">
              <span className={`transition-transform duration-500 ${isDark ? 'rotate-180' : 'rotate-0'}`}>
                {isDark ? '☀️' : '🌙'}
              </span>
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CollapsibleSection title="Mess Timings & Menu" icon={<Utensils size={24} />} defaultOpen>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg border border-green-200 dark:border-green-700 transition-all duration-300 hover:shadow-md">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center">
                <Clock size={16} className="mr-2 transition-transform duration-300 hover:rotate-180" />
                Mess Timings
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  ['Breakfast:', '08:00 AM - 9:30 AM'],
                  ['Lunch:', '12:00 PM - 2:00 PM'],
                  ['Dinner:', '7:30 PM - 09:00 PM']
                ].map(([meal, time], index) => (
                  <div key={meal} className="flex justify-between transition-all duration-300 hover:bg-green-100 dark:hover:bg-green-800 p-2 rounded" style={{ animationDelay: `${index * 0.1}s` }}>
                    <span className="font-medium">{meal}</span>
                    <span>{time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border border-blue-200 dark:border-blue-700 transition-all duration-300 hover:shadow-md">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">Weekly Menu</h3>
              <MessMenuToggle />
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Food Outlets & Timings" icon={<Store size={24} />}>
          <div className="space-y-3 text-sm">
            {[
              ['Heritage Stationery', '10:00 AM - 7:00 PM (Sunday closed)'],
              ['Agarwal Supermarket', '9:00 AM - 9:00 PM'],
              ['Sri Sai Laundry', '9:00 AM - 9:00 PM (Monday closed)'],
              ['Pleasant', 'Closed for Summer Term', true],
              ['Agra Chat & Protein Isle', '1:30 PM - 10:00 PM'],
              ['Tea Time', '9:00 AM - 9:00 PM (Sunday closed)'],
              ['Karturi Stationery', '5:00 PM - 8:00 PM'],
              ['CP05 VVS Stores', '12:00 PM - 10:00 PM'],
              ['Vegetable Shop', '10:30 AM - 9:00 PM'],
              ['Amul', '1:00 PM - 10:00 PM'],
              ['Vijay Vahini', 'Closed for Summer Term', true],
              ['Thickshake', '11:00 AM - 9:00 PM'],
              ['Yummy\'s', '10:00 AM - 10:00 PM'],
              ['Hotspot', '10:00 AM - 12:00 AM'],
              ['Wich Please and SFC', 'Closed for Summer Term', true],
              ['Nescafe', 'Closed for Summer Term', true],
              ['Cafeteria', '8:00 AM - 8:00 PM']
            ].map(([name, time, closed], index) => (
              <div key={index} className="transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded" style={{ animationDelay: `${index * 0.05}s` }}>
                <h4 className="font-semibold text-gray-800 dark:text-white transition-colors duration-200">{name}</h4>
                <p className={`transition-colors duration-200 ${closed ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-300'}`}>{time}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Food Outlet Phone Numbers" icon={<Phone size={24} />}>
          <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">Tap on a contact to call directly.</p>
          <div className="grid grid-cols-1 gap-3">
            {[
              ['Hotspot', '70133 34805'],
              ['Yummpies', '93814 23625']
            ].map(([name, phone], index) => (
              <a
                key={name}
                href={`tel:${phone}`}
                className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg border border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-800 transition-all duration-300 transform hover:scale-102 hover:shadow-md"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800 dark:text-white">{name}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono">{phone}</span>
                </div>
              </a>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Campus Auto Drivers' Numbers" icon={<Car size={24} />}>
          <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
            We recommend contacting any available driver at random to ensure fair distribution of rides.
          </p>
          <AutoDriverGrid />
        </CollapsibleSection>

        <CollapsibleSection title="Warden Contact Info" icon={<User size={24} />}>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ['Krishna Bhavan', '+91 98765 43213', 'Warden: Dr. Smith'],
              ['Budh Bhavan', '+91 98765 43214', 'Warden: Dr. Johnson'],
              ['Meera Bhavan', '+91 98765 43215', 'Warden: Dr. Patel'],
              ['Malviya Bhavan', '+91 98765 43216', 'Warden: Dr. Kumar'],
              ['Vyas Bhavan', '+91 98765 43217', 'Warden: Dr. Singh'],
              ['Ram Bhavan', '+91 98765 43218', 'Warden: Dr. Sharma']
            ].map(([name, phone, warden], index) => (
              <div key={name} style={{ animationDelay: `${index * 0.1}s` }}>
                <ContactCard name={name} phone={phone} label={warden} />
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="🚌 212 Bus Schedule (BPHC ↔ Secunderabad)" icon={<Bus size={24} />}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg border border-green-200 dark:border-green-700 transition-all duration-300 hover:shadow-md">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center">
                <MapPin size={16} className="mr-2 transition-transform duration-300 hover:bounce" />
                From BPHC
              </h3>
              <div className="space-y-2">
                {['9:00 AM', '10:00 AM', '2:00 PM', '5:00 PM', '6:00 PM'].map((time, index) => (
                  <div key={time} style={{ animationDelay: `${index * 0.1}s` }}>
                    <BusScheduleItem time={time} color="text-green-700 dark:text-green-200" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border border-blue-200 dark:border-blue-700 transition-all duration-300 hover:shadow-md">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center">
                <MapPin size={16} className="mr-2 transition-transform duration-300 hover:bounce" />
                From Secunderabad
              </h3>
              <div className="space-y-2">
                {['7:50 AM', '8:50 AM', '12:45 PM', '4:00 PM', '5:00 PM'].map((time, index) => (
                  <div key={time} style={{ animationDelay: `${index * 0.1}s` }}>
                    <BusScheduleItem time={time} color="text-blue-700 dark:text-blue-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Alternate Bus Routes" icon={<Bus size={24} />}>
          <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700 mb-4 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center mb-2">
              <AlertTriangle size={20} className="text-yellow-600 mr-2 transition-transform duration-300 hover:rotate-12" />
              <span className="font-semibold text-yellow-800 dark:text-yellow-300">Important Note</span>
            </div>
            <p className="text-yellow-700 dark:text-yellow-100 text-sm">
              Confirm with the conductor before boarding to ensure it stops at your destination.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:shadow-md">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
              From Secunderabad to Thumkunta/Tandoor Junction:
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                '211A', '211B', '211C', '211DY', '212T',
                '212/564', '212/567', '212/568', '212/702',
                '564', '567', '568'
              ].map((route, index) => (
                <div key={route} style={{ animationDelay: `${index * 0.05}s` }}>
                  <RouteBadge route={route} />
                </div>
              ))}
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default App;
