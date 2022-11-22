export interface IBaseNote {
    title: string;
    tag: string;
    content: string;
}

export interface INote extends IBaseNote {
    id: number;
}