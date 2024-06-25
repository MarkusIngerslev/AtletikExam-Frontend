import React, { useEffect, useState } from "react";
import { fetchDeltagere } from "../service/apiFacade";
import { DeltagerProps } from "../service/DeltagerProps";
import { NavLink } from "react-router-dom";
import DropdownFilter from "../components/DropDownFiltre";

function ParticipantsList() {
    const [participants, setParticipants] = useState<DeltagerProps[]>([]);
    const [search, setSearch] = useState("");
    const [sortColumn, setSortColumn] = useState<keyof DeltagerProps>("navn");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [genderFilter, setGenderFilter] = useState<string | null>(null);
    const [ageFilter, setAgeFilter] = useState<string | null>(null);
    const [clubFilter, setClubFilter] = useState<string | null>(null);
    const [disciplineFilter, setDisciplineFilter] = useState<string | null>(null);

    useEffect(() => {
        fetchDeltagere().then(setParticipants).catch(console.error);
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSort = (column: keyof DeltagerProps) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    const sortedParticipants = [...participants].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) {
            return sortOrder === "asc" ? -1 : 1;
        }
        if (a[sortColumn] > b[sortColumn]) {
            return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
    });

    const filteredParticipants = sortedParticipants.filter((p) => {
        return (
            p.navn.toLowerCase().includes(search.toLowerCase()) &&
            (genderFilter ? p.køn === genderFilter : true) &&
            (ageFilter
                ? p.alder >= parseInt(ageFilter.split("-")[0]) && p.alder <= parseInt(ageFilter.split("-")[1])
                : true) &&
            (clubFilter ? p.klub === clubFilter : true) &&
            (disciplineFilter ? p.resultater && p.resultater.some((r) => r.disciplin.navn === disciplineFilter) : true)
        );
    });

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-5 d-flex">
                    <DropdownFilter
                        title="Køn"
                        options={[
                            { label: "All", value: null },
                            { label: "Mand", value: "mand" },
                            { label: "Kvinde", value: "kvinde" },
                        ]}
                        onFilterChange={(value) => setGenderFilter(value)}
                    />
                    <DropdownFilter
                        title="Alders gruppe"
                        options={[
                            { label: "All", value: null },
                            { label: "6-9", value: "6-9" },
                            { label: "10-13", value: "10-13" },
                            { label: "14-22", value: "14-22" },
                            { label: "23-40", value: "23-40" },
                            { label: "41+", value: "41-100" },
                        ]}
                        onFilterChange={(value) => setAgeFilter(value)}
                    />
                    <DropdownFilter
                        title="Klub"
                        options={[
                            { label: "All", value: null },
                            { label: "Ølstykke", value: "ølstykke" },
                            { label: "Stenløse", value: "Stenløse" },
                            { label: "Væksø", value: "Væksø" },
                        ]}
                        onFilterChange={(value) => setClubFilter(value)}
                    />
                    <DropdownFilter
                        title="Disciplin"
                        options={[
                            { label: "All", value: null },
                            { label: "400-meterløb", value: "400-meterløb" },
                            { label: "Længdespring", value: "Længdespring" },
                            { label: "Hammerkast", value: "Hammerkast" },
                            { label: "Højdespring", value: "Højdespring" },
                        ]}
                        onFilterChange={(value) => setDisciplineFilter(value)}
                    />
                </div>
                <div className="col-lg-3 my-auto">
                    <p>
                        Aktive Filtre:
                        {genderFilter && <span className="badge bg-primary mx-1">{genderFilter}</span>}
                        {ageFilter && <span className="badge bg-primary mx-1">{ageFilter}</span>}
                        {clubFilter && <span className="badge bg-primary mx-1">{clubFilter}</span>}
                        {disciplineFilter && <span className="badge bg-primary mx-1">{disciplineFilter}</span>}
                    </p>
                </div>
                <div className="col-md-2">
                    <h3 className="text-end">Deltagere</h3>
                </div>
                <div className="col-md-2 my-auto">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={search}
                        onChange={handleSearch}
                        className="form-control"
                    />
                </div>

                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("navn")}>Navn</th>
                            <th onClick={() => handleSort("køn")}>Køn</th>
                            <th onClick={() => handleSort("alder")}>Alder</th>
                            <th onClick={() => handleSort("klub")}>Klub</th>
                            <th>Discipliner</th>
                            <th>Detaljer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredParticipants.map((participant) => (
                            <tr key={participant.id}>
                                <td>{participant.navn}</td>
                                <td>{participant.køn}</td>
                                <td>{participant.alder}</td>
                                <td>{participant.klub}</td>
                                <td>
                                    {participant.resultater?.map((discipline) => (
                                        <span key={discipline.disciplin.id} className="badge bg-primary mx-1">
                                            {discipline.disciplin.navn}
                                        </span>
                                    ))}
                                </td>
                                <td>
                                    <NavLink to={`/participants/${participant.id}`} className="btn btn-primary">
                                        Detaljer
                                    </NavLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ParticipantsList;
