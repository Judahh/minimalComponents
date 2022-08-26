export const baseConfig = (props) => `
margin: 0;
padding: 0;
outline: 0;
border: 0;
border-radius: 0;
-webkit-font-smoothing: antialiased;
box-sizing: border-box;
scroll-behavior: smooth !important;
transition: all ${props?.theme?.transition?.duration || 1}s ease;
animation: ${props?.theme?.animation?.duration || 1}s ease appear;
font-family: ${props?.theme?.font?.type || 'Spartan-Light'};
font-weight: ${props?.theme?.font?.weight || 'normal'};
font-size: ${props?.theme?.font?.size || '14px'};
background-repeat: no-repeat;
`;

const exists = (array: Array<any>, value) => {
    let find = array?.findIndex?.(element => element === value);
    let has = find != undefined && find > -1;
    return has;
};

export { exists };
