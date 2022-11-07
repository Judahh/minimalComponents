export const textLimitation = (theme) => ({
  limited: theme?.limited?.maxWidth || '202px',
  base: theme?.base?.maxWidth || '256px',
  full: theme?.maxWidth || '100%',
});

export const textSizes = (theme) => {
  console.log('txt size:', theme);
  return {
    minimal: theme?.minimal?.font?.size || '10px',
    small: theme?.small?.font?.size || '12px',
    regular: theme?.font?.size || '14px',
    h6: theme?.h6?.font?.size || '16px',
    h5: theme?.h5?.font?.size || '18px',
    h4: theme?.h4?.font?.size || '20px',
    h3: theme?.h3?.font?.size || '24px',
    h2: theme?.h2?.font?.size || '32px',
    h1: theme?.h1?.font?.size || '40px',
  };
};

export const textWeights = (theme) => ({
  minimal: theme?.minimal?.font?.weight || 'normal',
  small: theme?.small?.font?.weight || 'normal',
  regular: theme?.font?.weight || 'normal',
  h6: theme?.h6?.font?.weight || 'bold',
  h5: theme?.h5?.font?.weight || 'bold',
  h4: theme?.h4?.font?.weight || 'bold',
  h3: theme?.h3?.font?.weight || 'bold',
  h2: theme?.h2?.font?.weight || 'bold',
  h1: theme?.h1?.font?.weight || 'bolder',
});

export const isHeading = (type: string) => {
  return type?.startsWith('h');
};

export const getTextType = (type: string) => {
  console.log('getTextType', type);
  return type === 'limited' || type === 'base' || type === 'full'
    ? type
    : 'full';
};

export const getTextLimitationType = (type: string) => {
  return type === 'minimal' ||
    type === 'small' ||
    type === 'regular' ||
    type === 'h6' ||
    type === 'h5' ||
    type === 'h4' ||
    type === 'h3' ||
    type === 'h2' ||
    type === 'h1'
    ? type
    : 'regular';
};

const getFontSize = (props) => textSizes(props?.theme)[getTextLimitationType(props?.sizeType)];
const getFontWeight = (props) => textWeights(props?.theme)[getTextLimitationType(props?.sizeType)];

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

font-size: ${getFontSize(props)};
font-weight: ${getFontWeight(props)};
background-repeat: no-repeat;
`;
