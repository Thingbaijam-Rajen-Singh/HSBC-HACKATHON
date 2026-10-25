import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import {
  Globe,
  Lock,
  LogOut,
  Save,
  CheckCircle,
  Bookmark,
  ExternalLink,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { userProfile, updateProfileData, signOut } = useAuth();
  const { savedCourses } = useProgress();

  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [careerGoal, setCareerGoal] = useState(userProfile?.careerGoal || '');
  const [bio, setBio] = useState(userProfile?.bio || '');
  const [isPublic, setIsPublic] = useState(userProfile?.isPublicPortfolio ?? true);
  const [saveMessage, setSaveMessage] = useState(false);

  const avatarSeeds = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Sam', 'Riley', 'Casey'];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfileData({
      displayName,
      careerGoal,
      bio,
      isPublicPortfolio: isPublic,
    });
    setSaveMessage(true);
    setTimeout(() => setSaveMessage(false), 3000);
  };

  const handleSelectAvatar = async (seed: string) => {
    const newPhotoUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
    await updateProfileData({ photoURL: newPhotoUrl });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-[#FAF9FE] border-2 border-neutral-900/10 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={userProfile?.photoURL || 'https://api.dicebear.com/7.x/bottts/svg?seed=student'}
              alt={userProfile?.displayName || 'User'}
              className="w-16 h-16 rounded-3xl bg-white border-2 border-neutral-200 p-1 shadow-xs object-cover"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-black font-display text-neutral-900">
                {userProfile?.displayName || 'Student Profile'}
              </h1>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                {userProfile?.email || 'Authenticated Student Session'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={signOut}
              className="px-4 py-2 rounded-2xl bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 hover:text-neutral-900 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white border-2 border-neutral-900/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <h2 className="text-base font-black font-display text-neutral-900 pb-3 border-b border-neutral-200">
          Personal Information & Career Goals
        </h2>

        {/* Choose Avatar */}
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-500 mb-2">
            Select Your Avatar
          </label>
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {avatarSeeds.map((seed) => (
              <button
                key={seed}
                type="button"
                onClick={() => handleSelectAvatar(seed)}
                className="w-14 h-14 rounded-2xl bg-[#FAF9FD] border-2 border-neutral-200 hover:border-[#FF5C38] p-1 shrink-0 transition-all cursor-pointer shadow-xs hover:scale-105"
              >
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                  alt={seed}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-[#FAF9FD] border border-neutral-200 rounded-2xl text-xs md:text-sm text-neutral-900 font-semibold focus:outline-none focus:border-[#FF5C38]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Career Goal or Target Role
              </label>
              <input
                type="text"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                placeholder="e.g. Junior Frontend Developer"
                className="w-full px-4 py-2.5 bg-[#FAF9FD] border border-neutral-200 rounded-2xl text-xs md:text-sm text-neutral-900 font-semibold focus:outline-none focus:border-[#FF5C38]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Introduction & Developer Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full p-4 bg-[#FAF9FD] border border-neutral-200 rounded-2xl text-xs md:text-sm text-neutral-900 focus:outline-none focus:border-[#FF5C38] resize-none leading-relaxed"
            />
          </div>

          {/* Privacy Toggle */}
          <div className="pt-2">
            <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#FAF9FD] border border-neutral-200">
              <div className="flex items-center gap-3">
                {isPublic ? (
                  <Globe className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Lock className="w-5 h-5 text-neutral-400 shrink-0" />
                )}
                <div>
                  <div className="text-xs md:text-sm font-bold text-neutral-900">
                    Public Skill Passport
                  </div>
                  <div className="text-[11px] text-neutral-500 font-medium">
                    Allow recruiters and peers to view your portfolio via your public share link.
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPublic(!isPublic)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  isPublic ? 'bg-[#FF5C38]' : 'bg-neutral-300'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    isPublic ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {saveMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Profile preferences saved to Firebase Firestore!</span>
            </div>
          )}

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="px-7 py-3 rounded-2xl bg-[#FF5C38] hover:bg-[#E84D2B] text-white font-bold text-xs md:text-sm shadow-md shadow-[#FF5C38]/25 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Bookmarked Courses Shelf */}
      <div className="bg-white border-2 border-neutral-900/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="text-base font-black font-display text-neutral-900 flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-[#5534DA]" />
          Saved Course Bookmarks ({Object.keys(savedCourses).length})
        </h3>

        {Object.keys(savedCourses).length === 0 ? (
          <p className="text-xs text-neutral-500">
            No courses bookmarked yet. Explore the Course Browser to save external tutorials and certifications.
          </p>
        ) : (
          <div className="space-y-2.5">
            {Object.values(savedCourses).map((c) => (
              <div
                key={c.courseId}
                className="p-4 rounded-2xl bg-[#FAF9FD] border border-neutral-200 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-neutral-900 font-display">{c.title}</div>
                  <div className="text-[11px] text-neutral-500 font-medium">
                    {c.provider} • {c.isFree ? 'Free' : 'Paid'}
                  </div>
                </div>

                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-800 font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <span>Open</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
