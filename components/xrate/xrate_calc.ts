const xrateCalc = (from: number, to: number) => {
    return Math.round((Math.round(to * 100) / 100) / ((Math.round(from * 100) / 100)) * 100) / 100;
}

export default xrateCalc;