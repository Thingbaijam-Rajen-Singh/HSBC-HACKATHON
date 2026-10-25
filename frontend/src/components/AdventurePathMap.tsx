import React, { useState } from 'react';
import { World, Sublevel, UserProfile, SublevelProgress } from '../types';
import {
  CheckCircle2,
  Lock,
  Play,
  Star,
  Sparkles,
  Trophy,
  ChevronRight,
  Flame,
  Award,
  Compass,
} from 'lucide-react';

interface AdventurePathMapProps {
  worlds: World[];
  activeSkillTitle: string;
  userProfile: UserProfile | null;
  progressMap: Record<string, SublevelProgress>;
  isSublevelCompleted: (id: string) => boolean;
  isSublevelUnlocked: (id: string) => boolean;
  onSelectSublevel: (sublevel: Sublevel) => void;
  onQuickStart: (sublevel: Sublevel) => void;
}

// Single World Adventure Section Component
const WorldAdventureSection: React.FC<{
  world: World;
  worldIndex: number;
  userProfile: UserProfile | null;
  progressMap: Record<string, SublevelProgress>;
  isSublevelCompleted: (id: string) => boolean;
  isSublevelUnlocked: (id: string) => boolean;
  onSelectSublevel: (sublevel: Sublevel) => void;
  hoveredSublevelId: string | null;
  setHoveredSublevelId: (id: string | null) => void;
}> = ({
  world,
  worldIndex,
  userProfile,
  progressMap,
  isSublevelCompleted,
  isSublevelUnlocked,
  onSelectSublevel,
  hoveredSublevelId,
  setHoveredSublevelId,
}) => {
  // Collect all sublevels for THIS world only
  const worldNodes: {
    sublevel: Sublevel;
    levelTitle: string;
    levelOrder: number;
    sublevelIndexInWorld: number;
    isLastInWorld: boolean;
  }[] = [];

  world.levels.forEach((lvl) => {
    lvl.sublevels.forEach((sub) => {
      worldNodes.push({
        sublevel: sub,
        levelTitle: lvl.title,
        levelOrder: lvl.order,
        sublevelIndexInWorld: worldNodes.length + 1,
        isLastInWorld: false,
      });
    });
  });

  if (worldNodes.length > 0) {
    worldNodes[worldNodes.length - 1].isLastInWorld = true;
  }

  // World-level stats
  const totalSublevels = worldNodes.length;
  const completedSublevels = worldNodes.filter((n) => isSublevelCompleted(n.sublevel.id)).length;
  const isWorldMastered = totalSublevels > 0 && completedSublevels === totalSublevels;
  const isWorldStarted = completedSublevels > 0;
  const hasActiveLevelInWorld = worldNodes.some(
    (n) => isSublevelUnlocked(n.sublevel.id) && !isSublevelCompleted(n.sublevel.id)
  );

  // SVG coordinate calculations for this specific world's path
  const svgWidth = 600;
  const rowHeight = 130;
  const totalHeight = Math.max(totalSublevels * rowHeight + 170, 500);

  // Layout nodes along an S-curve path
  const nodePositions = worldNodes.map((node, i) => {
    // Alternates left and right gracefully
    const angle = i * 1.35 + 0.5;
    const x = svgWidth / 2 + Math.sin(angle) * 160;
    const y = 90 + i * rowHeight;
    return { ...node, x, y };
  });

  // Calculate smooth SVG cubic bezier path
  let pathD = '';
  if (nodePositions.length > 0) {
    pathD = `M ${nodePositions[0].x} ${nodePositions[0].y}`;
    for (let i = 0; i < nodePositions.length - 1; i++) {
      const p1 = nodePositions[i];
      const p2 = nodePositions[i + 1];
      const dy = p2.y - p1.y;
      const cp1x = p1.x;
      const cp1y = p1.y + dy * 0.52;
      const cp2x = p2.x;
      const cp2y = p2.y - dy * 0.52;
      pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
  }

  // World Theme Gradients (Candy pasture themes)
  const worldThemes = [
    {
      cardBg: 'from-[#FFF8E7] via-[#E8F8F5] to-[#E3F2FD]',
      roadGreen: '#90D256',
      roadBorder: '#B2E285',
      stripeColor: '#FF477E',
      badgeColor: 'from-[#FF5C38] to-[#FF2E74]',
    },
    {
      cardBg: 'from-[#FAF5FF] via-[#F3E8FF] to-[#EDE9FE]',
      roadGreen: '#82C785',
      roadBorder: '#A5D6A7',
      stripeColor: '#8B5CF6',
      badgeColor: 'from-[#7C3AED] to-[#5B21B6]',
    },
    {
      cardBg: 'from-[#FFF1F2] via-[#FFE4E6] to-[#FED7AA]',
      roadGreen: '#88D455',
      roadBorder: '#ADE285',
      stripeColor: '#F43F5E',
      badgeColor: 'from-[#F43F5E] to-[#BE123C]',
    },
    {
      cardBg: 'from-[#ECFDF5] via-[#D1FAE5] to-[#CFFAFE]',
      roadGreen: '#70C276',
      roadBorder: '#98D69D',
      stripeColor: '#059669',
      badgeColor: 'from-[#10B981] to-[#047857]',
    },
  ];

  const currentTheme = worldThemes[worldIndex % worldThemes.length];

  return (
    <div className="relative rounded-[36px] bg-white border-2 border-neutral-900/10 shadow-lg overflow-hidden transition-all">
      {/* 1. Distinct World Header */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 border-b border-neutral-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            {/* World 3D Number Badge */}
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-gradient-to-br ${currentTheme.badgeColor} flex flex-col items-center justify-center text-white shadow-md border-2 border-white shrink-0`}
            >
              <span className="text-[10px] font-black tracking-widest uppercase opacity-90 -mb-1">
                WORLD
              </span>
              <span className="text-2xl sm:text-3xl font-black font-display drop-shadow-xs">
                {world.number}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs font-mono font-bold text-[#FF5C38] bg-[#FFF2ED] px-2.5 py-0.5 rounded-full border border-[#FFD8CC]">
                  {world.levels.length} Levels • {totalSublevels} Milestones
                </span>
                {isWorldMastered && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    World Mastered
                  </span>
                )}
                {hasActiveLevelInWorld && !isWorldMastered && (
                  <span className="text-xs font-bold text-[#FF5C38] bg-[#FFF2ED] px-2.5 py-0.5 rounded-full border border-[#FFD8CC] flex items-center gap-1 animate-pulse">
                    <Flame className="w-3.5 h-3.5 fill-[#FF5C38]" />
                    Active World
                  </span>
                )}
              </div>

              <h3 className="text-xl md:text-2xl font-black font-display text-neutral-900">
                {world.title}
              </h3>
              <p className="text-xs md:text-sm text-neutral-600 mt-1 max-w-2xl font-medium leading-relaxed">
                {world.shortDesc}
              </p>
            </div>
          </div>

          {/* World Progress Bar & Stars Counter */}
          <div className="flex flex-col items-start md:items-end gap-2 shrink-0 bg-[#FAF9FD] p-3.5 rounded-2xl border border-neutral-200">
            <div className="flex items-center gap-3 text-xs">
              <span className="font-bold text-neutral-500">World Progress:</span>
              <span className="font-black text-neutral-900 font-mono">
                {completedSublevels} / {totalSublevels} Completed
              </span>
            </div>

            <div className="w-44 sm:w-52 h-2.5 rounded-full bg-neutral-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF5C38] to-[#FF2E74] rounded-full transition-all duration-500"
                style={{
                  width: `${totalSublevels > 0 ? (completedSublevels / totalSublevels) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Candy Adventure Road for THIS World */}
      <div
        className={`relative w-full flex justify-center py-8 px-4 bg-gradient-to-b ${currentTheme.cardBg}`}
        style={{ minHeight: `${totalHeight}px` }}
      >
        {/* SVG Road Network for this World */}
        <svg
          viewBox={`0 0 ${svgWidth} ${totalHeight}`}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[680px] h-full pointer-events-none z-0"
          preserveAspectRatio="xMidYMin slice"
        >
          <defs>
            {/* Candy Cane Diagonal Stripe Pattern for this World */}
            <pattern
              id={`candyStripes-${world.id}`}
              width="26"
              height="26"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect width="13" height="26" fill={currentTheme.stripeColor} />
              <rect x="13" width="13" height="26" fill="#FFFFFF" />
            </pattern>

            <filter id={`shadow-${world.id}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#1e3a1e" floodOpacity="0.22" />
            </filter>
          </defs>

          {/* 1. Lush Road Bed */}
          <path
            d={pathD}
            fill="none"
            stroke={currentTheme.roadGreen}
            strokeWidth="94"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#shadow-${world.id})`}
          />

          {/* 2. Soft Inner Grass Edge */}
          <path
            d={pathD}
            fill="none"
            stroke={currentTheme.roadBorder}
            strokeWidth="76"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 3. Trail Base */}
          <path
            d={pathD}
            fill="none"
            stroke="#FFF4CC"
            strokeWidth="46"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 4. Candy Cane Striped Center Ribbon */}
          <path
            d={pathD}
            fill="none"
            stroke={`url(#candyStripes-${world.id})`}
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 5. White Dashed Highlight Lines */}
          <path
            d={pathD}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="26"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 6"
            opacity="0.5"
          />

          {/* Scenery Decorations along the road */}
          {nodePositions.map((p, idx) => {
            const isLeft = p.x < svgWidth / 2;
            const decorX = isLeft ? p.x + 130 : p.x - 130;
            const decorY = p.y + (idx % 2 === 0 ? 20 : -20);

            if (idx % 2 === 0) {
              // Cute Pastel Cottage
              return (
                <g key={`cottage-${world.id}-${idx}`} transform={`translate(${decorX - 35}, ${decorY - 30})`} opacity="0.95">
                  <circle cx="58" cy="4" r="5" fill="#FFFFFF" opacity="0.7" />
                  <circle cx="62" cy="-4" r="7" fill="#FFFFFF" opacity="0.5" />
                  <rect x="15" y="32" width="50" height="36" rx="6" fill="#FFF275" stroke="#E6B800" strokeWidth="2" />
                  <rect x="23" y="44" width="14" height="24" rx="3" fill="#FF5C38" />
                  <circle cx="50" cy="46" r="6" fill="#8CE8FF" stroke="#48CAE4" strokeWidth="1.5" />
                  <polygon
                    points="40,12 8,34 72,34"
                    fill={idx % 4 === 0 ? '#FF477E' : '#7209B7'}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <rect x="54" y="16" width="9" height="15" rx="2" fill="#E76F51" />
                </g>
              );
            } else {
              // Whimsical Gumdrop Tree
              const treeColor = idx % 3 === 0 ? '#FFAA00' : '#FF4D6D';
              return (
                <g key={`tree-${world.id}-${idx}`} transform={`translate(${decorX - 25}, ${decorY - 35})`}>
                  <rect x="21" y="40" width="8" height="24" rx="3" fill="#9C6644" />
                  <circle cx="25" cy="25" r="24" fill={treeColor} opacity="0.95" />
                  <circle cx="17" cy="18" r="8" fill="#FFFFFF" opacity="0.3" />
                  <circle cx="16" cy="28" r="3" fill="#FFF066" />
                  <circle cx="32" cy="20" r="3" fill="#FFF066" />
                  <circle cx="26" cy="34" r="2.5" fill="#FFF066" />
                </g>
              );
            }
          })}
        </svg>

        {/* Stepping Stone Buttons for this World */}
        <div className="relative w-full max-w-[680px] h-full pointer-events-auto z-10">
          {nodePositions.map((pos) => {
            const isDone = isSublevelCompleted(pos.sublevel.id);
            const isUnlocked = isSublevelUnlocked(pos.sublevel.id);
            // Current level check: first unlocked incomplete node
            const isCurrent =
              isUnlocked &&
              !isDone &&
              !nodePositions.some(
                (other, oIdx) =>
                  oIdx < pos.sublevelIndexInWorld - 1 &&
                  isSublevelUnlocked(other.sublevel.id) &&
                  !isSublevelCompleted(other.sublevel.id)
              );

            const progress = progressMap[pos.sublevel.id];
            const starsCount = isDone ? progress?.stars || 3 : 0;
            const isHovered = hoveredSublevelId === pos.sublevel.id;

            const leftPercent = (pos.x / svgWidth) * 100;
            const topPx = pos.y;

            return (
              <div
                key={pos.sublevel.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{
                  left: `${leftPercent}%`,
                  top: `${topPx}px`,
                }}
                onMouseEnter={() => setHoveredSublevelId(pos.sublevel.id)}
                onMouseLeave={() => setHoveredSublevelId(null)}
              >
                {/* Player Avatar Pin Token (bouncing above active level in this world) */}
                {isCurrent && (
                  <div className="absolute -top-16 -left-14 sm:-left-16 z-30 flex flex-col items-center animate-bounce">
                    <div className="relative p-1 rounded-2xl bg-gradient-to-br from-[#4CC9F0] to-[#4361EE] shadow-xl border-2 border-white flex flex-col items-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white overflow-hidden flex items-center justify-center">
                        {userProfile?.photoURL ? (
                          <img
                            src={userProfile.photoURL}
                            alt="Player avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xl">🧑‍🎓</span>
                        )}
                      </div>
                      <span className="text-[9px] font-black text-white uppercase tracking-tight px-1.5 pt-0.5">
                        YOU
                      </span>
                    </div>
                    <div className="w-4 h-3 bg-[#E63946] rounded-b-full shadow-md border border-white -mt-0.5" />
                  </div>
                )}

                {/* 3D Glossy Candy Stepping Stone Button */}
                <div className="relative flex flex-col items-center">
                  {isCurrent && (
                    <div className="absolute -inset-3 rounded-full bg-white/70 animate-ping pointer-events-none" />
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      if (isUnlocked) onSelectSublevel(pos.sublevel);
                    }}
                    disabled={!isUnlocked}
                    className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-full flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer select-none ${
                      isDone
                        ? 'bg-gradient-to-b from-[#FF4D8D] via-[#E61F6A] to-[#B30E4A] border-4 border-white shadow-[0_8px_0_#800632,0_12px_18px_rgba(0,0,0,0.35)] hover:-translate-y-1'
                        : isUnlocked
                        ? 'bg-gradient-to-b from-[#FF7A59] via-[#FF5C38] to-[#D93815] border-4 border-white shadow-[0_8px_0_#9E2306,0_12px_22px_rgba(255,92,56,0.5)] ring-4 ring-white/80 hover:-translate-y-1.5'
                        : 'bg-gradient-to-b from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8] border-4 border-white/80 shadow-[0_6px_0_#64748B,0_8px_12px_rgba(0,0,0,0.2)] opacity-80 cursor-not-allowed'
                    }`}
                  >
                    {/* Top Specular Crescent (Glossy Highlight) */}
                    <div className="absolute top-1 left-2.5 right-2.5 h-4 sm:h-5 rounded-full bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center justify-center">
                      {isDone ? (
                        <span className="font-display font-black text-white text-lg sm:text-xl drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]">
                          {pos.sublevel.title.split(' ')[0]}
                        </span>
                      ) : isUnlocked ? (
                        <span className="font-display font-black text-white text-lg sm:text-xl drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]">
                          {pos.sublevel.title.split(' ')[0]}
                        </span>
                      ) : (
                        <div className="flex flex-col items-center text-neutral-600">
                          <Lock className="w-5 h-5 drop-shadow-xs" />
                          <span className="text-[10px] font-bold text-neutral-500 -mt-0.5">
                            {pos.sublevel.title.split(' ')[0]}
                          </span>
                        </div>
                      )}
                    </div>
                  </button>

                  {/* 3 Golden Stars underneath completed nodes */}
                  {isDone ? (
                    <div className="flex items-center -space-x-0.5 mt-2 drop-shadow-md">
                      {[...Array(3)].map((_, sIdx) => (
                        <Star
                          key={sIdx}
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            sIdx < starsCount
                              ? 'fill-[#FFD166] text-[#FFB703]'
                              : 'fill-neutral-300 text-neutral-400'
                          }`}
                        />
                      ))}
                    </div>
                  ) : isUnlocked ? (
                    <div className="mt-2.5 px-2.5 py-0.5 rounded-full bg-white font-black text-[10px] text-[#FF5C38] border border-[#FF5C38]/40 shadow-xs uppercase tracking-wider flex items-center gap-1 animate-pulse">
                      <Play className="w-2.5 h-2.5 fill-current" />
                      READY
                    </div>
                  ) : (
                    <div className="mt-2.5 px-2 py-0.5 rounded-full bg-neutral-200/90 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                      LOCKED
                    </div>
                  )}

                  {/* World Boss Trophy Crown on the last milestone of this world */}
                  {pos.isLastInWorld && (
                    <div className="absolute -top-7 -right-5 z-20 bg-amber-400 border-2 border-white rounded-full p-1.5 shadow-md animate-bounce">
                      <Trophy className="w-4 h-4 text-amber-950" />
                    </div>
                  )}
                </div>

                {/* Floating Interactive Card on Hover/Tap */}
                {(isHovered || isCurrent) && (
                  <div
                    className={`absolute z-40 w-64 sm:w-72 p-4 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-neutral-900/15 shadow-2xl transition-all duration-200 pointer-events-auto ${
                      pos.x > svgWidth / 2
                        ? '-left-70 sm:-left-76 top-1/2 -translate-y-1/2'
                        : 'left-20 sm:left-24 top-1/2 -translate-y-1/2'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-[#FFF2ED] text-[#FF5C38]">
                        {pos.levelTitle}
                      </span>
                      {isDone && (
                        <span className="text-[10px] font-black text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Done
                        </span>
                      )}
                    </div>

                    <h4 className="font-black font-display text-sm text-neutral-900 leading-snug">
                      {pos.sublevel.title}
                    </h4>

                    <p className="text-[11px] text-neutral-600 font-medium line-clamp-2 mt-1 leading-relaxed">
                      {pos.sublevel.summary}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-[#FFF8E7] px-2 py-0.5 rounded-lg border border-[#FFE194]">
                        <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>+{pos.sublevel.activities[0]?.xpReward || 50} XP</span>
                      </div>

                      {isUnlocked && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectSublevel(pos.sublevel);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-[#FF5C38] hover:bg-[#E84D2B] text-white font-black text-xs shadow-xs hover:scale-102 active:scale-98 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>{isDone ? 'Review' : 'Play'}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. World Boss Milestone Gateway Footer */}
      <div className="p-4 sm:p-5 bg-white border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-neutral-700">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" />
          <span>
            {isWorldMastered
              ? `Congratulations! You conquered all levels in World ${world.number}.`
              : `Complete all levels in World ${world.number} to claim the Mastery Trophy.`}
          </span>
        </div>

        {hasActiveLevelInWorld && (
          <button
            type="button"
            onClick={() => {
              const activeNode = worldNodes.find(
                (n) => isSublevelUnlocked(n.sublevel.id) && !isSublevelCompleted(n.sublevel.id)
              );
              if (activeNode) onSelectSublevel(activeNode.sublevel);
            }}
            className="px-4 py-2 rounded-xl bg-[#FF5C38] hover:bg-[#E84D2B] text-white text-xs font-black shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <span>Continue World {world.number}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export const AdventurePathMap: React.FC<AdventurePathMapProps> = ({
  worlds,
  activeSkillTitle,
  userProfile,
  progressMap,
  isSublevelCompleted,
  isSublevelUnlocked,
  onSelectSublevel,
}) => {
  const [hoveredSublevelId, setHoveredSublevelId] = useState<string | null>(null);
  const [selectedWorldFilter, setSelectedWorldFilter] = useState<string>('all');

  // Filtered worlds to display
  const displayedWorlds =
    selectedWorldFilter === 'all'
      ? worlds
      : worlds.filter((w) => w.id === selectedWorldFilter);

  return (
    <div className="space-y-8">
      {/* Top Controls: World Switcher Tabs */}
      <div className="bg-white border-2 border-neutral-900/10 rounded-2xl p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#FF5C38]" />
          <span className="text-xs font-extrabold uppercase text-neutral-500 font-display">
            Select World:
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setSelectedWorldFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              selectedWorldFilter === 'all'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
            }`}
          >
            All Worlds ({worlds.length})
          </button>

          {worlds.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => setSelectedWorldFilter(w.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedWorldFilter === w.id
                  ? 'bg-[#FF5C38] text-white shadow-xs'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              World {w.number}
            </button>
          ))}
        </div>
      </div>

      {/* Render Each World as a Separated Adventure Card */}
      <div className="space-y-12">
        {displayedWorlds.map((world, index) => (
          <WorldAdventureSection
            key={world.id}
            world={world}
            worldIndex={index}
            userProfile={userProfile}
            progressMap={progressMap}
            isSublevelCompleted={isSublevelCompleted}
            isSublevelUnlocked={isSublevelUnlocked}
            onSelectSublevel={onSelectSublevel}
            hoveredSublevelId={hoveredSublevelId}
            setHoveredSublevelId={setHoveredSublevelId}
          />
        ))}
      </div>
    </div>
  );
};
