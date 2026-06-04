import { useState } from 'react';
import useLocation from '../hooks/useLocation';

export default function ReportCase() {
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // New states for our simulated submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  
  const { location, error, isLoading, getLocation } = useLocation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // The simulated API call to Gemini
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!imageFile || !location) {
      alert("⚠️ Please provide both a photo and your location to proceed.");
      return;
    }

    setIsSubmitting(true);

    // Simulate a 3-second delay for the Gemini Vision API
    setTimeout(() => {
      setIsSubmitting(false);
      setAiResult({
        species: "Indie Dog (Canis familiaris)",
        injury: "Laceration on right hind leg, moderate bleeding. Possible trauma.",
        urgency: "High Priority",
        firstAid: [
          "Do not attempt to move the dog abruptly.",
          "If safe, apply gentle pressure to the wound with a clean cloth.",
          "Keep bystanders away to reduce the animal's stress.",
          "Wait for the volunteer; do not offer food or water right now."
        ]
      });
    }, 3000);
  };

  return (
    <div className="p-4 md:p-8 max-w-lg mx-auto">
      
      {/* If we have an AI Result, show the success screen instead of the form */}
      {aiResult ? (
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-emerald-500 animate-fade-in">
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">✅</div>
            <h2 className="text-2xl font-bold text-gray-800">Alert Broadcasted!</h2>
            <p className="text-sm text-gray-600">5 nearest volunteers have been notified.</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-bold text-emerald-700 mb-3 flex items-center gap-2">
              🤖 Gemini AI Analysis
            </h3>
            <p className="text-sm text-gray-700 mb-1"><strong>Species:</strong> {aiResult.species}</p>
            <p className="text-sm text-gray-700 mb-1"><strong>Status:</strong> {aiResult.injury}</p>
            <p className="text-sm text-gray-700"><strong>Urgency:</strong> <span className="text-red-600 font-bold">{aiResult.urgency}</span></p>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              ⚕️ Immediate First Aid
            </h3>
            <ul className="space-y-2">
              {aiResult.firstAid.map((step, index) => (
                <li key={index} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-emerald-500 font-bold">{index + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={() => { setAiResult(null); setImagePreview(null); setImageFile(null); setDescription(''); }}
            className="w-full bg-gray-200 text-gray-800 p-4 rounded-lg font-bold hover:bg-gray-300 transition-colors"
          >
            Report Another Case
          </button>
        </div>
      ) : (
        /* Otherwise, show our standard reporting form */
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">🚨 Emergency Report</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Please provide a photo and location. Our AI will analyze the situation instantly.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Photo Upload Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Animal Photo (Required)
              </label>
              <input 
                type="file" 
                id="cameraInput" 
                accept="image/*" 
                capture="environment" 
                className="hidden" 
                onChange={handleImageChange}
              />
              <label 
                htmlFor="cameraInput"
                className="block border-2 border-dashed border-gray-300 rounded-lg overflow-hidden text-center hover:bg-gray-50 transition-colors cursor-pointer relative"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Animal Preview" className="w-full h-48 object-cover" />
                ) : (
                  <div className="p-8">
                    <div className="text-4xl mb-2">📸</div>
                    <p className="text-sm text-gray-500 font-medium">Tap to take photo or upload</p>
                  </div>
                )}
              </label>
            </div>

            {/* Location Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Current Location (Required)
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : ''}
                  placeholder="GPS Coordinates..." 
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none"
                />
                <button 
                  type="button"
                  onClick={getLocation}
                  disabled={isLoading}
                  className="bg-emerald-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center disabled:opacity-70 min-w-[110px]"
                >
                  {isLoading ? '⏳ ...' : '📍 Get GPS'}
                </button>
              </div>
            </div>

            {/* Notes Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Additional Notes (Optional)
              </label>
              <textarea 
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="E.g., Dog is breathing heavily..."
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 text-white p-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors shadow-md mt-4 disabled:bg-red-400 flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin text-xl">⏳</span> Processing AI...
                </>
              ) : (
                'Send Rescue Alert'
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}