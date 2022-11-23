export type IBaseNote = {
    title: string;
    tag: string;
    content: string;
}

export type INote = {
    id: number;
} & IBaseNote;

export type Tag = {
    id: number;
    label: string;
}