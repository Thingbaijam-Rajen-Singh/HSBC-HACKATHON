import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import {
  Award,
  Globe,
  Github,
  CheckCircle2,
  Share2,
  ExternalLink,
  ShieldCheck,
  Lock,
  Star,
  Layers,
  FolderGit2,
  Check,
} from 'lucide-react';

export const SkillPassportView: React.FC = () => {
  const { userProfile, updateProfileData } = useAuth();
  const { progressMap, projectSubmissions, totalCompletedSublevels, totalCompletedProjects } = useProgress();

  const [copiedLink, setCopiedLink] = useState(false);

  // Derive completed learning items
  const completedSublevelsList = Object.values(progressMap).filter((p) => p.completed);

  // Badges calculation
  const badgesEarned = [
    {
      id: 'badge-starter',
      title: 'Journey Begun',
      desc: 'Completed your first interactive SkillMate sublevel',
      earned: completedSublevelsList.length >= 1,
      icon: '🌱',
    },
    {
      id: 'badge-boss-slayer',
      title: 'Frontend Overlord Conqueror',
      desc: 'Defeated the World 3 Boss Mission in Skill Level-Up',
      earned: Boolean(progressMap['sub-3-3-1']?.completed),
      icon: '👑',
    },
    {
      id: 'badge-builder',
      title: 'Verified Project Builder',
      desc: 'Completed and recorded an independent full project',
      earned: totalCompletedProjects >= 1,
      icon: '🚀',
    },
    {
      id: 'badge-century',
      title: 'Centurion Coder',
      desc: 'Earned 100+ Experience Points on SkillMate',
      earned: (userProfile?.totalXp || 0) >= 100,
      icon: '⭐',
    },
  ];

  const shareableUrl = `${window.location.origin}/passport/${userProfile?.userId || 'guest-student'}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleTogglePrivacy = async () => {
    if (!userProfile) return;
    await updateProfileData({
      isPublicPortfolio: !userProfile.isPublicPortfolio,
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-[#FAF9FE] border-2 border-neutral-900/10 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-3 py-0.5 rounded-full bg-[#EFEAFF] text-[#5534DA] border border-[#DDD1FE] text-xs font-bold">
                Automatic Skill Passport & Portfolio
              </span>
              <span className="text-xs text-neutral-500 font-semibold font-mono">
                Live Dynamic Showcase
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black font-display text-neutral-900 tracking-tight">
              My Skill <span className="text-[#FF5C38]">Passport</span>
            </h1>
            <p className="text-xs md:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed font-medium">
              Your living, automatically generated developer credentials. Synchronized in real time from your completed challenges and recorded projects.
            </p>
          </div>

          {/* Privacy & Sharing Actions */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center">
            <button
              onClick={handleTogglePrivacy}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                userProfile?.isPublicPortfolio
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-white border-neutral-200 text-neutral-600'
              }`}
            >
              {userProfile?.isPublicPortfolio ? (
                <>
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Public Portfolio: ON</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Public Portfolio: OFF</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyLink}
              disabled={!userProfile?.isPublicPortfolio}
              className="px-5 py-2.5 rounded-2xl bg-[#FF5C38] hover:bg-[#E84D2B] disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#FF5C38]/25 transition-all cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Portfolio</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Distinction Transparency Notice */}
      <div className="p-4 rounded-2xl bg-[#FAF9FD] border border-neutral-200 text-xs text-neutral-600 space-y-1">
        <div className="font-bold text-neutral-900 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Skill Credential Transparency Standards
        </div>
        <p className="leading-relaxed">
          SkillMate clearly distinguishes between <span className="text-[#5534DA] font-bold">Topics Studied</span>, <span className="text-emerald-700 font-bold">Interactive Missions Passed</span>, <span className="text-amber-700 font-bold">Boss Assessments Conquered</span>, and <span className="text-[#FF5C38] font-bold">Independent Student-Submitted Projects</span>. We never imply third-party certification unless independently reviewed.
        </p>
      </div>

      {/* The Passport Portfolio Card */}
      <div className="bg-white border-2 border-neutral-900/10 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs relative overflow-hidden">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-neutral-200">
          <div className="flex items-center gap-4">
            <img
              src={userProfile?.photoURL || 'https://api.dicebear.com/7.x/bottts/svg?seed=student'}
              alt={userProfile?.displayName || 'Student'}
              className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-[#FAF9FD] border-2 border-neutral-200 p-1 shadow-xs object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-black font-display text-neutral-900">
                  {userProfile?.displayName || 'SkillMate Explorer'}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EFEAFF] text-[#5534DA] font-bold font-mono">
                  Level {userProfile?.level || 1}
                </span>
              </div>
              <div className="text-xs md:text-sm text-[#FF5C38] font-bold mt-0.5">
                Target: {userProfile?.careerGoal || 'Full-Stack Developer'}
              </div>
              <p className="text-xs text-neutral-600 mt-1 max-w-xl leading-relaxed">
                {userProfile?.bio || 'Building portfolio-ready software projects and verifying skills.'}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 shrink-0 self-stretch sm:self-center">
            <div className="flex-1 sm:flex-none p-3.5 rounded-2xl bg-[#FFF8E7] border border-[#FFE194] text-center min-w-[70px]">
              <div className="text-lg font-black text-amber-900 font-mono">
                {userProfile?.totalXp || 0}
              </div>
              <div className="text-[10px] text-amber-700 uppercase font-extrabold">Total XP</div>
            </div>
            <div className="flex-1 sm:flex-none p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center min-w-[70px]">
              <div className="text-lg font-black text-emerald-800 font-mono">
                {totalCompletedSublevels}
              </div>
              <div className="text-[10px] text-emerald-700 uppercase font-extrabold">Missions</div>
            </div>
            <div className="flex-1 sm:flex-none p-3.5 rounded-2xl bg-[#EFEAFF] border border-[#DDD1FE] text-center min-w-[70px]">
              <div className="text-lg font-black text-[#5534DA] font-mono">
                {totalCompletedProjects}
              </div>
              <div className="text-[10px] text-[#5534DA] uppercase font-extrabold">Projects</div>
            </div>
          </div>
        </div>

        {/* Section: Verified Achievement Badges */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            Milestones & Badges
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
            {badgesEarned.map((b) => (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border transition-all ${
                  b.earned
                    ? 'border-2 border-neutral-900/10 bg-[#FFCD4E]/25 text-neutral-900 shadow-xs'
                    : 'border-neutral-200 bg-[#FAF9FD] text-neutral-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{b.icon}</span>
                  {b.earned ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white border border-neutral-900/10 text-neutral-900 font-bold">
                      EARNED
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-500 font-semibold">
                      LOCKED
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold text-neutral-900 font-display">{b.title}</div>
                <div className="text-[11px] text-neutral-600 mt-0.5 leading-snug">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Demonstrated Skill Missions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#5534DA]" />
              Interactive Skill Demonstrations ({completedSublevelsList.length} Passed)
            </h3>
            <span className="text-[11px] text-neutral-400 font-mono">
              Auto-aggregated from Level-Up
            </span>
          </div>

          {completedSublevelsList.length === 0 ? (
            <div className="p-6 rounded-2xl border border-dashed border-neutral-300 text-center text-xs text-neutral-500 bg-[#FAF9FD]">
              No interactive missions completed yet. Visit <span className="text-[#FF5C38] font-bold">Skill Level-Up</span> to conquer your first sublevel!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {completedSublevelsList.map((prog) => (
                <div
                  key={prog.sublevelId}
                  className="p-4 rounded-2xl border border-neutral-200 bg-[#FAF9FD] flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-neutral-900">
                      Sublevel {prog.sublevelId.replace('sub-', '').replace('-', '.')}
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono">
                      Completed • {prog.completedAt ? new Date(prog.completedAt).toLocaleDateString() : 'Recent'}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(prog.stars || 3)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section: Featured Projects Showcase */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <FolderGit2 className="w-4 h-4 text-[#FF5C38]" />
              Showcased Independent Projects ({Object.keys(projectSubmissions).length})
            </h3>
            <span className="text-[11px] text-neutral-400 font-mono">
              Auto-aggregated from Project Zone
            </span>
          </div>

          {Object.keys(projectSubmissions).length === 0 ? (
            <div className="p-6 rounded-2xl border border-dashed border-neutral-300 text-center text-xs text-neutral-500 bg-[#FAF9FD]">
              No projects recorded yet. Build and submit a project in <span className="text-[#5534DA] font-bold">Project Zone</span> to showcase it here!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.values(projectSubmissions).map((sub) => (
                <div
                  key={sub.projectId}
                  className="p-5 rounded-2xl border border-neutral-200 bg-[#FAF9FD] space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-white border border-neutral-200 text-neutral-700">
                        {sub.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          sub.status === 'completed'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                            : 'border-amber-200 bg-amber-50 text-amber-800'
                        }`}
                      >
                        {sub.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-neutral-900 font-display">{sub.title}</h4>
                    {sub.notes && (
                      <p className="text-xs text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                        {sub.notes}
                      </p>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-2 pt-2 border-t border-neutral-200 text-xs">
                    {sub.githubUrl ? (
                      <a
                        href={sub.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-800 font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code Repo</span>
                        <ExternalLink className="w-2.5 h-2.5 text-neutral-400" />
                      </a>
                    ) : (
                      <span className="text-neutral-400 text-[11px]">No repo linked</span>
                    )}

                    {sub.liveUrl && (
                      <a
                        href={sub.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-[#EFEAFF] hover:bg-[#FF5C38] hover:text-white text-[#5534DA] font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
