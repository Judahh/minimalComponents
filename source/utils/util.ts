const exists = (array: Array<any>, value) => {
    let find = array?.findIndex?.(element => element === value);
    let has = find != undefined && find > -1;
    return has;
};

export { exists };
