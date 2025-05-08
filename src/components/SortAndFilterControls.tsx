import FilterControls from "./FilterControls";
import SortControls from "./SortControls";
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
        <section
            aria-label="Sort and filter controls"
            className="mx-4 my-6 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:mx-6 sm:p-6"
        >
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-4">
                <FilterControls
                    filterType={filterType}
                    setFilterType={setFilterType}
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                />
                <SortControls
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                />
            </div>
        </section>
    );
}
