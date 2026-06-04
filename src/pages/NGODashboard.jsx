import { useState } from 'react';

// Mock data for the NGO view
const initialCases = [
  { id: 'CASE-001', animal: 'Dog', issue: 'Hit by bike', location: 'Andheri West', status: 'Unassigned', priority: 'High', date: 'Just now' },
  { id: 'CASE-002', animal: 'Cat', issue: 'Stuck in tree', location: 'Bandra', status: 'In Progress (Vol: Rahul)', priority: 'Medium', date: '20 mins ago' },
  { id: 'CASE-003', animal: 'Cow', issue: 'Sick/Lethargic', location: 'Dadar', status: 'Resolved', priority: 'High', date: '2 hrs ago' },
];

export default function NGODashboard() {
  const [cases] = useState(initialCases);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-[calc(100vh-76px)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">NGO Command Center</h1>
          <p className="text-gray-500 mt-1">Centralized case and volunteer management</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-100">
            <span className="text-xl font-bold">{cases.filter(c => c.status === 'Unassigned').length}</span> Unassigned
          </div>
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-100">
            <span className="text-xl font-bold">{cases.filter(c => c.status.includes('In Progress')).length}</span> Active
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Recent Rescue Cases</h2>
          <button className="text-sm text-emerald-600 font-semibold hover:underline">View Map Mode</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b">
                <th className="p-4 font-semibold">Case ID</th>
                <th className="p-4 font-semibold">Animal & Issue</th>
                <th className="p-4 font-semibold">Location</th>
                <th className="p-4 font-semibold">Priority</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {cases.map((c, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">{c.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-gray-800">{c.animal}</div>
                    <div className="text-gray-500 text-xs">{c.issue}</div>
                  </td>
                  <td className="p-4 text-gray-600">{c.location}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${c.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'}`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                      ${c.status === 'Unassigned' ? 'bg-gray-100 text-gray-600' : 
                        c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 
                        'bg-blue-100 text-blue-700'}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-emerald-600 font-bold hover:text-emerald-800">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}