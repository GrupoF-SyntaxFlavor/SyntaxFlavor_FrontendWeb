export function getFirstDayOfCurrentMonth() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
}

export function get30DaysAgoDate() {
    const now = new Date();
    return new Date(now.setDate(now.getDate() - 30));
}