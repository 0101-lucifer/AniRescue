import { useState } from 'react';

// Mock data representing emergencies pushed via Firebase FCM
const nearbyEmergencies = [
  { id: 101, animal: 'Indie Dog', distance: '1.2 km away', time: '2 mins ago', urgency: 'High', img: '🐕', status: 'Pending' },
  { id: 102, animal: 'Cat', distance: '3.5 km away', time: '15 mins ago', urgency: 'Medium', img: '🐈', status: 'Pending' },
];

export default function VolunteerDashboard() {
  const [cases, setCases] = useState(nearbyEmergencies);

  const handleAcceptCase = (caseId) => {
    // Update the specific case to show it's been accepted by the volunteer
    setCases(cases.map(c => c.id === caseId ? { ...c, status: 'Accepted' } : c));
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-[calc(100vh-76px)]">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Volunteer Hub</h1>
          <p className="text-emerald-600 font-semibold text-sm">🟢 Active & On-Duty</p>
        </div>
        <div className="bg-emerald-100 text-emerald-800 p-3 rounded-full shadow-sm">
          🔔 <span className="font-bold">{cases.filter(c => c.status === 'Pending').length}</span> New Alerts
        </div>
      </div>

      <h2 className="text-lg font-bold text-gray-700 mb-4">🚨 Emergencies Near You</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cases.map((emergency) => (
          <div key={emergency.id} className={`bg-white rounded-xl shadow-md border-l-4 p-5 transition-all ${emergency.status === 'Accepted' ? 'border-gray-400 opacity-75' : 'border-red-500'}`}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-3 items-center">
                <div className="text-4xl bg-gray-50 p-2 rounded-lg">{emergency.img}</div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{emergency.animal}</h3>
                  <p className="text-xs text-gray-500">⏱️ {emergency.time} • 📍 {emergency.distance}</p>
                </div>
              </div>
              {emergency.urgency === 'High' && emergency.status === 'Pending' && (
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">Urgent</span>
              )}
            </div>

            {emergency.status === 'Pending' ? (
              <button 
                onClick={() => handleAcceptCase(emergency.id)}
                className="w-full mt-2 bg-emerald-600 text-white py-2.5 rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Accept Rescue Case
              </button>
            ) : (
              <div className="w-full mt-2 bg-gray-100 text-gray-600 py-2.5 rounded-lg font-bold text-center border border-gray-200">
                ✅ Case Accepted (In Progress)
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}