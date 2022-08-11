export enum IconType {
  square,
  circle,
  check,
  magnifier,
  x
};

export const BasicClose = (disabled?:boolean, size?: string) => `
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  height: ${size || '15px'};
  width: ${size || '15px'};
  max-height: ${size || '15px'};
  max-width: ${size || '15px'};
  opacity: 0.7;
  margin: 5px;
  :hover {
    opacity: 1;
  }
`;

export const BasicSquare = (disabled?:boolean, color?: string, size?: string) => `
  ${BasicClose(disabled, size)}
  background-color: ${color || 'red'};
  border-radius: 0px;
  opacity: 1;
  border: 0px;
  :hover {
    border: 0px;
  }
`;

export const BasicCircle = (disabled?:boolean, color?: string, size?: string) => `
  ${BasicClose(disabled, size)}
  background-color: ${color || 'red'};
  border-radius: 100px;
  opacity: 1;
  border: 0px;
  :hover {
    border: 0px;
  }
`;

export const BasicX = (disabled?:boolean, color?: string, size?: string) => `
  ${BasicClose(disabled, size)}
  background: transparent url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='auto' height='${(''+(size || '14px')).replace('px', '')}' viewBox='0 0 24 24' fill='${(color || 'black').replace('#', '%23')}'>
    <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/>
  </svg>");
  background-repeat: no-repeat !important;
`;

export const BasicMagnifier = (disabled?:boolean, color?: string, size?: string) => `
  ${BasicClose(disabled, size)}
  background: transparent url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='auto' height='${(''+(size || '14px')).replace('px', '')}' viewBox='0 0 19 22' fill='none'>
    <path d='M9.82368 16.6637C14.1192 16.6637 17.6015 13.1815 17.6015 8.88593C17.6015 4.59038 14.1192 1.10815 9.82368 1.10815C5.52813 1.10815 2.0459 4.59038 2.0459 8.88593C2.0459 13.1815 5.52813 16.6637 9.82368 16.6637Z' stroke='${(color || 'black').replace('#', '%23')}' stroke-miterlimit='10'/>
    <path d='M5.37901 14.8118L0.93457 20.7377' stroke='${(color || 'black').replace('#', '%23')}' stroke-miterlimit='10'/>
  </svg>");
  background-repeat: no-repeat !important;
`;

export const BasicCheck = (disabled?:boolean, color?: string, size?: string) => `
  ${BasicClose(disabled, size)}
  background: transparent url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>
    <path transform='rotate(45 50.1028 35.3355)' stroke='${(color || 'black').replace('#', '%23')}' id='svg_2' d='m69.95659,-10.18661l0,91.04421l-39.70752,0' fill='transparent'/>
  </svg>");
  background-repeat: no-repeat !important;
`;

export const Icon = (type?: IconType, disabled?:boolean, color?: string, size?: string) => {
  switch (type) {
    case IconType.square:
      return BasicSquare(disabled, color, size);
    case IconType.circle:
      return BasicCircle(disabled, color, size);
    case IconType.check:
      return BasicCheck(disabled, color, size);;
    case IconType.magnifier:
      return BasicMagnifier(disabled, color, size);;
    default:
      return BasicX(disabled, color, size);;
  }
};