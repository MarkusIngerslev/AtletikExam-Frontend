type DropdownFilterProps = {
    title: string;
    options: { label: string; value: string | null }[];
    onFilterChange: (value: string | null) => void;
};

function DropdownFilter({ title, options, onFilterChange }: DropdownFilterProps) {
    return (
        <div className="dropdown me-2">
            <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id={`${title}-dropdown`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {title}
            </button>
            <ul className="dropdown-menu" aria-labelledby={`${title}-dropdown`}>
                {options.map((option) => (
                    <li key={option.value}>
                        <button className="dropdown-item" onClick={() => onFilterChange(option.value)}>
                            {option.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DropdownFilter;
