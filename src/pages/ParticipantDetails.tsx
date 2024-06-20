import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDeltager } from "../service/apiFacade";
import { DeltagerProps } from "../service/DeltagerProps";

function ParticipantDetails() {
    const { id } = useParams<{ id: string }>();
    const [participant, setParticipant] = useState<DeltagerProps | null>(null);

    useEffect(() => {
        if (id) {
            fetchDeltager(parseInt(id)).then(setParticipant).catch(console.error);
        }
    }, [id]);

    if (!participant) return <div>Loading...</div>;

    return (
        <div className="container">
            <h1>{participant.navn}</h1>
            <p>Gender: {participant.køn}</p>
            <p>Age: {participant.alder}</p>
            <p>Club: {participant.klub}</p>
            {/* Add buttons for editing and deleting the participant */}
        </div>
    );
}

export default ParticipantDetails;
