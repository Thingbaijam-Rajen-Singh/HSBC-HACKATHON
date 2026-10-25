import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, googleProvider, db, testConnection, handleFirestoreError, OperationType } from '../lib/firebase';
import { UserProfile, RoadmapMode } from '../types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInDemoStudent: (name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfileData: (updates: Partial<UserProfile>) => Promise<void>;
  setActiveSkillAndRoadmap: (skillId: string, mode: RoadmapMode) => Promise<void>;
  setSelectedSkill: (skillId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'skillbridge_local_user_profile';
const LOCAL_STORAGE_SKILL_KEY = 'skillbridge_selected_skill';

const getInitialProfile = (): UserProfile => {
  const storedSkill = localStorage.getItem(LOCAL_STORAGE_SKILL_KEY) || 'ui-ux-design';
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed) {
        if (!parsed.selectedSkill || parsed.selectedSkill !== storedSkill) {
          parsed.selectedSkill = storedSkill;
        }
        return parsed;
      }
    }
  } catch (e) {
    console.error(e);
  }

  return {
    userId: 'guest-student',
    displayName: 'SkillMate Explorer',
    email: '',
    photoURL: 'https://api.dicebear.com/7.x/bottts/svg?seed=student',
    bio: 'Self-motivated student learning skills and building portfolio-ready applications.',
    careerGoal: 'Junior Full-Stack Web Developer',
    selectedSkill: storedSkill,
    roadmapMode: 'normal',
    totalXp: 0,
    level: 1,
    isPublicPortfolio: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(getInitialProfile);
  const [loading, setLoading] = useState<boolean>(true);

  // Test server connection on boot
  useEffect(() => {
    testConnection();
  }, []);

  // Listen to Firebase auth state changes
  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        const userDocRef = doc(db, 'users', user.uid);

        // Listen to live user profile changes
        unsubscribeProfile = onSnapshot(
          userDocRef,
          async (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.data() as UserProfile;
              const storedSkill = localStorage.getItem(LOCAL_STORAGE_SKILL_KEY);
              if (storedSkill) {
                data.selectedSkill = storedSkill;
              }
              setUserProfile(data);
              try {
                localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(data));
              } catch (e) {
                console.error(e);
              }
            } else {
              // Create default initial profile in Firestore
              const storedSkill = localStorage.getItem(LOCAL_STORAGE_SKILL_KEY) || 'ui-ux-design';
              const defaultProfile: UserProfile = {
                userId: user.uid,
                displayName: user.displayName || 'SkillMate Explorer',
                email: user.email || '',
                photoURL: user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.uid}`,
                bio: 'Passionate student learning software engineering and building portfolio-ready applications.',
                careerGoal: 'Junior Full-Stack Web Developer',
                selectedSkill: storedSkill,
                roadmapMode: 'normal',
                totalXp: 0,
                level: 1,
                isPublicPortfolio: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };

              try {
                await setDoc(userDocRef, defaultProfile);
                setUserProfile(defaultProfile);
                localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(defaultProfile));
              } catch (err) {
                handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
              }
            }
            setLoading(false);
          },
          (error) => {
            handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
            setLoading(false);
          }
        );
      } else {
        if (unsubscribeProfile) {
          unsubscribeProfile();
          unsubscribeProfile = null;
        }
        setUserProfile(getInitialProfile());
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.warn('Google sign-in popup encountered issue or cancelled, activating local student mode:', error?.message);
      // If popup is blocked by iframe security sandbox, fallback to instant guest account
      await signInDemoStudent('Google Explorer');
    } finally {
      setLoading(false);
    }
  };

  const signInDemoStudent = async (name: string = 'Alex Rivera') => {
    const demoId = 'demo-student-' + (auth.currentUser?.uid || 'guest');
    const storedSkill = localStorage.getItem(LOCAL_STORAGE_SKILL_KEY) || 'web-dev';
    const demoProfile: UserProfile = {
      userId: demoId,
      displayName: name,
      email: 'alex.rivera@example.com',
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      bio: 'Self-motivated student mastering modern architecture and proving my skills through tangible open-source projects.',
      careerGoal: 'Frontend / Full-Stack Developer',
      selectedSkill: storedSkill,
      roadmapMode: 'normal',
      totalXp: 35,
      level: 1,
      isPublicPortfolio: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setUserProfile(demoProfile);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(demoProfile));

    // Also attempt Firestore sync if user is signed in to auth
    if (auth.currentUser) {
      try {
        await setDoc(doc(db, 'users', auth.currentUser.uid), demoProfile);
      } catch (err) {
        // Non-blocking for demo
        console.warn('Demo profile firestore sync note:', err);
      }
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
    } catch (e) {
      console.warn('Sign out error:', e);
    }
    setCurrentUser(null);
    setUserProfile(getInitialProfile());
  };

  const updateProfileData = async (updates: Partial<UserProfile>) => {
    const base = userProfile || getInitialProfile();
    const updated: UserProfile = {
      ...base,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    if (updates.selectedSkill) {
      localStorage.setItem(LOCAL_STORAGE_SKILL_KEY, updates.selectedSkill);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('skillbridge-skill-changed', {
            detail: { skillId: updates.selectedSkill, mode: updates.roadmapMode || base.roadmapMode },
          })
        );
      }
    }

    setUserProfile(updated);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updated));

    if (currentUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid), updated, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `users/${currentUser.uid}`);
      }
    }
  };

  const setActiveSkillAndRoadmap = async (skillId: string, mode: RoadmapMode) => {
    localStorage.setItem(LOCAL_STORAGE_SKILL_KEY, skillId);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('skillbridge-skill-changed', {
          detail: { skillId, mode },
        })
      );
    }
    await updateProfileData({
      selectedSkill: skillId,
      roadmapMode: mode,
    });
  };

  const setSelectedSkill = async (skillId: string) => {
    localStorage.setItem(LOCAL_STORAGE_SKILL_KEY, skillId);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('skillbridge-skill-changed', {
          detail: { skillId },
        })
      );
    }
    await updateProfileData({
      selectedSkill: skillId,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        signInWithGoogle,
        signInDemoStudent,
        signOut,
        updateProfileData,
        setActiveSkillAndRoadmap,
        setSelectedSkill,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
