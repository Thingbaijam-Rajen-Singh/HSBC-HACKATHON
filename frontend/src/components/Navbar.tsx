import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Menu, X, LogIn, ChevronDown, GitBranch } from 'lucide-react';

interface Props {
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenAuth: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<Props> = ({
  activeSection,
  onNavigate,
  onOpenAuth,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const { userProfile, currentUser } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Brand Zone */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 lg:hidden cursor-pointer transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2.5 text-left cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-2xl bg-[#FF5C38] flex items-center justify-center text-white shadow-md shadow-[#FF5C38]/25 group-hover:scale-105 transition-transform font-display font-extrabold text-base">
            SM
          </div>
          <div className="flex items-baseline">
            <span className="font-extrabold text-xl font-display tracking-tight text-[#FF5C38]">
              Skill
            </span>
            <span className="font-extrabold text-xl font-display tracking-tight text-neutral-900">
              Mate
            </span>
          </div>
        </button>
      </div>

      {/* Center Nav Links */}
      <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-semibold text-neutral-700">
        <button
          onClick={() => onNavigate('learn')}
          className={`flex items-center gap-1 hover:text-[#FF5C38] transition-colors cursor-pointer ${
            activeSection === 'learn' ? 'text-[#FF5C38]' : ''
          }`}
        >
          <span>Subjects</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        </button>
        <button
          onClick={() => onNavigate('roadmap-flowchart')}
          className={`flex items-center gap-1.5 hover:text-[#FF5C38] transition-colors cursor-pointer px-2.5 py-1 rounded-xl ${
            activeSection === 'roadmap-flowchart'
              ? 'text-[#FF5C38] bg-[#FFF2ED] font-bold'
              : 'hover:bg-neutral-50'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5 text-[#FF5C38]" />
          <span>Roadmap Flowchart</span>
        </button>
        <button
          onClick={() => onNavigate('courses')}
          className={`flex items-center gap-1 hover:text-[#FF5C38] transition-colors cursor-pointer ${
            activeSection === 'courses' ? 'text-[#FF5C38]' : ''
          }`}
        >
          <span>Courses</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        </button>
        <button
          onClick={() => onNavigate('level-up')}
          className={`hover:text-[#FF5C38] transition-colors cursor-pointer ${
            activeSection === 'level-up' ? 'text-[#FF5C38]' : ''
          }`}
        >
          Level-Up
        </button>
        <button
          onClick={() => onNavigate('projects')}
          className={`hover:text-[#FF5C38] transition-colors cursor-pointer ${
            activeSection === 'projects' ? 'text-[#FF5C38]' : ''
          }`}
        >
          Project Zone
        </button>
        <button
          onClick={() => onNavigate('passport')}
          className={`hover:text-[#FF5C38] transition-colors cursor-pointer ${
            activeSection === 'passport' ? 'text-[#FF5C38]' : ''
          }`}
        >
          Skill Passport
        </button>
      </nav>

      {/* Right Action Zone */}
      <div className="flex items-center gap-3">
        {/* XP and Level Counter */}
        <div className="flex items-center gap-2 bg-[#FFF8E7] border border-[#FFE194] px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-900 shadow-xs">
          <span className="flex items-center gap-1 text-amber-600 font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            {userProfile?.totalXp || 0} XP
          </span>
          <span className="w-1 h-1 rounded-full bg-amber-400 hidden sm:block" />
          <span className="text-[#FF5C38] font-bold font-mono hidden sm:inline">
            Lvl {userProfile?.level || 1}
          </span>
        </div>

        {/* Profile / Auth Buttons */}
        {userProfile ? (
          <button
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2.5 p-1 sm:px-3 sm:py-1.5 rounded-full border border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 transition-all cursor-pointer shadow-xs"
          >
            <img
              src={userProfile.photoURL || 'https://api.dicebear.com/7.x/bottts/svg?seed=student'}
              alt={userProfile.displayName}
              className="w-7 h-7 rounded-full bg-purple-100 object-cover border border-purple-200"
            />
            <span className="text-xs font-bold text-neutral-800 hidden md:inline max-w-[120px] truncate">
              {userProfile.displayName}
            </span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-2 text-xs font-bold text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer hidden sm:block"
            >
              Sign up
            </button>
            <button
              onClick={onOpenAuth}
              className="px-5 py-2 rounded-full bg-[#FF5C38] hover:bg-[#E84D2B] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#FF5C38]/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
