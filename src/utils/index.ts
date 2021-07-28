export const isEmpty = (obj: any) => {
    if (obj === null || obj === '' || obj === undefined) return true;
    if (!Object.entries(obj).length) return true;
    return false;
};
