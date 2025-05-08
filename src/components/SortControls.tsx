import ArrowDownIcon from "../assets/icons/chevron-down.svg";
import type { SortOption } from "../types";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "most-liked", label: "Most Liked" },
];

interface SortControlsProps {
    sortOption: SortOption;
    setSortOption: (option: SortOption) => void;
}

export default function SortControls({
    sortOption,
    setSortOption,
}: SortControlsProps) {
    return (
        <div className="w-full sm:w-48">
            <label
                htmlFor="sort-select"
                className="mb-1 block text-sm font-medium text-gray-800"
            >
                Sort By
            </label>
            <div className="relative">
                <img
                    src={ArrowDownIcon}
                    alt="ArrowDown Icon svg"
                    className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform cursor-pointer text-gray-400"
                    aria-hidden="true"
                />
                <select
                    id="sort-select"
                    value={sortOption}
                    onChange={(e) =>
                        setSortOption(e.target.value as SortOption)
                    }
                    className="focus:ring-primary focus:border-primary w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white py-2 pr-3 pl-10 text-sm text-gray-800 transition-all duration-200 hover:bg-gray-50 focus:ring-1 focus:outline-none"
                >
                    {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value} className="hover:bg-primary">
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
