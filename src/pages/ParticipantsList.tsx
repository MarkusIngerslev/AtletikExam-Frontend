import React, { useEffect, useState } from "react";
import { fetchDeltagere } from "../service/apiFacade";
import { DeltagerProps } from "../service/DeltagerProps";
import { NavLink } from "react-router-dom";

function ParticipantsList() {
    const [participants, setParticipants] = useState<DeltagerProps[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchDeltagere().then(setParticipants).catch(console.error);
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const filteredParticipants = participants.filter((p) => p.navn.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-8">
                    <h1 className="text-end">Deltagere</h1>
                </div>
                <div className="col-md-4  my-auto">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={search}
                        onChange={handleSearch}
                        className="form-control "
                    />
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Navn</th>
                            <th>Køn</th>
                            <th>Alder</th>
                            <th>Klub</th>
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
