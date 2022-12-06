type Actions ={
    onClick?: (indexes?: (string | number)[]) => void;
    onInput?: (e: any | React.ChangeEvent<HTMLInputElement>, indexes?: (string | number)[]) => void;
    onChange?: (e: any | React.ChangeEvent<HTMLInputElement>, indexes?: (string | number)[]) => void;
    onKeyDown?: (e: any | React.KeyboardEvent<HTMLInputElement>, indexes?: (string | number)[]) => void;
    onKeyUp?: (e: any | React.KeyboardEvent<HTMLInputElement>, indexes?: (string | number)[]) => void;
}
export type { Actions };