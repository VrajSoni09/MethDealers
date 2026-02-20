import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/8 px-8 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-white flex items-center justify-center">
                <span className="text-black text-[10px] font-black">IR</span>
              </div>
              <span className="text-white font-mono text-xs tracking-widest uppercase">Rail Intelligence</span>
            </div>
            <p className="text-white/20 font-mono text-xs leading-relaxed">
              AI-powered complaint analysis system for Indian Railways — detecting patterns,
              categorizing issues, and improving passenger experience.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="text-white/30 font-mono text-xs uppercase tracking-widest mb-3">System</div>
            <div className="space-y-2">
              {["Dashboard", "Complaints", "Submit Complaint", "Reports"].map((link) => (
                <div key={link} className="text-white/20 font-mono text-xs hover:text-white/50 cursor-pointer transition-colors">
                  {link}
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="text-white/30 font-mono text-xs uppercase tracking-widest mb-3">Ministry of Railways</div>
            <div className="space-y-1">
              {[
                "Government of India",
                "Rail Bhavan, New Delhi",
                "helpline@indianrailways.gov.in",
                "1800-111-139",
              ].map((info) => (
                <div key={info} className="text-white/20 font-mono text-xs">
                  {info}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="text-white/10 font-mono text-xs">
            © 2024 Ministry of Railways, Government of India. All rights reserved.
          </div>
          <div className="text-white/10 font-mono text-xs">
            AI Complaint Intelligence System · v2.4.1
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
