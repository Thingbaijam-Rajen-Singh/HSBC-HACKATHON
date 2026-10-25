import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from './AuthContext';
import { SublevelProgress, ProjectSubmission, SavedCourse, CourseItem } from '../types';
import { getCurriculumForSkill } from '../data/curriculumData';
import confetti from 'canvas-confetti';

interface ProgressContextType {
  progressMap: Record<string, SublevelProgress>;
  projectSubmissions: Record<string, ProjectSubmission>;
  savedCourses: Record<string, SavedCourse>;
  recordSublevelComplete: (sublevelId: string, worldId: string, levelId: string, stars: number, xpEarned: number) => Promise<void>;
  saveProjectSubmission: (projectId: string, title: string, category: string, status: 'not_started' | 'in_progress' | 'completed', githubUrl?: string, liveUrl?: string, notes?: string) => Promise<void>;
  toggleCourseSaved: (course: CourseItem) => Promise<boolean>;
  isSublevelCompleted: (sublevelId: string) => boolean;
  isSublevelUnlocked: (sublevelId: string) => boolean;
  totalCompletedSublevels: number;
  totalCompletedProjects: number;
  smartDemonstratedTopics: string[];
  setSmartDemonstratedTopics: (topics: string[]) => void;
  quickBuildGoal: string | null;
  setQuickBuildGoal: (goal: string | null) => void;
  markSublevelsLearned: (sublevelIds: string[], skillId: string) => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const LOCAL_PROGRESS_KEY = 'skillbridge_sublevel_progress';
const LOCAL_PROJECTS_KEY = 'skillbridge_project_submissions';
const LOCAL_COURSES_KEY = 'skillbridge_saved_courses';

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, userProfile, updateProfileData } = useAuth();

  const [progressMap, setProgressMap] = useState<Record<string, SublevelProgress>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_PROGRESS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [projectSubmissions, setProjectSubmissions] = useState<Record<string, ProjectSubmission>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_PROJECTS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [savedCourses, setSavedCourses] = useState<Record<string, SavedCourse>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_COURSES_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [smartDemonstratedTopics, setSmartDemonstratedTopics] = useState<string[]>([]);
  const [quickBuildGoal, setQuickBuildGoal] = useState<string | null>(null);

  // Sync with Firestore when authenticated user is present
  useEffect(() => {
    if (!currentUser) return;

    // Listen to sublevel progress subcollection
    const progressCol = collection(db, 'users', currentUser.uid, 'progress');
    const unsubProgress = onSnapshot(
      progressCol,
      (snapshot) => {
        const updated: Record<string, SublevelProgress> = {};
        snapshot.forEach((d) => {
          updated[d.id] = d.data() as SublevelProgress;
        });
        setProgressMap(updated);
        try {
          localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}/progress`);
      }
    );

    // Listen to project submissions
    const projectsCol = collection(db, 'users', currentUser.uid, 'projects');
    const unsubProjects = onSnapshot(
      projectsCol,
      (snapshot) => {
        const updated: Record<string, ProjectSubmission> = {};
        snapshot.forEach((d) => {
          updated[d.id] = d.data() as ProjectSubmission;
        });
        setProjectSubmissions(updated);
        try {
          localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}/projects`);
      }
    );

    // Listen to saved courses
    const coursesCol = collection(db, 'users', currentUser.uid, 'savedCourses');
    const unsubCourses = onSnapshot(
      coursesCol,
      (snapshot) => {
        const updated: Record<string, SavedCourse> = {};
        snapshot.forEach((d) => {
          updated[d.id] = d.data() as SavedCourse;
        });
        setSavedCourses(updated);
        try {
          localStorage.setItem(LOCAL_COURSES_KEY, JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}/savedCourses`);
      }
    );

    return () => {
      unsubProgress();
      unsubProjects();
      unsubCourses();
    };
  }, [currentUser]);

  // Check if sublevel is completed
  const isSublevelCompleted = (sublevelId: string): boolean => {
    return Boolean(progressMap[sublevelId]?.completed);
  };

  // Determine if a sublevel is unlocked
  const isSublevelUnlocked = (sublevelId: string): boolean => {
    // If roadmapMode is Advanced, Smart Plan, or Hack Roadmap, prerequisites are bypassed to access modern core directly
    if (userProfile?.roadmapMode === 'advanced' || userProfile?.roadmapMode === 'smart' || userProfile?.roadmapMode === 'quick_build') {
      return true;
    }

    // Flatten all sublevels for active selected skill in chronological order
    const currentSkill = userProfile?.selectedSkill || localStorage.getItem('skillbridge_selected_skill') || 'ui-ux-design';
    const activeWorlds = getCurriculumForSkill(currentSkill);
    const allSublevels: string[] = [];
    activeWorlds.forEach(world => {
      world.levels.forEach(lvl => {
        lvl.sublevels.forEach(sub => {
          allSublevels.push(sub.id);
        });
      });
    });

    const index = allSublevels.indexOf(sublevelId);
    if (index === 0) return true; // First sublevel of active skill is always unlocked
    if (index < 0) return true;

    // An item is unlocked if the immediately preceding sublevel is completed
    const prevSublevelId = allSublevels[index - 1];
    return Boolean(progressMap[prevSublevelId]?.completed);
  };

  // Record sublevel completion
  const recordSublevelComplete = async (
    sublevelId: string,
    worldId: string,
    levelId: string,
    stars: number,
    xpEarned: number
  ) => {
    const existing = progressMap[sublevelId];
    const prevStars = existing?.stars || 0;
    const effectiveStars = Math.max(prevStars, stars);
    const existingXp = existing?.xpEarned || 0;
    const additionalXp = Math.max(0, xpEarned - existingXp);

    const record: SublevelProgress = {
      userId: currentUser?.uid || userProfile?.userId || 'guest-student',
      sublevelId,
      worldId,
      levelId,
      completed: true,
      stars: effectiveStars,
      xpEarned: Math.max(existingXp, xpEarned),
      attempts: (existing?.attempts || 0) + 1,
      completedAt: new Date().toISOString(),
    };

    const newMap = { ...progressMap, [sublevelId]: record };
    setProgressMap(newMap);
    localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(newMap));

    // Celebrate with confetti!
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
      });
    } catch {
      // Ignore if confetti not supported
    }

    // Update user profile XP and Level
    const newTotalXp = (userProfile?.totalXp || 0) + additionalXp;
    const calculatedLevel = Math.max(1, Math.floor(newTotalXp / 100) + 1);

    await updateProfileData({
      totalXp: newTotalXp,
      level: calculatedLevel,
    });

    // Write to Firestore if authenticated
    if (currentUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid, 'progress', sublevelId), record);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.uid}/progress/${sublevelId}`);
      }
    }
  };

  // Batch mark sublevels as learned for a skill track
  const markSublevelsLearned = async (sublevelIds: string[], skillId: string) => {
    const worlds = getCurriculumForSkill(skillId);
    const allTrackSublevels: { sublevel: any; worldId: string; levelId: string }[] = [];
    worlds.forEach(w => {
      w.levels.forEach(l => {
        l.sublevels.forEach(s => {
          allTrackSublevels.push({ sublevel: s, worldId: w.id, levelId: l.id });
        });
      });
    });

    const newMap = { ...progressMap };
    let xpAdded = 0;

    for (const item of allTrackSublevels) {
      const isSelected = sublevelIds.includes(item.sublevel.id);
      const existing = newMap[item.sublevel.id];

      if (isSelected) {
        if (!existing?.completed) {
          const rewardXp = item.sublevel.activities?.[0]?.xpReward || 40;
          const record: SublevelProgress = {
            userId: currentUser?.uid || userProfile?.userId || 'guest-student',
            sublevelId: item.sublevel.id,
            worldId: item.worldId,
            levelId: item.levelId,
            completed: true,
            stars: 3,
            xpEarned: rewardXp,
            attempts: 1,
            completedAt: new Date().toISOString(),
          };
          newMap[item.sublevel.id] = record;
          xpAdded += rewardXp;
          if (currentUser) {
            try {
              await setDoc(doc(db, 'users', currentUser.uid, 'progress', item.sublevel.id), record);
            } catch (err) {
              console.error(err);
            }
          }
        }
      } else if (existing?.completed) {
        delete newMap[item.sublevel.id];
        if (currentUser) {
          try {
            await deleteDoc(doc(db, 'users', currentUser.uid, 'progress', item.sublevel.id));
          } catch (err) {
            console.error(err);
          }
        }
      }
    }

    setProgressMap(newMap);
    localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(newMap));

    // Save demonstrated topic names for smart calibration
    const learnedTitles = allTrackSublevels
      .filter(item => sublevelIds.includes(item.sublevel.id))
      .map(item => item.sublevel.title);
    setSmartDemonstratedTopics(learnedTitles);

    if (xpAdded > 0) {
      const newTotalXp = (userProfile?.totalXp || 0) + xpAdded;
      const calculatedLevel = Math.max(1, Math.floor(newTotalXp / 100) + 1);
      await updateProfileData({
        totalXp: newTotalXp,
        level: calculatedLevel,
      });

      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899'],
        });
      } catch {}
    }
  };

  // Save project submission
  const saveProjectSubmission = async (
    projectId: string,
    title: string,
    category: string,
    status: 'not_started' | 'in_progress' | 'completed',
    githubUrl?: string,
    liveUrl?: string,
    notes?: string
  ) => {
    const submission: ProjectSubmission = {
      userId: currentUser?.uid || userProfile?.userId || 'guest-student',
      projectId,
      title,
      category,
      status,
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      notes: notes || '',
      featuredInPassport: true,
      updatedAt: new Date().toISOString(),
    };

    const newProjects = { ...projectSubmissions, [projectId]: submission };
    setProjectSubmissions(newProjects);
    localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(newProjects));

    if (status === 'completed') {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#6366f1', '#10b981', '#fbbf24'],
        });
      } catch {
        // Safe fallback
      }
      // Award 200 XP for completing a portfolio-ready project
      const newTotalXp = (userProfile?.totalXp || 0) + 200;
      const calculatedLevel = Math.max(1, Math.floor(newTotalXp / 100) + 1);
      await updateProfileData({
        totalXp: newTotalXp,
        level: calculatedLevel,
      });
    }

    if (currentUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid, 'projects', projectId), submission);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.uid}/projects/${projectId}`);
      }
    }
  };

  // Save / Bookmark Course
  const toggleCourseSaved = async (course: CourseItem): Promise<boolean> => {
    const isSaved = Boolean(savedCourses[course.id]);
    const userId = currentUser?.uid || userProfile?.userId || 'guest-student';

    if (isSaved) {
      const updated = { ...savedCourses };
      delete updated[course.id];
      setSavedCourses(updated);
      localStorage.setItem(LOCAL_COURSES_KEY, JSON.stringify(updated));

      if (currentUser) {
        try {
          await deleteDoc(doc(db, 'users', currentUser.uid, 'savedCourses', course.id));
        } catch (err) {
          handleFirestoreError(err, OperationType.DELETE, `users/${currentUser.uid}/savedCourses/${course.id}`);
        }
      }
      return false;
    } else {
      const newSaved: SavedCourse = {
        userId,
        courseId: course.id,
        title: course.title,
        provider: course.provider,
        url: course.url,
        isFree: course.isFree,
        savedAt: new Date().toISOString(),
      };
      const updated = { ...savedCourses, [course.id]: newSaved };
      setSavedCourses(updated);
      localStorage.setItem(LOCAL_COURSES_KEY, JSON.stringify(updated));

      if (currentUser) {
        try {
          await setDoc(doc(db, 'users', currentUser.uid, 'savedCourses', course.id), newSaved);
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.uid}/savedCourses/${course.id}`);
        }
      }
      return true;
    }
  };

  const totalCompletedSublevels = Object.values(progressMap).filter(p => p.completed).length;
  const totalCompletedProjects = Object.values(projectSubmissions).filter(p => p.status === 'completed').length;

  return (
    <ProgressContext.Provider
      value={{
        progressMap,
        projectSubmissions,
        savedCourses,
        recordSublevelComplete,
        saveProjectSubmission,
        toggleCourseSaved,
        isSublevelCompleted,
        isSublevelUnlocked,
        totalCompletedSublevels,
        totalCompletedProjects,
        smartDemonstratedTopics,
        setSmartDemonstratedTopics,
        quickBuildGoal,
        setQuickBuildGoal,
        markSublevelsLearned,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within a ProgressProvider');
  return context;
};
