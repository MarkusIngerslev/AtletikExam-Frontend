import React, { useState, useEffect } from "react";
import { ResultatProps } from "../service/ResultatProps";
import { DeltagerProps } from "../service/DeltagerProps";
import { DisciplinProps } from "../service/DisciplinProps";
import { createResultater, fetchDeltagere, fetchDiscipliner } from "../service/apiFacade";

const NewResults: React.FC = () => {
    const [currentResult, setCurrentResult] = useState<ResultatProps>({
        resultattype: "",
        dato: "",
        resultatvalue: "",
        deltager: { id: 0 },
        disciplin: { id: 0 },
    });
    const [results, setResults] = useState<ResultatProps[]>([]);
    const [deltagere, setDeltagere] = useState<DeltagerProps[]>([]);
    const [discipliner, setDiscipliner] = useState<DisciplinProps[]>([{ id: 0, navn: "", resultattype: "" }]);

    // Fetch existing deltagere and discipliner from backend
    const fetchInitialData = async () => {
        const fetchedDeltagere = await fetchDeltagere();
        setDeltagere(fetchedDeltagere);

        const fetchedDiscipliner = await fetchDiscipliner();
        setDiscipliner(fetchedDiscipliner);
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "deltager_id") {
            setCurrentResult({ ...currentResult, deltager: { id: parseInt(value, 10) } });
        } else if (name === "disciplin_id") {
            setCurrentResult({ ...currentResult, disciplin: { id: parseInt(value, 10) } });
        } else if (name === "resultattype") {
            const selectedDisciplin = discipliner.find((d) => d.navn === value);
            const disciplinId = selectedDisciplin ? selectedDisciplin.id : 0;
            setCurrentResult({ ...currentResult, resultattype: value, disciplin: { id: disciplinId } });
        } else {
            setCurrentResult({ ...currentResult, [name]: value });
        }
    };

    const handleAddResult = () => {
        setResults([...results, currentResult]);
        setCurrentResult({ resultattype: "", dato: "", resultatvalue: "", deltager: { id: 0 }, disciplin: { id: 0 } });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createResultater(results);
        setResults([]);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Atletik disciplin</label>
                    <select
                        className="form-control"
                        name="resultattype"
                        value={currentResult.resultattype}
                        onChange={handleChange}
                    >
                        <option value="">Vælg disciplin</option>
                        {discipliner.map((disciplin) => {
                            const isDisciplinSelected = results.some((result) => result.disciplin?.id === disciplin.id);
                            return (
                                <option key={disciplin.id} value={disciplin.navn} disabled={isDisciplinSelected}>
                                    {disciplin.navn}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label>Dato</label>
                    <input
                        type="date"
                        className="form-control"
                        placeholder="YYYY-MM-DD"
                        name="dato"
                        value={currentResult.dato}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Resultatværdi</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="benyt punktum som decimaltegn 00.00"
                        name="resultatvalue"
                        value={currentResult.resultatvalue}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Deltager</label>
                    <select
                        className="form-control"
                        name="deltager_id"
                        value={currentResult.deltager?.id}
                        onChange={handleChange}
                    >
                        <option value="">Vælg deltager</option>
                        {deltagere.map((deltager) => (
                            <option key={deltager.id} value={deltager.id}>
                                {deltager.navn}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="button" className="btn btn-secondary" onClick={handleAddResult}>
                    Tilføj nyt resultat
                </button>
                <button type="submit" className="btn btn-primary">
                    Registrer resultater
                </button>
            </form>

            {results.length > 0 && (
                <div className="mt-5">
                    <h3>Tilføjede resultater:</h3>
                    <ul className="list-group">
                        {results.map((result, index) => (
                            <li key={index} className="list-group-item">
                                Disciplin: {discipliner.find((d) => d.id === result.disciplin?.id)?.navn}, Dato:{" "}
                                {result.dato}, Resultatværdi: {result.resultatvalue}, Deltager:{" "}
                                {deltagere.find((d) => d.id === result.deltager?.id)?.navn}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NewResults;
