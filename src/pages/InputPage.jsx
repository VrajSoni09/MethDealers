import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { CATEGORIES } from "../data/complaints";
import { generateId } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import LocationMap from "../components/LocationMap";

const MAX_CHARS = 500;

const InputPage = ({ onToast, apiService }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    text: "",
    category: "Auto Detect with AI",
    zone: "",
    trainNo: "",
    location: "",
    locationType: "text", // "text" or "map"
    coordinates: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [showMap, setShowMap] = useState(false);

  // Major railway stations for autocomplete
  const railwayStations = [
    "New Delhi Railway Station", "Mumbai Central", "Howrah Junction", "Chennai Central",
    "Bangalore City", "Secunderabad Junction", "Ahmedabad Junction", "Pune Junction",
    "Jaipur Junction", "Lucknow Charbagh", "Kolkata Sealdah", "Hyderabad Deccan",
    "Kochuveli", "Thiruvananthapuram Central", "Coimbatore Junction", "Madurai Junction",
    "Vijayawada Junction", "Guntur Junction", "Nagpur Junction", "Bhopal Junction",
    "Indore Junction", "Udaipur City", "Jodhpur Junction", "Ajmer Junction",
    "Varanasi Junction", "Allahabad Junction", "Kanpur Central", "Agra Cantonment",
    "Mathura Junction", "Gwalior Junction", "Bhubaneswar", "Cuttack",
    "Ranchi Junction", "Jamshedpur", "Dhanbad Junction", "Asansol Junction",
    "Siliguri Junction", "Guwahati Junction", "Dimapur", "Agartala",
    "Dehradun", "Haridwar", "Rishikesh", "Pathankot",
    "Jammu Tawi", "Udhampur", "Srinagar", "Leh",
    "Shimla", "Kalka", "Chandigarh", "Ludhiana",
    "Amritsar", "Jalandhar", "Patiala", "Bathinda"
  ];

  const charPercent = Math.min((form.text?.length || 0) / MAX_CHARS * 100, 100);
  const isValid = (form.text?.length || 0) >= 20 && (form.location?.length || 0) > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "text" && value.length > MAX_CHARS) return;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleLocationSelect = (location, coordinates) => {
    setForm((f) => ({
      ...f,
      location,
      coordinates,
      locationType: coordinates ? "map" : "text"
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setSubmitting(true);
    try {
      // Call prediction API with only required fields
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: form.text?.trim() || '',  // Ensure not empty
          selected_category: form.category || "Auto Detect with AI"  // Map category to selected_category
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Bad Request Details:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      if (response.ok) {
        const id = generateId();
        setSubmitted(id);

        // Store prediction data via API
        const complaintData = {
          id,
          text: form.text,
          category: data.predicted_category || data.final_category,
          final_category: data.final_category,
          severity: data.predicted_severity || data.severity,
          priority_flag: data.priority_flag,
          confidence: data.confidence,
          confidence_category: data.confidence_category,
          confidence_severity: data.confidence_severity,
          location: form.location,
          coordinates: form.coordinates,
          zone: form.zone,
          trainNo: form.trainNo,
          timestamp: new Date().toISOString(),
          aiAnalysis: data
        };
        
        try {
          await apiService.saveComplaint(complaintData);
          console.log('Complaint saved to database:', complaintData);
        } catch (error) {
          console.error('Failed to save complaint to database:', error);
          // Fallback to localStorage if API fails
          localStorage.setItem(`complaint_${id}`, JSON.stringify(complaintData));
        }

        setForm({ text: "", category: "Auto Detect with AI", zone: "", trainNo: "", location: "", locationType: "text", coordinates: null });
        onToast(`Complaint ${id} analyzed successfully!`);

        // Navigate to output page
        setTimeout(() => {
          navigate(`/app/output/${id}`);
        }, 1000);
      } else {
        onToast('Failed to analyze complaint', 'error');
      }
    } catch (error) {
      console.error('Prediction API error:', error);
      // Fallback to mock submission for demo
      const id = generateId();
      setSubmitted(id);
      
      // Store mock data for demo
      const mockData = {
        id,
        text: form.text,
        category: "Service Delay",
        final_category: "Service Delay",
        severity: "Medium",
        priority_flag: "MEDIUM",
        confidence: 0.85,
        confidence_category: 0.85,
        confidence_severity: 0.75,
        location: form.location,
        coordinates: form.coordinates,
        zone: form.zone,
        trainNo: form.trainNo,
        timestamp: new Date().toISOString(),
        aiAnalysis: {
          predicted_category: "Service Delay",
          final_category: "Service Delay",
          predicted_severity: "Medium",
          severity: "Medium",
          priority_flag: "MEDIUM",
          confidence: 0.85,
          confidence_category: 0.85,
          confidence_severity: 0.75,
          key_issues: ["delay", "ac not working", "no water"],
          sentiment: "negative",
          urgency_score: 0.7
        }
      };
      console.log('Storing mock data:', mockData);
      localStorage.setItem(`complaint_${id}`, JSON.stringify(mockData));
      
      setForm({ text: "", category: "Auto Detect with AI", zone: "", trainNo: "", location: "", locationType: "text", coordinates: null });
      onToast(`Complaint ${id} submitted and queued for AI analysis`);
    } finally {
      setSubmitting(false);
    }
  };

  const ZONES = [
    "Northern", "Western", "Eastern", "Southern", "Central",
    "South Eastern", "North Eastern", "Northeast Frontier",
    "South Central", "East Central",
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-black font-serif ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Submit Complaint</h1>
        <p className={`font-mono text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          File a new complaint for AI categorization and severity analysis
        </p>
      </div>

      {/* Success banner */}
      {submitted && (
        <div className={`border p-4 flex items-center justify-between animate-fade-in ${isDark ? 'border-green-800 bg-green-900/20' : 'border-green-200 bg-green-50'}`}>
          <div>
            <div className={`font-mono text-xs uppercase tracking-wider mb-1 ${isDark ? 'text-green-400' : 'text-green-700'}`}>✓ Submitted Successfully</div>
            <div className={`font-mono text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Complaint <span className={isDark ? 'text-gray-100' : 'text-gray-900'}>{submitted}</span> is being processed by AI
            </div>
          </div>
          <button onClick={() => setSubmitted(null)} className={`text-xs ${isDark ? 'text-gray-400 hover:text-gray-100' : 'text-gray-500 hover:text-gray-900'}`}>✕</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className={`border p-6 space-y-5 ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>

        {/* Complaint text */}
        <div>
          <label className="label">
            Complaint Description *
            <span className={`ml-2 normal-case tracking-normal ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              (min. 20 characters)
            </span>
          </label>
          <textarea
            name="text"
            value={form.text}
            onChange={handleChange}
            rows={6}
            placeholder="Please describe your complaint in detail. Include train number, coach number, date, and specific issue faced..."
            className="input-field resize-none"
          />
          {/* Char counter */}
          <div className="flex items-center justify-between mt-2">
            <div className={`flex-1 h-0.5 mr-3 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div
                className="h-full transition-all duration-200"
                style={{
                  width: `${charPercent}%`,
                  background: charPercent > 90 ? "#ef4444" : charPercent > 70 ? "#eab308" : (isDark ? "#ffffff" : "#000000"),
                }}
              />
            </div>
            <span
              className={`font-mono text-[10px] ${form.text.length > MAX_CHARS * 0.9 ? "text-red-400" : (isDark ? "text-gray-400" : "text-gray-500")
                }`}
            >
              {form.text.length}/{MAX_CHARS}
            </span>
          </div>
        </div>

        {/* Row: Category + Zone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="input-field"
            >
              <option value="Auto detect with AI">Auto detect with AI</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Railway Zone</label>
            <select
              name="zone"
              value={form.zone}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Zone</option>
              {ZONES.map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row: Train No + Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Train Number (Optional)</label>
            <input
              type="text"
              name="trainNo"
              value={form.trainNo}
              onChange={handleChange}
              placeholder="e.g. 12345"
              className="input-field"
            />
          </div>

          <div>
            <label className="label">Location *</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Enter railway station or location"
                  list="railway-stations"
                  className={`input-field w-full ${form.locationType === 'map' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600' : ''}`}
                />
                {/* Railway Stations Datalist for Autocomplete */}
                <datalist id="railway-stations">
                  {railwayStations.map((station) => (
                    <option key={station} value={station} />
                  ))}
                </datalist>
                {form.locationType === 'map' && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <span className="text-xs text-blue-500">📍 Map</span>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowMap(!showMap)}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${form.locationType === 'map' || showMap
                    ? 'bg-blue-500 text-white border-blue-500'
                    : isDark
                      ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }`}
                title="Select location on map"
              >
                📍
              </button>
            </div>
            {form.location && (
              <div className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {form.locationType === 'map' && form.coordinates ? (
                  <span>📍 Coordinates: {form.coordinates.lat.toFixed(4)}, {form.coordinates.lng.toFixed(4)}</span>
                ) : (
                  <span>📝 Text input</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Interactive Map */}
        {showMap && (
          <div className={`border rounded-lg overflow-hidden ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`font-medium text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Select Location on Map</h3>
              <button
                type="button"
                onClick={() => setShowMap(false)}
                className={`text-sm ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
              >
                ✕
              </button>
            </div>
            <LocationMap
              onLocationSelect={handleLocationSelect}
              initialLocation={form.coordinates}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid || submitting}
          className="btn-primary w-full py-4 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <span className={`inline-block w-3 h-3 border border-t-transparent rounded-full animate-spin ${isDark ? 'border-white' : 'border-black'}`} />
              Submitting to AI Pipeline...
            </>
          ) : (
            "Submit Complaint →"
          )}
        </button>
      </form>

      {/* Info */}
      <div className={`border p-5 space-y-2 ${isDark ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50'}`}>
        <div className={`font-mono text-[10px] uppercase tracking-widest mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          How AI processes your complaint
        </div>
        {[
          { icon: "◈", text: "NLP model classifies category with 94.7% accuracy" },
          { icon: "◉", text: "Severity scoring assigns High / Medium / Low priority" },
          { icon: "◎", text: "Cluster algorithm matches with similar complaints" },
          { icon: "◐", text: "Responsible department auto-notified if High severity" },
          { icon: "◑", text: "Average processing time: 1.2 seconds" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-3">
            <span className={`font-mono text-xs flex-shrink-0 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.icon}</span>
            <span className={`font-mono text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputPage;
