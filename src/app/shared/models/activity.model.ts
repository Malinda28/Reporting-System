export interface Activity {
    id: number;
    content: string;
    attempts: Attempts;
    student: string;
    time: string;
    skill: string;
    type: string;
}

export interface Attempts {
    weeks: Date[] | string[];
    values: number[];
    number?: number;
}

export interface FlattenedActivity {
    id: number;
    content: string;
    student: string;
    skill: string;
    type: string;
    duration: string;
    week: Date;
    value: number;
}

export interface ChartData {
    name:   string;
    series: Series[];
}

export class Series {
    name!:  string;
    value!: number;
}
