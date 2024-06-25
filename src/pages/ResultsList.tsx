import React, { useState, useEffect } from "react";
import { DeltagerProps, ResultatProps } from "../service/DeltagerProps";
import { updateResultat, deleteResultat, fetchDeltagere } from "../service/apiFacade";
import DropdownFilter from "../components/DropDownFiltre";

const ResultsList = () => {
    const [participants, setParticipants] = useState<DeltagerProps[]>([]);
    const [sortColumn, setSortColumn] = useState<keyof ResultatProps>("disciplin");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [editResult, setEditResult] = useState<ResultatProps | null>(null);
    const [genderFilter, setGenderFilter] = useState<string | null>(null);
    const [ageFilter, setAgeFilter] = useState<string | null>(null);
    const [disciplineFilter, setDisciplineFilter] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const fetchedDeltagere = await fetchDeltagere();
            setParticipants(fetchedDeltagere);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editResult) {
            const { name, value } = e.target;
            setEditResult({ ...editResult, [name]: value });
            console.log(editResult);
        }
    };

    const handleEditSubmit = async () => {
        if (editResult) {
            console.log(editResult);

            await updateResultat(editResult);
            // Update local state after successful edit
            setParticipants(
                participants.map((deltager) => ({
                    ...deltager,
                    resultater: deltager.resultater?.map((result) =>
                        result.id === editResult.id ? editResult : result
                    ),
                }))
            );
            setEditResult(null);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteResultat(id);
            fetchData();
        } catch (error) {
            console.error("Error deleting result:", error);
        }
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
            (genderFilter ? p.køn === genderFilter : true) &&
            (ageFilter
                ? p.alder >= parseInt(ageFilter.split("-")[0]) && p.alder <= parseInt(ageFilter.split("-")[1])
                : true) &&
            (disciplineFilter ? p.resultater && p.resultater.some((r) => r.disciplin.navn === disciplineFilter) : true)
        );
    });

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-6 mb-4 d-flex">
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
                </div>
                <div className="col-lg-6 my-auto">
                    <p>
                        Aktive Filtre:
                        {genderFilter && <span className="badge bg-primary mx-1">{genderFilter}</span>}
                        {ageFilter && <span className="badge bg-primary mx-1">{ageFilter}</span>}
                        {disciplineFilter && <span className="badge bg-primary mx-1">{disciplineFilter}</span>}
                    </p>
                </div>

                <div className="col-lg-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort("navn")}>Deltager</th>
                                <th onClick={() => handleSort("Disciplin")}>Disciplin</th>
                                <th onClick={() => handleSort("dato")}>Dato</th>
                                <th onClick={() => handleSort("resultat")}>Resultat</th>
                                <th>Handlinger</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredParticipants.map((deltager) =>
                                deltager.resultater?.map((result) => (
                                    <tr key={result.id}>
                                        <td>{deltager.navn}</td>
                                        <td>{result.resultattype}</td>
                                        <td>{result.dato}</td>
                                        <td>
                                            {result.resultatvalue} {result.disciplin.resultattype}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-warning"
                                                onClick={() => {
                                                    setEditResult(result);
                                                }}
                                            >
                                                Rediger
                                            </button>
                                            {"  "}
                                            <button className="btn btn-danger" onClick={() => handleDelete(result.id)}>
                                                Slet
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {editResult && (
                        <div className="modal fade show" style={{ display: "block" }} tabIndex={-1}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Rediger Resultat</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setEditResult(null)}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label>Resultattype</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="resultattype"
                                                disabled
                                                value={editResult.resultattype}
                                                onChange={handleEditChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Dato</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="dato"
                                                value={editResult.dato}
                                                onChange={handleEditChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Resultatværdi</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="resultatvalue"
                                                value={editResult.resultatvalue}
                                                onChange={handleEditChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setEditResult(null)}
                                        >
                                            Luk
                                        </button>
                                        <button type="button" className="btn btn-primary" onClick={handleEditSubmit}>
                                            Gem ændringer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultsList;
