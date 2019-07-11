
export interface ITemplate {
    selector: string;
    source: string;
    target: string;
    disabled?: boolean;
    skipExisting?: boolean;
}

export interface IConfig {
    templates: ITemplate[];
}

