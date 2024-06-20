import React, { useState } from "react";
import { ResultatProps } from "../service/ResultatProps";
import { createResultater } from "../service/apiFacade";

const NewResults: React.FC = () => {
    const [results, setResults] = useState<ResultatProps[]>([
        { resultattype: "", dato: "", resultatvalue: 0, deltager: { id: 0 }, disciplin: { id: 0 } },
    ]);

    const handleAddResult = () => {
        setResults([
            ...results,
            { resultattype: "", dato: "", resultatvalue: 0, deltager: { id: 0 }, disciplin: { id: 0 } },
        ]);
    };

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newResults = results.map((result, i) => {
            if (i === index) {
                if (name === "deltager_id") {
                    return { ...result, deltager: { id: parseInt(value, 10) } };
                }
                if (name === "diciplin_id") {
                    return { ...result, disciplin: { id: parseInt(value, 10) } };
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
                            <input
                                type="text"
                                className="form-control"
                                name="resultattype"
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Dato</label>
                            <input
                                type="text"
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
                            <label>Deltager ID</label>
                            <input
                                type="number"
                                className="form-control"
                                name="deltager_id"
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Disciplin ID</label>
                            <input
                                type="number"
                                className="form-control"
                                name="diciplin_id"
                                onChange={(e) => handleChange(index, e)}
                            />
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
