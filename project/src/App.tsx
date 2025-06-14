import React, { useState } from 'react';
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
  Users
} from 'lucide-react';

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

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left bg-gradient-to-r from-blue-50 to-orange-50 hover:from-blue-100 hover:to-orange-100 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="text-blue-600">
            {icon}
          </div>
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>
        <div className="text-blue-600">
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </button>
      
      {isOpen && (
        <div className="p-6 pt-0 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};

const MessMenuToggle: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        {showMenu ? 'Hide Menu' : 'Show Menu'}
      </button>

      {showMenu && (
        <div className="mt-4">
          <img
            src="/menu-photo.jpg"  // Replace with your actual menu image path
            alt="Mess Menu"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      )}
    </>
  );
};

const ContactCard: React.FC<{ name: string; phone: string; label?: string }> = ({ 
  name, 
  phone, 
  label 
}) => (
  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
    <div className="flex justify-between items-center">
      <div>
        <h4 className="font-semibold text-gray-800">{name}</h4>
        {label && <p className="text-sm text-gray-600">{label}</p>}
      </div>
      <a 
        href={`tel:${phone}`} 
        className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-1"
      >
        <Phone size={16} />
        <span className="text-sm font-medium">{phone}</span>
      </a>
    </div>
  </div>
);

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
          className="bg-gradient-to-r from-orange-50 to-red-50 p-3 rounded-lg text-center hover:from-orange-100 hover:to-red-100 transition-all duration-200 border border-orange-200 hover:border-orange-300"
        >
          <div className="text-sm font-medium text-gray-700 mb-1">
            {index + 1}
          </div>
          <div className="text-sm font-mono text-orange-700">
            {phone}
          </div>
        </a>
      ))}
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Campus Essentials</h1>
          <p className="text-blue-100 text-lg">BITS Pilani, Hyderabad Campus</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Mess Timings & Menu */}
        <CollapsibleSection 
          title="Mess Timings & Menu" 
          icon={<Utensils size={24} />}
          defaultOpen={true}
        >
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                  <Clock size={16} className="mr-2" />
                  Mess Timings
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Breakfast:</span>
                    <span>08:00 AM - 9:30 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Lunch:</span>
                    <span>12:00 PM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Dinner:</span>
                    <span>7:30 PM - 09:00 PM</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-3">Weekly Menu</h3>
                <MessMenuToggle />
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Food Outlets */}
        <CollapsibleSection
          title="Food Outlets & Timings"
          icon={<Store size={24} />}
        >
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold text-gray-800">Heritage Stationery</h4>
              <p>10:00 AM - 7:00 PM (Sunday closed)</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Agarwal Supermarket</h4>
              <p>9:00 AM - 9:00 PM</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Sri Sai Laundry</h4>
              <p>9:00 AM - 9:00 PM (Monday closed)</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Pleasant</h4>
              <p className="text-red-600">Closed for Summer Term</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Agra Chat & Protein Isle</h4>
              <p>1:30 PM - 10:00 PM</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Tea Time</h4>
              <p>9:00 AM - 9:00 PM (Sunday closed)</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Karturi Stationery</h4>
              <p>5:00 PM - 8:00 PM</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">CP05 VVS Stores</h4>
              <p>12:00 PM - 10:00 PM</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Vegetable Shop</h4>
              <p>10:30 AM - 9:00 PM</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Amul</h4>
              <p>1:00 PM - 10:00 PM</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Vijay Vahini</h4>
              <p className="text-red-600">Closed for Summer Term</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Thickshake</h4>
              <p>11:00 AM - 9:00 PM</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Yummy's</h4>
              <p>10:00 AM - 10:00 PM</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Hotspot</h4>
              <p>10:00 AM - 12:00 AM</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Wich Please and SFC</h4>
              <p className="text-red-600">Closed for Summer Term</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Nescafe</h4>
              <p className="text-red-600">Closed for Summer Term</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Cafeteria</h4>
              <p>8:00 AM - 8:00 PM</p>
            </div>
          </div>
        </CollapsibleSection>


{/* Food Outlet Phone Numbers */}
<CollapsibleSection 
  title="Food Outlet Phone Numbers"
  icon={<Car size={24} /> }
>
  <p className="mb-2 text-sm text-gray-700">
    Tap on a contact to call directly.
  </p>
  <div className="grid grid-cols-1 gap-2 text-sm text-blue-600 underline">
    <a href="tel:70133 34805" className="hover:text-blue-800">Hotspot – 70133 34805</a>
    <a href="tel:93814 23625" className="hover:text-blue-800">Yummpies – 93814 23625</a>
  </div>
</CollapsibleSection>



{/* Auto Drivers */}
<CollapsibleSection 
  title="Campus Auto Drivers' Numbers"
  icon={<Car size={24} /> }
>
  <p className="mb-2 text-sm text-gray-700">
    We recommend contacting any available driver at random to ensure fair distribution of rides.
  </p>
  <AutoDriverGrid />
</CollapsibleSection>


        {/* Warden Contacts */}
        <CollapsibleSection 
          title="Warden Contact Info" 
          icon={<User size={24} />}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <ContactCard name="Krishna Bhavan" phone="+91 98765 43213" label="Warden: Dr. Smith" />
            <ContactCard name="Budh Bhavan" phone="+91 98765 43214" label="Warden: Dr. Johnson" />
            <ContactCard name="Meera Bhavan" phone="+91 98765 43215" label="Warden: Dr. Patel" />
            <ContactCard name="Malviya Bhavan" phone="+91 98765 43216" label="Warden: Dr. Kumar" />
            <ContactCard name="Vyas Bhavan" phone="+91 98765 43217" label="Warden: Dr. Singh" />
            <ContactCard name="Ram Bhavan" phone="+91 98765 43218" label="Warden: Dr. Sharma" />
          </div>
        </CollapsibleSection>

        {/* 212 Bus Schedule */}
        <CollapsibleSection 
          title="🚌 212 Bus Schedule (BPHC ↔ Secunderabad)" 
          icon={<Bus size={24} />}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                <MapPin size={16} className="mr-2" />
                From BPHC
              </h3>
              <div className="space-y-2">
                {['9:00 AM', '10:00 AM', '2:00 PM', '5:00 PM', '6:00 PM'].map((time) => (
                  <div key={time} className="bg-white p-2 rounded text-center font-medium text-green-700">
                    {time}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                <MapPin size={16} className="mr-2" />
                From Secunderabad
              </h3>
              <div className="space-y-2">
                {['7:50 AM', '8:50 AM', '12:45 PM', '4:00 PM', '5:00 PM'].map((time) => (
                  <div key={time} className="bg-white p-2 rounded text-center font-medium text-blue-700">
                    {time}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Alternate Bus Routes */}
        <CollapsibleSection 
          title="Alternate Bus Routes" 
          icon={<Bus size={24} />}
        >
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
            <div className="flex items-center mb-2">
              <AlertTriangle size={20} className="text-yellow-600 mr-2" />
              <span className="font-semibold text-yellow-800">Important Note</span>
            </div>
            <p className="text-yellow-700 text-sm">
              Confirm with the conductor before boarding to ensure it stops at your destination.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">
              From Secunderabad to Thumkunta/Tandoor Junction:
            </h3>
            <div className="flex flex-wrap gap-2">
              {['211A', '211B', '211C', '211DY', '212T', '212/564', '212/567', '212/568', '212/702', '564', '567', '568'].map((route) => (
                <span key={route} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {route}
                </span>
              ))}
            </div>
          </div>
        </CollapsibleSection>

        {/* Footer */}


      </div>
    </div>
  );
}

export default App;