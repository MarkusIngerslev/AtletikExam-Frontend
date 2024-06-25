import React, { useState, useEffect } from "react";
import { fetchDeltagere } from "../service/apiFacade";
import { DeltagerProps } from "../service/DeltagerProps";

interface DropDownClubProps {
    klub: string;
    onChange: (value: string) => void;
}

const DropDownClub: React.FC<DropDownClubProps> = ({ klub, onChange }) => {
    const [klubber, setKlubber] = useState<string[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedDeltagere = await fetchDeltagere();
                const fetchedKlubber = fetchedDeltagere.map((Deltager: DeltagerProps) => Deltager.klub);
                setKlubber(fetchedKlubber);
            } catch (error) {
                console.error("Error fetching clubs:", error);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
        setIsDropdownVisible(false);
    };

    return (
        <div className="form-group">
            <label>Klub</label>
            <input
                type="text"
                name="klub"
                value={klub}
                onChange={handleInputChange}
                className="form-control"
                onFocus={() => setIsDropdownVisible(true)}
                onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
            />
            {isDropdownVisible && (
                <select
                    className="form-control mt-2"
                    onChange={handleSelectChange}
                    onBlur={() => setIsDropdownVisible(false)}
                    size={klubber.length > 5 ? 5 : klubber.length} // Show up to 5 clubs at a time
                >
                    <option value="">Skriv ny klub</option>

                    {klubber.map((klub, index) => (
                        <option key={index} value={klub}>
                            {klub}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default DropDownClub;
