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
  AlertTriangle,
  Menu,
  X,
  Home,
  BookOpen,
  Map,
  Info
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

// Sidebar Navigation
const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', href: '#' },
    { icon: <Info size={20} />, label: 'About Us', href: '#' },
    { icon: <BookOpen size={20} />, label: 'Courses', href: '#' },
    { icon: <BookOpen size={20} />, label: 'Lane Journal', href: '#' },
    { icon: <Map size={20} />, label: 'Locations', href: '#' }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          <X size={24} className="text-gray-600 dark:text-gray-300" />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-4">
            <div className="text-white font-bold text-2xl">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-2 h-2 bg-white rounded-sm"></div>
                <div className="w-2 h-2 bg-white rounded-sm opacity-75"></div>
                <div className="w-2 h-2 bg-white rounded-sm opacity-75"></div>
                <div className="w-2 h-2 bg-white rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transform hover:scale-105"
            >
              <div className="text-green-600 dark:text-green-400">
                {item.icon}
              </div>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Social Links */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex justify-center space-x-4">
            {['instagram', 'twitter', 'linkedin'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-100 dark:hover:bg-green-900 transition-all duration-200 transform hover:scale-110"
              >
                <div className="w-5 h-5 bg-gray-600 dark:bg-gray-300 rounded"></div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// Main App
const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 dark:from-gray-800 dark:to-gray-700 text-white py-4 px-4 transition-all duration-300 sticky top-0 z-30 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 transform hover:scale-110"
            >
              <Menu size={24} />
            </button>
            <div className="transform transition-all duration-500 hover:scale-105">
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Campus Essentials
              </h1>
              <p className="text-blue-100 dark:text-orange-100 text-sm md:text-base transition-colors duration-300">
                BITS Pilani, Hyderabad Campus
              </p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-800 text-sm px-4 py-2 rounded shadow text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 active:scale-95"
          >
            <span className="flex items-center space-x-2">
              <span className={`transition-transform duration-500 ${isDark ? 'rotate-180' : 'rotate-0'}`}>
                {isDark ? '☀️' : '🌙'}
              </span>
              <span className="hidden sm:inline">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CollapsibleSection title="Mess Timings" icon={<Utensils size={24} />} defaultOpen>
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
              ['Chief Warden Office', '040-66303629', 'Prof. Phaneendra Kiran C'],
              ['Chief Warden Mobile', '+91 90102 02882', 'Prof. Phaneendra Kiran C'],
              ['Warden - Krishna Bhavan Office', '040-66303632', 'Prof. Bandhan Bandhu Majumdar'],
              ['Warden - Krishna Bhavan Mobile', '+91 90102 00098', 'Prof. Bandhan Bandhu Majumdar'],
              ['Warden - Ram Bhavan Mobile', '+91 90102 02805', 'Prof. Syed Ershad Ahmed'],
              ['Superintendent - Krishna Bhavan', '+91 90102 02854', 'Mr. Haridas Appu'],
              ['Caretaker - Krishna Bhavan', '+91 94926 65896', 'Mr. Ravinder Reddy'], 
              ['Warden - Ganga Bhavan', '040-66303582', 'Prof. Ponnalagu R N']
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
