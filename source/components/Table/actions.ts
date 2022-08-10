type Actions ={
    onClick?: (index?: number, key?: string) => void;
    onInput?: (e: React.ChangeEvent<HTMLInputElement>, index?: number, key?: string) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, index?: number, key?: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>, index?: number, key?: string) => void;
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>, index?: number, key?: string) => void;
}
export type {Actions};