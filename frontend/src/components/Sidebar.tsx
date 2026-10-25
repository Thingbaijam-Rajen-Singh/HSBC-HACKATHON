import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Flame,
  BookOpen,
  FolderGit2,
  Award,
  Sparkles,
  User,
  ChevronRight,
  Layers,
  GitBranch,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { availableSkills } from '../data/skillsData';

interface Props {
  activeSection: string;
  onNavigate: (section: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<Props> = ({
  activeSection,
  onNavigate,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const { userProfile } = useAuth();
  const { totalCompletedSublevels, totalCompletedProjects } = useProgress();

  const [activeSkillId, setActiveSkillId] = React.useState<string>(() => {
    return userProfile?.selectedSkill || localStorage.getItem('skillbridge_selected_skill') || 'ui-ux-design';
  });

  React.useEffect(() => {
    const handleSkillEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ skillId: string }>;
      if (customEvent.detail?.skillId) {
        setActiveSkillId(customEvent.detail.skillId);
      }
    };
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === 'skillbridge_selected_skill' && e.newValue) {
        setActiveSkillId(e.newValue);
      }
    };

    window.addEventListener('skillbridge-skill-changed', handleSkillEvent);
    window.addEventListener('storage', handleStorageEvent);

    const current = userProfile?.selectedSkill || localStorage.getItem('skillbridge_selected_skill');
    if (current && current !== activeSkillId) {
      setActiveSkillId(current);
    }

    return () => {
      window.removeEventListener('skillbridge-skill-changed', handleSkillEvent);
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [userProfile?.selectedSkill]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'learn', label: 'Learn a Skill', icon: Compass },
    { id: 'roadmap-flowchart', label: 'Roadmap Flowchart', icon: GitBranch },
    {
      id: 'level-up',
      label: 'Skill Level-Up',
      icon: Flame,
      badge: totalCompletedSublevels > 0 ? `${totalCompletedSublevels} Done` : undefined,
      highlight: true,
    },
    { id: 'courses', label: 'Course Browser', icon: BookOpen },
    {
      id: 'projects',
      label: 'Project Zone',
      icon: FolderGit2,
      badge: totalCompletedProjects > 0 ? `${totalCompletedProjects} Built` : undefined,
    },
    { id: 'passport', label: 'My Skill Passport', icon: Award },
    { id: 'opportunities', label: 'Opportunities', icon: Sparkles },
    { id: 'profile', label: 'Profile & Settings', icon: User },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-neutral-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-[65px] z-30 h-[calc(100vh-65px)] lg:h-auto w-64 bg-[#FAF9FD] border-r border-neutral-200/80 p-4 flex flex-col justify-between transition-transform duration-200 shrink-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Main Navigation List */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              let activeClasses =
                'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/90 font-medium';
              if (isActive) {
                if (item.id === 'level-up' || item.id === 'dashboard') {
                  activeClasses = 'bg-[#FF5C38] text-white font-bold shadow-sm shadow-[#FF5C38]/20';
                } else {
                  activeClasses = 'bg-[#EFEAFF] text-[#5534DA] font-bold border border-[#DDD1FE]';
                }
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs md:text-sm transition-all cursor-pointer ${activeClasses}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#FFCD4E] text-neutral-900'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Current Track Mini-card */}
        <div className="p-4 rounded-3xl bg-white border-2 border-neutral-900/10 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 font-bold uppercase tracking-wider">
            <span>ACTIVE TRACK</span>
            <span className="text-[#FF5C38] font-bold">
              {userProfile?.roadmapMode || 'Normal'}
            </span>
          </div>
          <div className="text-sm font-extrabold text-neutral-900 font-display truncate">
            {availableSkills.find((s) => s.id === activeSkillId)?.title || 'UI/UX & Product Design'}
          </div>
          <button
            onClick={() => handleItemClick('level-up')}
            className="w-full py-2 rounded-xl bg-[#FAF9FD] hover:bg-[#EFEAFF] text-neutral-800 hover:text-[#5534DA] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-neutral-200/80"
          >
            <span>Open Level-Up Map</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    </>
  );
};
