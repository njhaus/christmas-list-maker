// Limits form characters and length without showing error messages -- used on inputs not involved with logging in.

export const formConstraint = (val: string, maxLength: number) => {
    if (!val.match(/[<>&"';*]/g) && val.length <= maxLength) {
        return true
    }
    else {
        return false
    }
}