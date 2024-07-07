export {};
export function convertToDesiredTime(lastTimeValue: number) {
    return Math.ceil((new Date().getTime() - lastTimeValue) / 1000) + " seconds";
}