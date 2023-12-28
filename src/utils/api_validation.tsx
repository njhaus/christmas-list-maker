// Checks body of form before submitting to backend

export const apiValidation = (body: { [key: string]: any }) => {
    for (let k in body) {
        if (body[k].match(/[<>&"';*]/g) || k.length >= 200) {
       return false;
        }    
    }
    return true;
};
