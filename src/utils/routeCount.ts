
export default (n: number | string) => {
    n = n.toString();
    if (+n.slice(0, -2) > 9 && +n.slice(0, -2) < 20 || [0, 5, 6, 7, 8, 9].includes(+n[n.length - 1])) {
        return "рейсов";
    }
    if (n[n.length - 1] === "1") {
        return "рейс";
    }
    return "рейса";
}