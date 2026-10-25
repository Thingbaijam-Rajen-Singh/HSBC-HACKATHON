import React, { useState } from 'react';
import { availableOpportunities } from '../data/opportunitiesData';
import { useAuth } from '../context/AuthContext';
import {
  ExternalLink,
  Sparkles,
  MapPin,
  Calendar,
  DollarSign,
  Info,
} from 'lucide-react';

export const OpportunitiesView: React.FC = () => {
  const { userProfile } = useAuth();

  const [filterType, setFilterType] = useState<string>('All');
  const types = ['All', 'Open Source', 'Fellowship', 'Internship'];

  const filteredOpportunities = availableOpportunities.filter(
    (opp) => filterType === 'All' || opp.type === filterType
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-[#FAF9FE] border-2 border-neutral-900/10 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-3 py-0.5 rounded-full bg-[#EFEAFF] text-[#5534DA] border border-[#DDD1FE] text-xs font-bold">
                Opportunity Matching Engine
              </span>
              <span className="text-xs text-neutral-500 font-semibold font-mono">
                Career Bridges & Fellowships
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black font-display text-neutral-900 tracking-tight">
              Curated <span className="text-[#FF5C38]">Opportunities</span>
            </h1>
            <p className="text-xs md:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed font-medium">
              Discover student fellowships, open-source stipends, hackathons, and early-career tech internships matched directly to your demonstrated SkillMate learning records and projects.
            </p>
          </div>

          <div className="bg-white border border-neutral-200 px-5 py-3 rounded-2xl flex items-center gap-3.5 shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="text-[10px] text-neutral-500 uppercase font-extrabold tracking-wider">Matching Profile</div>
              <div className="text-neutral-900 font-black text-sm sm:text-base font-display">
                {userProfile?.careerGoal || 'Full-Stack Developer'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transparency Note */}
      <div className="p-4 rounded-2xl bg-[#FAF9FD] border border-neutral-200 flex items-start gap-3 text-xs text-neutral-700">
        <Info className="w-4 h-4 text-[#5534DA] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-neutral-900">Program Authenticity: </span>
          Real-world student programs (Google Summer of Code, MLH Fellowship, Outreachy) link directly to official portal domains. Any demonstration listings from simulated partners are clearly identified with a
          <span className="mx-1 px-2 py-0.5 rounded-full bg-[#FFF8E7] text-amber-900 border border-[#FFE194] font-mono text-[10px] font-bold">
            Sample Partner
          </span>
          indicator.
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              filterType === t
                ? 'bg-[#FF5C38] text-white shadow-xs'
                : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Opportunity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOpportunities.map((opp) => (
          <div
            key={opp.id}
            className="bg-white border-2 border-neutral-900/10 rounded-3xl p-6 hover:border-neutral-900/30 transition-all flex flex-col justify-between space-y-4 shadow-xs group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-[#5534DA] font-bold">
                      {opp.organization}
                    </span>
                    {opp.isSampleData && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FFF8E7] border border-[#FFE194] text-amber-900 font-bold">
                        Sample Partner Feed
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-black font-display text-neutral-900 group-hover:text-[#FF5C38] transition-colors">
                    {opp.title}
                  </h3>
                </div>

                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#EFEAFF] text-[#5534DA] shrink-0">
                  {opp.type}
                </span>
              </div>

              {/* Match Reason Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Why This Opportunity Matches You:
                </div>
                <p className="text-emerald-900 leading-relaxed font-medium">{opp.matchReason}</p>
              </div>

              {/* Meta details */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600 pt-1 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  {opp.location}
                </span>
                {opp.stipend && (
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <DollarSign className="w-3.5 h-3.5" />
                    {opp.stipend}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                  {opp.deadline}
                </span>
              </div>

              {/* Matched Skills chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {opp.matchedSkills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-[#FAF9FD] border border-neutral-200 text-neutral-700"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
              <span className="text-[11px] text-neutral-400 font-mono">
                Verified Portal Link
              </span>

              <a
                href={opp.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-2xl bg-[#EFEAFF] hover:bg-[#FF5C38] hover:text-white text-[#5534DA] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Program</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
