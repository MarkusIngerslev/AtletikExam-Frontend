import React, { useState } from "react";
import { createDeltager } from "../service/apiFacade";
import { DeltagerProps } from "../service/DeltagerProps";
import DropDownClub from "../components/DropDownClub";

function NewParticipant() {
    const [formData, setFormData] = useState<DeltagerProps>({
        navn: "",
        køn: "",
        alder: 0,
        klub: "",
    });
    const [createMessage, setCreateMessage] = useState("");
    const [createSuccess, setCreateSuccess] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleClubChange = (value: string) => {
        setFormData({ ...formData, klub: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createDeltager(formData)
            .then(() => {
                // redirect or show success message
                setCreateMessage("Participant created successfully");
                setCreateSuccess(true);
                setTimeout(() => {
                    setCreateSuccess(false);
                }, 5000);
            })
            .catch(console.error);
    };

    return (
        <div className="container">
            {createSuccess && <h4 className="text-center text-success my-5">{createMessage}</h4>}
            <h1>Ny Deltager</h1>
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
                    <label>Køn</label>
                    <input
                        type="text"
                        name="køn"
                        value={formData.køn}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Alder</label>
                    <input
                        type="number"
                        name="alder"
                        value={formData.alder}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <DropDownClub klub={formData.klub} onChange={handleClubChange} />
                <button type="submit" className="btn btn-primary mt-3">
                    Tilføj
                </button>
            </form>
        </div>
    );
}

export default NewParticipant;
