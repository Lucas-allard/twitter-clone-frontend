const abbreviatedMonths = [
    "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.",
    "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
];

export const formatDate = (date: string): string => {
    const now: Date = new Date();
    const dateObject: Date = new Date(date);
    const timeDifference: number = now.getTime() - dateObject.getTime();
    const minutesDifference: number = Math.floor(timeDifference / 60000);
    if (minutesDifference < 60) {
        return `${minutesDifference}m`;
    } else {
        const hoursDifference: number = Math.floor(minutesDifference / 60);
        if (hoursDifference < 24) {
            return `${hoursDifference}h`;
        } else {
            const day: number = dateObject.getDate();
            const month: number = dateObject.getMonth();
            const abbreviatedMonth: string = abbreviatedMonths[month];
            return `${day} ${abbreviatedMonth}`;
        }
    }
};
