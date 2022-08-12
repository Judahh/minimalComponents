type Actions ={
    onClick?: (index?: number, key?: string) => void;
    onInput?: (e: any | React.ChangeEvent<HTMLInputElement>, index?: number, key?: string) => void;
    onChange?: (e: any | React.ChangeEvent<HTMLInputElement>, index?: number, key?: string) => void;
    onKeyDown?: (e: any | React.KeyboardEvent<HTMLInputElement>, index?: number, key?: string) => void;
    onKeyUp?: (e: any | React.KeyboardEvent<HTMLInputElement>, index?: number, key?: string) => void;
}
export type {Actions};