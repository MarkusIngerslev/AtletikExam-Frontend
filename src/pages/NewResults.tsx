import React, { useState, useEffect } from "react";
import { ResultatProps } from "../service/ResultatProps";
import { DeltagerProps } from "../service/DeltagerProps";
import { DisciplinProps } from "../service/DisciplinProps";
import { createResultater, fetchDeltagere } from "../service/apiFacade";

const NewResults: React.FC = () => {
    const [results, setResults] = useState<ResultatProps[]>([
        { resultattype: "", dato: "", resultatvalue: "", deltager: { id: 0 }, disciplin: { id: 0 } },
    ]);

    const [deltagere, setDeltagere] = useState<DeltagerProps[]>([]);
    const [discipliner, setDiscipliner] = useState<DisciplinProps[]>([{ id: 0, navn: "", resultattype: "" }]);

    // Fetch existing deltagere and discipliner from backend
    const fetchInitialData = async () => {
        const fetchedDeltagere = await fetchDeltagere();
        setDeltagere(fetchedDeltagere);

        const fetchedDiscipliner = deltagere.flatMap(
            (deltager) => deltager?.resultater?.map((result) => result.disciplin) || []
        );
        setDiscipliner(fetchedDiscipliner);
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    const handleAddResult = () => {
        setResults([
            ...results,
            { resultattype: "", dato: "", resultatvalue: "", deltager: { id: 0 }, disciplin: { id: 0 } },
        ]);
    };

    const handleChange = (index: number, e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        const newResults = results.map((result, i) => {
            if (i === index) {
                if (name === "deltager_id") {
                    return { ...result, deltager: { id: parseInt(value, 10) } };
                }
                if (name === "disciplin_id") {
                    return { ...result, disciplin: { id: parseInt(value, 10) } };
                }
                if (name === "resultattype") {
                    const selectedDisciplin = discipliner.find((d) => d.navn === value);
                    return { ...result, resultattype: value, disciplin: { id: selectedDisciplin.id } };
                }
                return { ...result, [name]: value };
            }
            return result;
        });
        setResults(newResults);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createResultater(results);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                {results.map((_result, index) => (
                    <div key={index}>
                        <div className="form-group">
                            <label>Atletik disciplin</label>
                            <select
                                className="form-control"
                                name="resultattype"
                                onChange={(e) => handleChange(index, e)}
                            >
                                <option value="">Vælg disciplin</option>
                                {discipliner.map((disciplin) => {
                                    const isDisciplinSelected = results.some(
                                        (result) => result.disciplin?.id === disciplin.id
                                    );
                                    return (
                                        <option
                                            key={disciplin.id}
                                            value={disciplin.navn}
                                            disabled={isDisciplinSelected}
                                        >
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
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Resultatværdi</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="benyt punktum som decimaltegn 00.00"
                                name="resultatvalue"
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Deltager</label>
                            <select
                                className="form-control"
                                name="deltager_id"
                                onChange={(e) => handleChange(index, e)}
                            >
                                <option value="">Vælg deltager</option>
                                {deltagere.map((deltager) => (
                                    <option key={deltager.id} value={deltager.id}>
                                        {deltager.navn}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
                <button type="button" className="btn btn-secondary" onClick={handleAddResult}>
                    Tilføj nyt resultat
                </button>
                <button type="submit" className="btn btn-primary">
                    Registrer resultater
                </button>
            </form>
        </div>
    );
};

export default NewResults;
