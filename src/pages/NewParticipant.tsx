import React, { useState } from "react";
import { createDeltager } from "../service/apiFacade";
import { DeltagerProps } from "../service/DeltagerProps";

function NewParticipant() {
    const [formData, setFormData] = useState<DeltagerProps>({
        navn: "",
        køn: "",
        alder: 0,
        klub: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createDeltager(formData)
            .then(() => {
                // redirect or show success message
            })
            .catch(console.error);
    };

    return (
        <div className="container">
            <h1>New Participant</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn-primary mt-3">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default NewParticipant;
