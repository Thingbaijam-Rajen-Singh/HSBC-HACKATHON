/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { LearnSkillView } from './components/LearnSkillView';
import { SkillLevelUpView } from './components/SkillLevelUpView';
import { CourseBrowserView } from './components/CourseBrowserView';
import { ProjectZoneView } from './components/ProjectZoneView';
import { SkillPassportView } from './components/SkillPassportView';
import { OpportunitiesView } from './components/OpportunitiesView';
import { ProfileView } from './components/ProfileView';
import { RoadmapFlowchartView } from './components/RoadmapFlowchartView';
import { AuthModal } from './components/AuthModal';

function SkillMateApp() {
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#C2B4E9] p-2 sm:p-4 md:p-6 lg:p-7 flex justify-center items-start text-neutral-900 font-sans selection:bg-[#FF5C38] selection:text-white">
      {/* Outer Floating Card Container matching the reference design */}
      <div className="w-full max-w-[1520px] bg-white rounded-2xl sm:rounded-[32px] lg:rounded-[38px] shadow-[0_24px_70px_-15px_rgba(72,44,136,0.28)] border-2 border-neutral-900/10 overflow-hidden flex flex-col min-h-[92vh] transition-all">
        {/* Top Navbar */}
        <Navbar
          activeSection={activeSection}
          onNavigate={setActiveSection}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <div className="flex-1 flex w-full min-w-0">
          {/* Navigation Sidebar */}
          <Sidebar
            activeSection={activeSection}
            onNavigate={setActiveSection}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />

          {/* Main Content Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto bg-white">
            {activeSection === 'dashboard' && (
              <DashboardView onNavigate={(sec) => setActiveSection(sec)} />
            )}

            {activeSection === 'learn' && (
              <LearnSkillView onNavigateToLevelUp={() => setActiveSection('level-up')} />
            )}

            {activeSection === 'roadmap-flowchart' && (
              <RoadmapFlowchartView
                onNavigateToLevelUp={() => setActiveSection('level-up')}
                onNavigateToLearn={() => setActiveSection('learn')}
              />
            )}

            {activeSection === 'level-up' && (
              <SkillLevelUpView onNavigateToProjects={() => setActiveSection('projects')} />
            )}

            {activeSection === 'courses' && <CourseBrowserView />}

            {activeSection === 'projects' && <ProjectZoneView />}

            {activeSection === 'passport' && <SkillPassportView />}

            {activeSection === 'opportunities' && <OpportunitiesView />}

            {activeSection === 'profile' && <ProfileView />}
          </main>
        </div>
      </div>

      {/* Global Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <SkillMateApp />
      </ProgressProvider>
    </AuthProvider>
  );
}
