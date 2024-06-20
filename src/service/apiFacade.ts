import { DeltagerProps } from "./DeltagerProps";

const endpoint = "http://localhost:8080";

// ----- Deltager ----- //

// Hent alle deltagere
async function fetchDeltagere() {
    const url = `${endpoint}/api/deltagere`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        // Tjek at data er korrekt
        console.log(data);
        // Data bliver returneret
        return data;
    } catch (error) {
        console.error("An error occurred: ", error);
        throw error;
    }
}

// Hent en deltager
async function fetchDeltager(id: number) {
    const url = `${endpoint}/api/deltagere/${id}`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        // Tjek at data er korrekt
        console.log(data);
        // Data bliver returneret
        return data;
    } catch (error) {
        console.error("An error occurred: ", error);
        throw error;
    }
}

// Hent en deltager ud fra et navn
async function fetchDeltagerNavn(navn: string) {
    const url = `${endpoint}/api/deltagere/navn/${navn}`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        // Tjek at data er korrekt
        console.log(data);
        // Data bliver returneret
        return data;
    } catch (error) {
        console.error("An error occurred: ", error);
        throw error;
    }
}

// Opret en deltager
async function createDeltager(deltager: DeltagerProps) {
    const url = `${endpoint}/api/deltagere`;
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(deltager),
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        // Tjek at data er korrekt
        console.log(data);
        // Data bliver returneret
        return data;
    } catch (error) {
        console.error("An error occurred: ", error);
        throw error;
    }
}

// Opdater en deltager
async function updateDeltager(deltager: DeltagerProps) {
    const url = `${endpoint}/api/deltagere/${deltager.id}`;
    try {
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(deltager),
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        // Tjek at data er korrekt
        console.log(data);
        // Data bliver returneret
        return data;
    } catch (error) {
        console.error("An error occurred: ", error);
        throw error;
    }
}

// Slet en deltager
async function deleteDeltager(id: number) {
    const url = `${endpoint}/api/deltagere/${id}`;
    try {
        const res = await fetch(url, {
            method: "DELETE",
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        // Tjek at data er korrekt
        console.log(data);
        // Data bliver returneret
        return data;
    } catch (error) {
        console.error("An error occurred: ", error);
        throw error;
    }
}

// ----- Resultater ----- //

// Hent alle resultater
async function fetchResultater() {
    const url = `${endpoint}/api/resultater`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        // Tjek at data er korrekt
        console.log(data);
        // Data bliver returneret
        return data;
    } catch (error) {
        console.error("An error occurred: ", error);
        throw error;
    }
}

// Hent enkelt resultat
async function fetchResultat(id: number) {
    const url = `${endpoint}/api/resultater/${id}`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        // Tjek at data er korrekt
        console.log(data);
        // Data bliver returneret
        return data;
    } catch (error) {
        console.error("An error occurred: ", error);
        throw error;
    }
}

// Hent enkelt resultater ud fra en disciplin
async function fetchResultaterDisciplin(disciplin: string) {
    const url = `${endpoint}/api/resultater/disciplin/${disciplin}`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        // Tjek at data er korrekt
        console.log(data);
        // Data bliver returneret
        return data;
    } catch (error) {
        console.error("An error occurred: ", error);
        throw error;
    }
}

// ----- Export ----- //

// Export metoder for deltager
export { fetchDeltagere, fetchDeltager, fetchDeltagerNavn, createDeltager, updateDeltager, deleteDeltager };

// Export metode for resultater
export { fetchResultater, fetchResultat };
