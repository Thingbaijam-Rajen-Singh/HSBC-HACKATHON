import React, { useState } from 'react';
import { initialCourseCatalog } from '../data/coursesData';
import { CourseItem } from '../types';
import { useProgress } from '../context/ProgressContext';
import {
  Search,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Star,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';

export const CourseBrowserView: React.FC = () => {
  const { savedCourses, toggleCourseSaved } = useProgress();

  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [providerFilter, setProviderFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'duration'>('relevance');

  const providers = ['All', 'freeCodeCamp', 'Coursera', 'Harvard University / edX', 'MDN Web Docs', 'Scrimba'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = initialCourseCatalog
    .filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skill.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPrice =
        priceFilter === 'all'
          ? true
          : priceFilter === 'free'
          ? c.isFree
          : !c.isFree;

      const matchesDiff =
        difficultyFilter === 'All' || c.difficulty === difficultyFilter;

      const matchesProvider =
        providerFilter === 'All' || c.provider.toLowerCase().includes(providerFilter.toLowerCase());

      return matchesSearch && matchesPrice && matchesDiff && matchesProvider;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-[#FAF9FE] border-2 border-neutral-900/10 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-3 py-0.5 rounded-full bg-[#EFEAFF] text-[#5534DA] border border-[#DDD1FE] text-xs font-bold">
                External Course Discovery Engine
              </span>
              <span className="text-xs text-neutral-500 font-semibold font-mono">
                Multi-Provider Aggregator
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black font-display text-neutral-900 tracking-tight">
              Course <span className="text-[#FF5C38]">Browser</span>
            </h1>
            <p className="text-xs md:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed font-medium">
              Explore and bookmark free and paid learning opportunities across trusted external providers. Distinct from your Skill Level-Up roadmaps.
            </p>
          </div>

          <div className="bg-white border border-neutral-200 px-5 py-3 rounded-2xl flex items-center gap-3.5 shrink-0 shadow-xs">
            <BookmarkCheck className="w-5 h-5 text-[#FF5C38]" />
            <div>
              <div className="text-[10px] text-neutral-500 uppercase font-extrabold tracking-wider">Saved Bookmarks</div>
              <div className="text-neutral-900 font-black text-sm sm:text-base font-display">
                {Object.keys(savedCourses).length} Courses Saved
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Provider API Notice */}
      <div className="p-4 rounded-2xl bg-[#FAF9FD] border border-neutral-200 flex items-start gap-3 text-xs text-neutral-700">
        <Info className="w-4 h-4 text-[#5534DA] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-neutral-900">Verified Sources: </span>
          Courses are cataloged from official provider curricula (freeCodeCamp, Harvard CS50, Coursera, MDN). Any experimental test connectors are explicitly marked with a
          <span className="mx-1 px-2 py-0.5 rounded-full bg-[#FFF8E7] text-amber-800 border border-[#FFE194] font-mono text-[10px] font-bold">
            Sample Demonstration Data
          </span>
          badge to ensure complete transparency.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border-2 border-neutral-900/10 rounded-3xl p-6 space-y-4 shadow-xs">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by skill, topic, technology, or provider (e.g. React, Python, CS50, Coursera)..."
            className="w-full pl-11 pr-4 py-3 bg-[#FAF9FD] border border-neutral-200 rounded-2xl text-xs md:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#FF5C38] transition-colors"
          />
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 text-xs">
          {/* Price filter */}
          <div>
            <label className="block text-neutral-700 font-bold mb-1">Pricing Model</label>
            <div className="flex bg-[#FAF9FD] p-1 rounded-2xl border border-neutral-200">
              <button
                type="button"
                onClick={() => setPriceFilter('all')}
                className={`flex-1 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  priceFilter === 'all'
                    ? 'bg-[#FF5C38] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setPriceFilter('free')}
                className={`flex-1 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  priceFilter === 'free'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Free Only
              </button>
              <button
                type="button"
                onClick={() => setPriceFilter('paid')}
                className={`flex-1 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  priceFilter === 'paid'
                    ? 'bg-[#5534DA] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Paid
              </button>
            </div>
          </div>

          {/* Difficulty filter */}
          <div>
            <label className="block text-neutral-700 font-bold mb-1">Difficulty</label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF9FD] border border-neutral-200 rounded-2xl text-neutral-800 font-semibold focus:outline-none focus:border-[#FF5C38] cursor-pointer"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Provider filter */}
          <div>
            <label className="block text-neutral-700 font-bold mb-1">Provider Platform</label>
            <select
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF9FD] border border-neutral-200 rounded-2xl text-neutral-800 font-semibold focus:outline-none focus:border-[#FF5C38] cursor-pointer"
            >
              {providers.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-neutral-700 font-bold mb-1">Sort Results By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-[#FAF9FD] border border-neutral-200 rounded-2xl text-neutral-800 font-semibold focus:outline-none focus:border-[#FF5C38] cursor-pointer"
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-neutral-500 font-mono font-bold">
        <span>Showing {filteredCourses.length} Learning Opportunities</span>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course) => {
          const isSaved = Boolean(savedCourses[course.id]);

          return (
            <div
              key={course.id}
              className="bg-white border-2 border-neutral-900/10 rounded-3xl p-6 hover:border-neutral-900/30 transition-all flex flex-col justify-between space-y-4 shadow-xs group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-xs font-mono text-[#5534DA] font-bold">
                        {course.provider}
                      </span>
                      {course.isSampleData && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FFF8E7] border border-[#FFE194] text-amber-900 font-bold">
                          Sample Demonstration Feed
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-black font-display text-neutral-900 group-hover:text-[#FF5C38] transition-colors">
                      {course.title}
                    </h3>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    type="button"
                    onClick={() => toggleCourseSaved(course)}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer shrink-0 ${
                      isSaved
                        ? 'bg-[#FFF2ED] border-[#FF5C38]/40 text-[#FF5C38]'
                        : 'bg-[#FAF9FD] border-neutral-200 text-neutral-400 hover:text-neutral-800'
                    }`}
                    title={isSaved ? 'Remove bookmark' : 'Save course bookmark'}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 fill-current" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-2">
                  {course.description}
                </p>

                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                  <span
                    className={`font-bold px-3 py-1 rounded-full border ${
                      course.isFree
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        : 'border-purple-200 bg-purple-50 text-purple-800'
                    }`}
                  >
                    {course.isFree ? 'Free Course' : course.price || 'Paid'}
                  </span>

                  <span className="px-2.5 py-1 rounded-xl bg-[#FAF9FD] border border-neutral-200 text-neutral-700 font-semibold">
                    {course.difficulty}
                  </span>

                  <span className="px-2.5 py-1 rounded-xl bg-[#FAF9FD] border border-neutral-200 text-neutral-700 flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    {course.duration}
                  </span>

                  {course.rating && (
                    <span className="px-2.5 py-1 rounded-xl bg-[#FFF8E7] border border-[#FFE194] text-amber-900 flex items-center gap-1 font-mono font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {course.rating} ({course.reviewCount?.toLocaleString()})
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400 font-mono">
                  Checked: {course.lastChecked}
                </span>

                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-2xl bg-[#EFEAFF] hover:bg-[#FF5C38] hover:text-white text-[#5534DA] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Go to Provider Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
