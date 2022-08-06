export default class RequestError extends Error {
    code: number;
    codeText: string;
    response: any;
    constructor(code: number, codeText: string, response: any);
}
//# sourceMappingURL=requestError.d.ts.map