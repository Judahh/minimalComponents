export enum IconType {
  square,
  circle,
  check,
  magnifier,
  x
};

export const Basic = (disabled?:boolean, size?: string, self?: boolean) => self ? '' : `
  box-sizing: border-box;
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

export const BasicSquare = (disabled?:boolean, color?: string, size?: string, self?: boolean) => `
  ${Basic(disabled, size, self)}
  background-color: ${color || 'red'};
  border-radius: 0px;
  opacity: 1;
  border: 0px;
  :hover {
    border: 0px;
  }
`;

export const BasicCircle = (disabled?:boolean, color?: string, size?: string, self?: boolean) => `
  ${Basic(disabled, size, self)}
  background-color: ${color || 'red'};
  border-radius: 100px;
  opacity: 1;
  border: 0px;
  :hover {
    border: 0px;
  }
`;

export const BasicX = (disabled?:boolean, color?: string, size?: string, self?: boolean) => `
  ${Basic(disabled, size, self)}
  background-color: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${(''+(size || '14px')).replace('px', '')}' height='${(''+(size || '14px')).replace('px', '')}' viewBox='0 0 110 110' fill='black'>
    <g fill='none' stroke='${(color || 'black').replace('#', '%23')}' stroke-width='10'>
        <path stroke-linecap='butt' d='M 5 5 l 50 50 l 50 -50 l -100 100 l 50 -50 l 50 50' />
    </g>
  </svg>");
  background-repeat: no-repeat !important;
  opacity: 1;
`;

export const BasicMagnifier = (disabled?:boolean, color?: string, size?: string, self?: boolean) => `
  ${Basic(disabled, size, self)}
  background-color: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='auto' height='${(''+(size || '14px')).replace('px', '')}' viewBox='0 0 19 22' fill='none'>
    <path d='M9.82368 16.6637C14.1192 16.6637 17.6015 13.1815 17.6015 8.88593C17.6015 4.59038 14.1192 1.10815 9.82368 1.10815C5.52813 1.10815 2.0459 4.59038 2.0459 8.88593C2.0459 13.1815 5.52813 16.6637 9.82368 16.6637Z' stroke='${(color || 'black').replace('#', '%23')}' stroke-miterlimit='10'/>
    <path d='M5.37901 14.8118L0.93457 20.7377' stroke='${(color || 'black').replace('#', '%23')}' stroke-miterlimit='10'/>
  </svg>");
  background-repeat: no-repeat !important;
`;

export const BasicCheck = (disabled?:boolean, color?: string, size?: string, self?: boolean) => `
  ${Basic(disabled, size, self)}
  background-color: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${(''+(size || '21px')).replace('px', '')}' height='${(''+(size || '21px')).replace('px', '')}' viewBox='0 0 110 75'>
  <g fill='none' stroke='${(color || 'black').replace('#', '%23')}' stroke-width='10'>
    <path stroke-linecap='butt' d='M 5 50 l 25 25 l 75 -75' />
  </g>
</svg>");
  background-repeat: no-repeat !important;
`;

export const Icon = (type?: IconType, disabled?:boolean, color?: string, size?: string, self?: boolean) => {
  // console.log('ICON:', type, disabled, color, size, self, from);
  switch (type) {
    case IconType.square:
      return BasicSquare(disabled, color, size, self);
    case IconType.circle:
      return BasicCircle(disabled, color, size, self);
    case IconType.check:
      return BasicCheck(disabled, color, size, self);
    case IconType.magnifier:
      return BasicMagnifier(disabled, color, size, self);
    default:
      return BasicX(disabled, color, size, self);
  }
};
