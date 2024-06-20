import React, { useState, useEffect } from "react";
import { DeltagerProps, ResultatProps } from "../service/DeltagerProps";
import { updateResultat, deleteResultat, fetchDeltagere } from "../service/apiFacade";

const ResultsList = () => {
    const [deltagere, setDeltagere] = useState<DeltagerProps[]>([]);
    const [editResult, setEditResult] = useState<ResultatProps | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedDeltagere = await fetchDeltagere();
            setDeltagere(fetchedDeltagere);
        };
        fetchData();
    }, []);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editResult) {
            const { name, value } = e.target;
            setEditResult({ ...editResult, [name]: value });
        }
    };

    const handleEditSubmit = async () => {
        if (editResult) {
            console.log(editResult);

            await updateResultat(editResult);
            // Update local state after successful edit
            setDeltagere(
                deltagere.map((deltager) => ({
                    ...deltager,
                    resultater: deltager.resultater.map((result) =>
                        result.id === editResult.id ? editResult : result
                    ),
                }))
            );
            setEditResult(null);
        }
    };

    const handleDelete = async (id: number) => {
        await deleteResultat(id);
        setDeltagere(
            deltagere.map((deltager) => ({
                ...deltager,
                resultater: deltager.resultater.filter((result) => result.id !== id),
            }))
        );
    };

    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Deltager</th>
                        <th>Resultattype</th>
                        <th>Dato</th>
                        <th>Resultatværdi</th>
                        <th>Handlinger</th>
                    </tr>
                </thead>
                <tbody>
                    {deltagere.map((deltager) =>
                        deltager.resultater.map((result) => (
                            <tr key={result.id}>
                                <td>{deltager.navn}</td>
                                <td>{result.resultattype}</td>
                                <td>{result.dato}</td>
                                <td>{result.resultatvalue}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => setEditResult(result)}>
                                        Rediger
                                    </button>
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
                                <button type="button" className="btn btn-secondary" onClick={() => setEditResult(null)}>
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
    );
};

export default ResultsList;
