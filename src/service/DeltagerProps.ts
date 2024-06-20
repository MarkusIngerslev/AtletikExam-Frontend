import { ResultatProps } from "./ResultatProps";

export interface DeltagerProps {
    id?: number;
    navn: string;
    køn: string;
    alder: number;
    klub: string;
    resultater?: ResultatProps[];
}
