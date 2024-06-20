// ResultatProps.ts
export interface ResultatProps {
    id?: number;
    resultattype: string;
    dato: string;
    resultatvalue: string;
    deltager?: {
        id: number;
    };
    disciplin?: {
        id: number;
    };
}
