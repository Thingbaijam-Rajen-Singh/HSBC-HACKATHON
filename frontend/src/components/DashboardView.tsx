import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { getCurriculumForSkill } from '../data/curriculumData';
import { availableSkills } from '../data/skillsData';
import {
  Compass,
  Play,
  Flame,
  Award,
  FolderGit2,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  Star,
  CheckCircle2,
  BookOpen,
  Lock,
  ListChecks,
  Check,
  Zap,
} from 'lucide-react';
import { LearnedSkillsModal } from './LearnedSkillsModal';
import { SkillPieChartSection } from './SkillPieChartSection';

interface Props {
  onNavigate: (section: string) => void;
}

export const DashboardView: React.FC<Props> = ({ onNavigate }) => {
  const { userProfile } = useAuth();
  const {
    progressMap,
    projectSubmissions,
    totalCompletedSublevels,
    totalCompletedProjects,
    isSublevelUnlocked,
  } = useProgress();

  const [selectedSkillId, setSelectedSkillId] = React.useState<string>(() => {
    return userProfile?.selectedSkill || localStorage.getItem('skillbridge_selected_skill') || 'ui-ux-design';
  });

  React.useEffect(() => {
    const handleSkillEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ skillId: string }>;
      if (customEvent.detail?.skillId) {
        setSelectedSkillId(customEvent.detail.skillId);
      }
    };
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === 'skillbridge_selected_skill' && e.newValue) {
        setSelectedSkillId(e.newValue);
      }
    };

    window.addEventListener('skillbridge-skill-changed', handleSkillEvent);
    window.addEventListener('storage', handleStorageEvent);

    const current = userProfile?.selectedSkill || localStorage.getItem('skillbridge_selected_skill');
    if (current && current !== selectedSkillId) {
      setSelectedSkillId(current);
    }

    return () => {
      window.removeEventListener('skillbridge-skill-changed', handleSkillEvent);
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [userProfile?.selectedSkill]);

  const activeWorlds = getCurriculumForSkill(selectedSkillId);
  const activeSkillObj = availableSkills.find((s) => s.id === selectedSkillId) || availableSkills[0];

  // Find next actionable sublevel for the active skill
  let nextSublevel = null;
  for (const world of activeWorlds) {
    for (const lvl of world.levels) {
      for (const sub of lvl.sublevels) {
        if (!progressMap[sub.id]?.completed && isSublevelUnlocked(sub.id)) {
          nextSublevel = { sub, world, lvl };
          break;
        }
      }
      if (nextSublevel) break;
    }
    if (nextSublevel) break;
  }

  if (!nextSublevel) {
    nextSublevel = {
      sub: activeWorlds[0].levels[0].sublevels[0],
      world: activeWorlds[0],
      lvl: activeWorlds[0].levels[0],
    };
  }

  const xp = userProfile?.totalXp || 0;
  const currentLevel = userProfile?.level || 1;
  const xpInCurrentLevel = xp % 100;

  const [isLearnedModalOpen, setIsLearnedModalOpen] = React.useState(false);

  // Compute all required skills and their status for active curriculum
  const allTrackSublevels = React.useMemo(() => {
    const list: {
      sublevel: any;
      world: any;
      levelTitle: string;
      isCompleted: boolean;
      isUnlocked: boolean;
      orderIndex: number;
    }[] = [];

    let count = 0;
    activeWorlds.forEach((w) => {
      w.levels.forEach((lvl) => {
        lvl.sublevels.forEach((sub) => {
          count++;
          list.push({
            sublevel: sub,
            world: w,
            levelTitle: lvl.title,
            isCompleted: Boolean(progressMap[sub.id]?.completed),
            isUnlocked: isSublevelUnlocked(sub.id),
            orderIndex: count,
          });
        });
      });
    });
    return list;
  }, [activeWorlds, progressMap, isSublevelUnlocked]);

  const handleLaunchSkill = (sublevelId: string) => {
    localStorage.setItem('skillbridge_target_sublevel', sublevelId);
    onNavigate('level-up');
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-16">
      {/* ======================================================== */}
      {/* HERO SECTION — Styled directly after Reference UI        */}
      {/* ======================================================== */}
      <section className="relative bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-neutral-900/10 shadow-xs overflow-hidden">
        {/* Subtle decorative background circle / curves */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#F3EEFE] -z-0 pointer-events-none opacity-70" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#FFF9E8] -z-0 pointer-events-none opacity-60" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headline, Subtitle, CTAs, 3 Stat Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black font-display tracking-tight text-neutral-900 leading-[1.06]">
                Browse{' '}
                <span className="text-[#FF5C38] inline-block">courses</span>{' '}
                for you
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 font-medium max-w-xl leading-relaxed">
                Search the entire internet for all available courses, including both free and paid options.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-1">
              <button
                onClick={() => onNavigate('courses')}
                className="px-8 py-3.5 rounded-2xl bg-[#FF5C38] hover:bg-[#E84D2B] text-white font-bold text-sm sm:text-base shadow-md shadow-[#FF5C38]/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                Browse courses
              </button>

              <button
                onClick={() => onNavigate('projects')}
                className="text-sm sm:text-base font-bold text-neutral-800 hover:text-[#FF5C38] flex items-center gap-1.5 transition-colors cursor-pointer group"
              >
                <span>View Projects</span>
                <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </button>
            </div>
          </div>

          {/* Right Column: Mentors Tag & Surfing Illustration */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center relative">

            {/* Illustration Container */}
            <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-3xl overflow-hidden flex items-center justify-center bg-white border border-neutral-100 shadow-xs group">
              <img
                src="/images/hero-learning-illustration.jpg"
                alt="Creative student surfing on a giant pastel purple pencil through clouds and stars"
                className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECONDARY DASHBOARD SECTION — Actionable Progress & Learning */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recommended Next Step + Skills Remaining List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recommended Next Step Card */}
          <div className="bg-[#FAF9FE] border-2 border-neutral-900/10 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#FF5C38] flex items-center gap-2">
                <Flame className="w-4 h-4 fill-[#FF5C38]" />
                Recommended Next Step
              </h2>
              <span className="text-xs font-mono font-bold text-[#5534DA] bg-[#EFEAFF] px-3 py-1 rounded-full border border-[#DDD1FE]">
                {nextSublevel.world.title.split(':')[0]}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-neutral-900/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-neutral-500 mb-0.5">
                  {nextSublevel.lvl.title}
                </div>
                <h3 className="text-lg font-black font-display text-neutral-900">
                  {nextSublevel.sub.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                  {nextSublevel.sub.summary}
                </p>
              </div>

              <button
                onClick={() => onNavigate('level-up')}
                className="px-6 py-3 rounded-2xl bg-[#FF5C38] hover:bg-[#E84D2B] text-white font-bold text-xs shrink-0 flex items-center justify-center gap-2 shadow-md shadow-[#FF5C38]/20 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Launch Mission</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Skill Pie Chart with Citing of Learned vs Left to Learn Skills */}
          <SkillPieChartSection
            activeSkill={activeSkillObj}
            allSkills={availableSkills}
            onSelectSkill={(newSkillId) => {
              setSelectedSkillId(newSkillId);
              localStorage.setItem('skillbridge_selected_skill', newSkillId);
              window.dispatchEvent(
                new CustomEvent('skillbridge-skill-changed', {
                  detail: { skillId: newSkillId },
                })
              );
            }}
            skillItems={allTrackSublevels}
            onLaunchSkill={handleLaunchSkill}
            onOpenLearnedModal={() => setIsLearnedModalOpen(true)}
          />
        </div>

        {/* Right Column: Project Zone Activity & Quick Links */}
        <div className="space-y-6">
          {/* Project Zone Mini Hub */}
          <div className="bg-white border-2 border-neutral-900/10 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-[#5534DA]" />
                Project Zone Activity
              </h2>
              <button
                onClick={() => onNavigate('projects')}
                className="text-xs font-bold text-[#FF5C38] hover:underline"
              >
                View All
              </button>
            </div>

            {Object.keys(projectSubmissions).length === 0 ? (
              <div className="p-5 rounded-2xl bg-[#FAF9FD] border border-neutral-200 text-center space-y-2.5">
                <div className="text-xs text-neutral-600 font-medium">
                  You haven’t started an independent project yet.
                </div>
                <button
                  onClick={() => onNavigate('projects')}
                  className="px-5 py-2.5 rounded-xl bg-[#EFEAFF] hover:bg-[#E5DEFF] text-[#5534DA] text-xs font-bold transition-colors cursor-pointer border border-[#DDD1FE]"
                >
                  Browse Project Briefs
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {Object.values(projectSubmissions).slice(0, 3).map((sub) => (
                  <div
                    key={sub.projectId}
                    className="p-3.5 rounded-2xl bg-[#FAF9FD] border border-neutral-200/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-neutral-900">{sub.title}</div>
                      <div className="text-[11px] text-neutral-500 font-mono">
                        {sub.category}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        sub.status === 'completed'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-amber-200 bg-amber-50 text-amber-800'
                      }`}
                    >
                      {sub.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links Hub */}
          <div className="bg-[#FAF9FE] border-2 border-neutral-900/10 rounded-3xl p-6 sm:p-7 space-y-3.5 shadow-xs">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 mb-2">
              Platform Features
            </h2>

            <button
              onClick={() => onNavigate('courses')}
              className="w-full p-3.5 rounded-2xl bg-white hover:bg-neutral-50 border border-neutral-200 text-left transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EFEAFF] flex items-center justify-center text-[#5534DA]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900 group-hover:text-[#FF5C38] transition-colors">
                    Course Browser
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Search free & paid courses
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
            </button>

            <button
              onClick={() => onNavigate('opportunities')}
              className="w-full p-3.5 rounded-2xl bg-white hover:bg-neutral-50 border border-neutral-200 text-left transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FFF8E7] flex items-center justify-center text-amber-600">
                  <Sparkles className="w-4 h-4 fill-amber-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900 group-hover:text-[#FF5C38] transition-colors">
                    Opportunities
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Internships & fellowships
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
            </button>

            <button
              onClick={() => onNavigate('passport')}
              className="w-full p-3.5 rounded-2xl bg-white hover:bg-neutral-50 border border-neutral-200 text-left transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#E8F8F0] flex items-center justify-center text-emerald-600">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900 group-hover:text-[#FF5C38] transition-colors">
                    Skill Passport
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Auto-generated portfolio
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Prior Knowledge Modal */}
      <LearnedSkillsModal
        isOpen={isLearnedModalOpen}
        onClose={() => setIsLearnedModalOpen(false)}
        skill={activeSkillObj}
      />
    </div>
  );
};
