import type { FilterType } from "../types";
import ArrowDownIcon from "../assets/icons/chevron-down.svg";

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "username", label: "Username" },
    { value: "content", label: "Title/Content" },
];

interface FilterControlsProps {
    filterType: FilterType;
    setFilterType: (type: FilterType) => void;
    filterValue: string;
    setFilterValue: (value: string) => void;
}

export default function FilterControls({
    filterType,
    setFilterType,
    filterValue,
    setFilterValue,
}: FilterControlsProps) {
    return (
        <div className="flex-1">
            <label
                htmlFor="filter-input"
                className="mb-1 block text-sm font-medium text-gray-800"
            >
                Filter Posts
            </label>
            <div className="flex items-center space-x-3">
                <div className="relative w-28">
                    <select
                        value={filterType}
                        onChange={(e) =>
                            setFilterType(e.target.value as FilterType)
                        }
                        className="focus:ring-primary focus:border-primary w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 transition-all duration-200 hover:bg-gray-50 focus:ring-1 focus:outline-none"
                    >
                        {FILTER_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <img
                        src={ArrowDownIcon}
                        alt="ArrowDown Icon svg"
                        className="absolute top-1/2 right-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer text-gray-400"
                        aria-hidden="true"
                    />
                </div>
                <div className="flex-1">
                    <input
                        id="filter-input"
                        type="text"
                        placeholder="Search posts..."
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        className="input mt-0! border border-gray-200 bg-white text-sm text-gray-800 transition-all duration-200 hover:bg-gray-50"
                    />
                </div>
            </div>
        </div>
    );
}
