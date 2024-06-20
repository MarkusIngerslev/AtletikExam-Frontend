import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDeltager, updateDeltager, deleteDeltager } from "../service/apiFacade";
import { DeltagerProps } from "../service/DeltagerProps";

function ParticipantDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [participant, setParticipant] = useState<DeltagerProps | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<DeltagerProps | null>(null);
    const [participantDelete, setParticipantDelete] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState("");

    useEffect(() => {
        if (id) {
            fetchDeltager(parseInt(id))
                .then((data) => {
                    setParticipant(data);
                    setFormData(data);
                })
                .catch(console.error);
        }
    }, [id]);

    if (!participant || !formData)
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        if (formData && formData.id) {
            updateDeltager(formData)
                .then((updatedParticipant) => {
                    setParticipant(updatedParticipant);
                    setIsEditing(false);
                })
                .catch(console.error);
        }
    };

    const handleDelete = () => {
        if (formData && formData.id) {
            setDeleteMessage(`Deleting participant with ID: ${formData.id} and Name: ${formData.navn}`);
            setParticipantDelete(true);
            deleteDeltager(formData.id)
                .then(() => {
                    setTimeout(() => {
                        navigate("/participants");
                    }, 1000);
                })

                .catch(console.error);
        }
    };

    return (
        <div className="container">
            {participantDelete && <div>{deleteMessage}</div>}
            <div className="row mt-5">
                <div className="col-md-6">
                    {isEditing ? (
                        <div>
                            <h1>Edit Participant</h1>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="navn"
                                    value={formData.navn}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <input
                                    type="text"
                                    name="køn"
                                    value={formData.køn}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input
                                    type="number"
                                    name="alder"
                                    value={formData.alder}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Club</label>
                                <input
                                    type="text"
                                    name="klub"
                                    value={formData.klub}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-4 px-1">
                                    <button onClick={handleSave} className="btn btn-success mt-3 w-100">
                                        Save
                                    </button>
                                </div>
                                <div className="col-md-4 px-1">
                                    <button onClick={() => setIsEditing(false)} className="btn btn-primary mt-3 w-100">
                                        Cancel
                                    </button>
                                </div>
                                <div className="col-md-4 px-1">
                                    <button onClick={handleDelete} className="btn btn-danger mt-3 w-100">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h1>{participant.navn}</h1>
                            <p>Gender: {participant.køn}</p>
                            <p>Age: {participant.alder}</p>
                            <p>Club: {participant.klub}</p>
                            <button onClick={() => setIsEditing(true)} className="btn btn-secondary mt-3">
                                Edit
                            </button>
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    <h2>Results</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Discipline</th>
                                <th>Result</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participant.resultater &&
                                participant.resultater.map((resultat) => (
                                    <tr key={resultat.id}>
                                        <td>{resultat.disciplin && resultat.disciplin.navn}</td>
                                        <td>
                                            {resultat.resultatvalue}{" "}
                                            {resultat.disciplin && resultat.disciplin.resultattype}
                                        </td>
                                        <td>{resultat.dato}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ParticipantDetails;
