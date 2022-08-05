declare enum FlowType {
    leftToRight = 0,
    rightToLeft = 1,
    bottomToTop = 2,
    topToBottom = 3
}
declare type Flow = {
    x1: string;
    y1: string;
    x2: string;
    y2: string;
};
declare const getFlow: (flow: any, min: any, max: any) => Flow | undefined;
declare const SVG: any;
declare const Bar: any;
declare const Milk: any;
declare const Progress: any;
export { Progress, SVG, Milk, Bar, FlowType, getFlow };
export type { Flow };
//# sourceMappingURL=index.d.ts.map