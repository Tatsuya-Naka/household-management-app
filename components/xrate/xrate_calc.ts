const xrateCalc = (from: number, to: number) => {
    return Math.round((Math.round(to * 10000) / 10000) / ((Math.round(from * 10000) / 10000)) * 100) / 100;
}

export default xrateCalc;