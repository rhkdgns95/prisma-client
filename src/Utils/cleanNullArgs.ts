/**
 *  cleanNullArgs
 *   - 인자값이 NULL을 갖는 경우, 해당 속성값을 제거.
 */
export const cleanNullArgs = (obj: any) => {
    let newObj: any = {};

    Object.keys(obj).forEach(key => {
        if(obj[key] !== null) {
            newObj[key] = obj[key];
        }
    });

    return newObj;
}