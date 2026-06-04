import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-[calc(100vh-76px)] flex flex-col bg-slate-50">
      
      {/* Hero Section */}
      <div className="flex-grow flex items-center justify-center px-4 py-12 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            AI-Powered Animal Rescue <br className="hidden md:block" />
            <span className="text-emerald-600">When Seconds Count.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            India has over 35 million stray animals, yet less than 2% get help when injured. 
            AniRescue connects bystanders, volunteers, and NGOs instantly using AI and real-time GPS.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/report" 
              className="w-full sm:w-auto bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span className="text-2xl">🚨</span> Report Emergency
            </Link>
            
            <Link 
              to="/map" 
              className="w-full sm:w-auto bg-white text-emerald-700 border-2 border-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              🗺️ View Live Map
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Highlights (Level 1 Demo Focus) */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          <div className="p-6 rounded-2xl bg-slate-50 border border-gray-100 shadow-sm">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Gemini AI Vision</h3>
            <p className="text-gray-600 text-sm">
              Snap a photo. Our AI instantly identifies the species, assesses the injury, and provides immediate first aid steps.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-gray-100 shadow-sm">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Real-Time GPS</h3>
            <p className="text-gray-600 text-sm">
              Zero typing required. We automatically grab your exact coordinates to map the rescue case instantly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-gray-100 shadow-sm">
            <div className="text-4xl mb-4">🔔</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Instant Alerts</h3>
            <p className="text-gray-600 text-sm">
              Push notifications are sent automatically to the nearest registered volunteers within a 5km radius.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}