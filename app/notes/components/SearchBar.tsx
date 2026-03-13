"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type SearchBarProps = {
  courses: string[];
  currentCourse?: string;
  currentQuery?: string;
};

export default function SearchBar({
  courses,
  currentCourse,
  currentQuery,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(currentQuery || "");
  const [course, setCourse] = useState(currentCourse || "");

  const applyFilters = (newQuery?: string, newCourse?: string) => {
    const q = newQuery ?? query;
    const c = newCourse ?? course;

    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (c) params.set("course", c);

    router.push(`/notes${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const handleCourseChange = (newCourse: string) => {
    setCourse(newCourse);
    applyFilters(undefined, newCourse);
  };

  const clearFilters = () => {
    setQuery("");
    setCourse("");
    router.push("/notes");
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="🔍 Cari catatan berdasarkan judul atau isi..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn-search">
            Cari
          </button>
        </div>
      </form>

      <div className="filter-group">
        <select
          value={course}
          onChange={(e) => handleCourseChange(e.target.value)}
          className="filter-select"
        >
          <option value="">Semua Mata Kuliah</option>
          {courses.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {(currentCourse || currentQuery) && (
          <button onClick={clearFilters} className="btn-clear">
            ✕ Reset Filter
          </button>
        )}
      </div>
    </div>
  );
}
