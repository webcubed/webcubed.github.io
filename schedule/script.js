const schedule = {
    monday: [
        { period: 1, timeRange: "8:10-8:56", subject: "Spanish", room: "126A", teacher: "Varkey" },
        { period: 2, timeRange: "8:58-9:43", subject: "History", room: "125", teacher: "Caviris" },
        { period: 3, timeRange: "9:45-10:30", subject: "Lunch", room: "CAFE", teacher: "Cuchapin" },
        { period: 4, timeRange: "10:32-11:18", subject: "Biology", room: "156", teacher: "Delaney" },
        { period: 5, timeRange: "11:20-12:05", subject: "ELA", room: "159", teacher: "Kolansky" },
        { period: 6, timeRange: "12:07-12:53", subject: "History", room: "125", teacher: "Caviris" },
        { period: 7, timeRange: "12:55-13:41", subject: "PE", room: "GYM", teacher: "Belmonte" },
        { period: 8, timeRange: "13:43-14:30", subject: "Algebra", room: "204", teacher: "Fong" },
    ],
    tuesday: [
        { period: 1, timeRange: "8:10-8:56", subject: "Non-Core Math", room: "N/A", teacher: "N/A" },
        { period: 2, timeRange: "8:58-9:43", subject: "ELA", room: "159", teacher: "Kolansky" },
        { period: 3, timeRange: "9:45-10:30", subject: "Lunch", room: "CAFE", teacher: "Cuchapin" },
        { period: 4, timeRange: "10:32-11:18", subject: "Biology", room: "156", teacher: "Delaney" },
        { period: 5, timeRange: "11:20-12:05", subject: "Talent", room: "N/A", teacher: "N/A" },
        { period: 6, timeRange: "12:07-12:53", subject: "PE", room: "GYM", teacher: "Belmonte" },
        { period: 7, timeRange: "12:55-13:41", subject: "History", room: "125", teacher: "Caviris" },
        { period: 8, timeRange: "13:43-14:30", subject: "Algebra", room: "204", teacher: "Fong" },
    ],
    wednesday: [
        { period: 1, timeRange: "8:10-8:56", subject: "Algebra", room: "204", teacher: "Fong" },
        { period: 2, timeRange: "8:58-9:43", subject: "ELA", room: "159", teacher: "Kolansky" },
        { period: 3, timeRange: "9:45-10:30", subject: "Lunch", room: "CAFE", teacher: "Cuchapin" },
        { period: 4, timeRange: "10:32-11:18", subject: "Non-Core ELA", room: "N/A", teacher: "N/A" },
        { period: 5, timeRange: "11:20-12:05", subject: "Algebra", room: "204", teacher: "Fong" },
        { period: 6, timeRange: "12:07-12:53", subject: "Biology", room: "156", teacher: "Delaney" },
        { period: 7, timeRange: "12:55-13:41", subject: "History", room: "125", teacher: "Caviris" },
        { period: 8, timeRange: "13:43-14:30", subject: "Spanish", room: "126A", teacher: "Varkey" },
    ],
    thursday: [
        { period: 1, timeRange: "8:10-8:56", subject: "Biology", room: "156", teacher: "Delaney" },
        { period: 2, timeRange: "8:58-9:43", subject: "History", room: "125", teacher: "Caviris" },
        { period: 3, timeRange: "9:45-10:30", subject: "Lunch", room: "CAFE", teacher: "Cuchapin" },
        { period: 4, timeRange: "10:32-11:18", subject: "ELA", room: "159", teacher: "Kolansky" },
        { period: 5, timeRange: "11:20-12:05", subject: "Spanish", room: "126A", teacher: "Varkey" },
        { period: 6, timeRange: "12:07-12:53", subject: "Biology", room: "156", teacher: "Delaney" },
        { period: 7, timeRange: "12:55-13:41", subject: "Algebra", room: "204", teacher: "Fong" },
        { period: 8, timeRange: "13:43-14:30", subject: "Talent", room: "N/A", teacher: "N/A" },
    ],
    friday: [
        { period: 1, timeRange: "8:10-8:56", subject: "ELA", room: "159", teacher: "Kolansky" },
        { period: 2, timeRange: "8:58-9:43", subject: "Biology", room: "156", teacher: "Delaney" },
        { period: 3, timeRange: "9:45-10:30", subject: "Lunch", room: "CAFE", teacher: "Cuchapin" },
        { period: 4, timeRange: "10:32-11:18", subject: "Algebra", room: "204", teacher: "Fong" },
        { period: 5, timeRange: "11:20-12:05", subject: "Non-Core Math", room: "N/A", teacher: "N/A" },
        { period: 6, timeRange: "12:07-12:53", subject: "History", room: "125", teacher: "Caviris" },
        { period: 7, timeRange: "12:55-13:41", subject: "Talent", room: "N/A", teacher: "N/A" },
        { period: 8, timeRange: "13:43-14:30", subject: "Spanish", room: "126A", teacher: "Varkey" },
    ],
};
const options = {
    left: [
        {
            colored: false,
        },
    ],
    middle: [{}],
    right: [
        {
            colors: {
                border: "#cad3f5",
                text: "#cad3f5",
                background: "#181926",
            },
        },
    ],
};
const additionalTeachers = {
    // TODO
};
const defaultColors = {
    Algebra: "#8aadf4",
    Biology: "#a6da95",
    ELA: "#ed8796",
    History: "#eed49f",
    "Non-Core ELA": "",
    "Non-Core Math": "",
    Spanish: "#c6a0f6",
    Talent: "",
    PE: "#f5a97f",
    Lunch: "#ee99a0",
};
function getPeriod() {
    // Get current day, ensure that it is monday through friday
    const now = new Date(2024, 12, 20, 9, 30); // testing purposes
    const day = now.getDay();
    if (day === 0 || day === 6) {
        return null;
    }

    // Get current time, ensure that it is between 8:10 am and 2:30 pm
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTimeInMinutes = hour * 60 + minute;

    if (!(currentTimeInMinutes >= 490 && currentTimeInMinutes <= 870)) {
        return null;
    }

    // Get current day in text
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const todaySchedule = schedule[daysOfWeek[day]];

    // Check which period it currently is
    for (const period of todaySchedule) {
        const [start, end] = period.timeRange.split("-");
        const [startHour, startMinute] = start.split(":").map(Number);
        const [endHour, endMinute] = end.split(":").map(Number);

        const startTimeInMinutes = startHour * 60 + startMinute;
        const endTimeInMinutes = endHour * 60 + endMinute;

        if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes) {
            return period;
        }
    }
    return null;
}
document.addEventListener("DOMContentLoaded", function () {
    // Get current period
    const period = getPeriod();
    if (period === null) {
        return;
    }
    /* ----------------------------- table creation ----------------------------- */
    function createDefaultTable() {
        const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"];
        const table = document.getElementById("defaultschedule");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        // Create table header
        const headerRow = document.createElement("tr");
        for (const day of daysOfWeek) {
            const th = document.createElement("th");
            th.textContent = day.charAt(0).toUpperCase() + day.slice(1);
            headerRow.appendChild(th);
        }
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Find the maximum number of periods in any day
        const maxPeriods = Math.max(...daysOfWeek.map((day) => schedule[day]?.length || 0));

        // Create table body
        for (let periodIndex = 0; periodIndex < maxPeriods; periodIndex++) {
            const row = document.createElement("tr");
            for (const day of daysOfWeek) {
                const td = document.createElement("td");
                const period = schedule[day]?.[periodIndex];
                td.textContent = period ? period.subject : "";
                row.appendChild(td);
            }
            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        return table;
    }
    /* ------------------------------ append tables ----------------------------- */
    // append default table
    document.body.appendChild(createDefaultTable());
    function createOptions() {
        const table = document.getElementById("options");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        
    }
    document.body.appendChild(createOptions());
});
