/// <reference types="react" />
export default interface NotificationContextModel {
    timer?: number;
    children?: [];
    text?: string;
    error?: boolean;
    setError: React.Dispatch<React.SetStateAction<boolean | undefined>> | ((_error?: boolean) => {}) | ((_error?: boolean) => void);
    setText: React.Dispatch<React.SetStateAction<string | undefined>> | ((_text?: string) => {}) | ((_text?: string) => void);
    setChildren: React.Dispatch<React.SetStateAction<[] | undefined>> | ((_children?: any) => {}) | ((_children?: any) => void);
    setTimer: React.Dispatch<React.SetStateAction<number | undefined>> | ((_timer?: number) => {}) | ((_timer?: number) => void);
}
//# sourceMappingURL=notificationContextModel.d.ts.map