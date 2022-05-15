const verifParams = (body: any, lst: string[]): boolean => {
    for (const key in lst){
        if (!Object.keys(body).includes(lst[key])){
            return (false);
        }
    }
    return (true);
}

export default {
    verifParams,
}