import type { SortOption, FilterType } from "../types";

interface SortAndFilterControlsProps {
    sortOption: SortOption;
    setSortOption: (option: SortOption) => void;
    filterType: FilterType;
    setFilterType: (type: FilterType) => void;
    filterValue: string;
    setFilterValue: (value: string) => void;
}

export default function SortAndFilterControls({
    sortOption,
    setSortOption,
    filterType,
    setFilterType,
    filterValue,
    setFilterValue,
}: SortAndFilterControlsProps) {
    return (
        <section aria-label="Sort and filter controls" className="m-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="flex-1">
                    <label htmlFor="filter-input" className="block text-sm font-medium text-gray-700">
                        Filter Posts
                    </label>
                    <div className="flex space-x-2">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value as FilterType)}
                            className="rounded-md border-gray-300 text-sm focus:border-primary focus:ring-primary"
                        >
                            <option value="all">All</option>
                            <option value="username">Username</option>
                            <option value="content">Title/Content</option>
                        </select>
                        <input
                            id="filter-input"
                            type="text"
                            placeholder="Search posts..."
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                            className="flex-1 rounded-md border-gray-300 text-sm focus:border-primary focus:ring-primary"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="sort-select" className="block text-sm font-medium text-gray-700">
                        Sort By
                    </label>
                    <select
                        id="sort-select"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as SortOption)}
                        className="rounded-md border-gray-300 text-sm focus:border-primary focus:ring-primary"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="most-liked">Most Liked</option>
                    </select>
                </div>
            </div>
        </section>
    );
}