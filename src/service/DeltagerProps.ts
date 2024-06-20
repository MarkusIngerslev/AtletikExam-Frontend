// DeltagerProps.ts
export interface ResultatProps {
    id: number;
    resultattype: string;
    dato: string;
    resultatvalue: string;
    disciplin: {
        id: number;
        navn: string;
        resultattype: string;
    };
}

export interface DeltagerProps {
    id: number;
    navn: string;
    køn: string;
    alder: number;
    klub: string;
    resultater: ResultatProps[];
}
