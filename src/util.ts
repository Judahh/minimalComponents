export const baseConfig = `
margin: 0;
padding: 0;
outline: 0;
border: 0;
border-radius: 0;
-webkit-font-smoothing: antialiased;
box-sizing: border-box;
scroll-behavior: smooth !important;
transition: all ${(props) => props?.theme?.transition?.duration || 1}s ease;
animation: ${(props) => props?.theme?.animation?.duration || 1}s ease appear;
font-family: ${(props) => props?.theme?.font?.type || 'Spartan-Light'};
font-weight: ${(props) => props?.theme?.font?.weight || 'normal'};
font-size: ${(props) => props?.theme?.font?.size || '2vh'};
background-repeat: no-repeat;
`;