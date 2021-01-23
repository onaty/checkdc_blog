import * as randomstring from 'randomstring';



// Generate Random String
export const generateRandomString = async (length: number = 20, charset = 'alphanumeric') => {
    const randomString = randomstring.generate({
        length,
        charset,
    });
    return randomString;
};

export const LogError = async (error: any, action: any) => {
    console.error(error, action);

}

export const roundToTwo = (num: any) => {

    return Math.round(num * 100 + Number.EPSILON) / 100

}

export const calculateNewRate = (oldvalue: any, newvalue: any) => {

    let firstcalc = newvalue - oldvalue;
    let dividedbyOld = firstcalc / oldvalue;
    let rate = roundToTwo(dividedbyOld * 100)
    return rate

}
