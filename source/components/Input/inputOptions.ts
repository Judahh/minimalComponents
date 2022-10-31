interface InputOptions {
    type: 'throttle' | 'debounce';
    minLength?: number;
    forceNotifyByEnter?: boolean,
    forceNotifyOnBlur?: boolean,

    wait?: number;
    maxWait?: number;
    leading?: boolean;
    trailing?: boolean;
};

export type { InputOptions };