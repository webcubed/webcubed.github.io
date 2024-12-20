const schedule = {
    monday: [
        { period: 1, timeRange: "8:10-8:56", subject: "Spanish", room: "126A", teacher: "Varkey" },
        { period: 2, timeRange: "8:58-9:43", subject: "History", room: "125", teacher: "Caviris" },
        { period: 3, timeRange: "9:45-10:30", subject: "Lunch", room: "CAFE", teacher: "Cuchapin" },
        { period: 4, timeRange: "10:32-11:18", subject: "Biology", room: "156", teacher: "Delaney" },
        { period: 5, timeRange: "11:20-12:05", subject: "ELA", room: "159", teacher: "Kolansky" },
        { period: 6, timeRange: "12:07-12:53", subject: "History", room: "125", teacher: "Caviris" },
        { period: 7, timeRange: "12:55-1:41", subject: "PE", room: "GYM", teacher: "Belmonte" },
        { period: 8, timeRange: "1:43-2:30", subject: "Algebra", room: "204", teacher: "Fong" },
    ],
    tuesday: [
        { period: 1, timeRange: "8:10-8:56", subject: "Non-Core Math", room: "N/A", teacher: "N/A" },
        { period: 2, timeRange: "8:58-9:43", subject: "ELA", room: "159", teacher: "Kolansky" },
        { period: 3, timeRange: "9:45-10:30", subject: "Lunch", room: "CAFE", teacher: "Cuchapin" },
        { period: 4, timeRange: "10:32-11:18", subject: "Biology", room: "156", teacher: "Delaney" },
        { period: 5, timeRange: "11:20-12:05", subject: "Talent", room: "N/A", teacher: "N/A" },
        { period: 6, timeRange: "12:07-12:53", subject: "PE", room: "GYM", teacher: "Belmonte" },
        { period: 7, timeRange: "12:55-1:41", subject: "History", room: "125", teacher: "Caviris" },
        { period: 8, timeRange: "1:43-2:30", subject: "Algebra", room: "204", teacher: "Fong" },
    ],
    wednesday: [
        { period: 1, timeRange: "8:10-8:56", subject: "Algebra", room: "204", teacher: "Fong" },
        { period: 2, timeRange: "8:58-9:43", subject: "ELA", room: "159", teacher: "Kolansky" },
        { period: 3, timeRange: "9:45-10:30", subject: "Lunch", room: "CAFE", teacher: "Cuchapin" },
        { period: 4, timeRange: "10:32-11:18", subject: "Non-Core ELA", room: "N/A", teacher: "N/A" },
        { period: 5, timeRange: "11:20-12:05", subject: "Algebra", room: "204", teacher: "Fong" },
        { period: 6, timeRange: "12:07-12:53", subject: "Biology", room: "156", teacher: "Delaney" },
        { period: 7, timeRange: "12:55-1:41", subject: "History", room: "125", teacher: "Caviris" },
        { period: 8, timeRange: "1:43-2:30", subject: "Spanish", room: "126A", teacher: "Varkey" },
    ],
    thursday: [
        { period: 1, timeRange: "8:10-8:56", subject: "Biology", room: "156", teacher: "Delaney" },
        { period: 2, timeRange: "8:58-9:43", subject: "History", room: "125", teacher: "Caviris" },
        { period: 3, timeRange: "9:45-10:30", subject: "Lunch", room: "CAFE", teacher: "Cuchapin" },
        { period: 4, timeRange: "10:32-11:18", subject: "ELA", room: "159", teacher: "Kolansky" },
        { period: 5, timeRange: "11:20-12:05", subject: "Spanish", room: "126A", teacher: "Varkey" },
        { period: 6, timeRange: "12:07-12:53", subject: "Biology", room: "156", teacher: "Delaney" },
        { period: 7, timeRange: "12:55-1:41", subject: "Algebra", room: "204", teacher: "Fong" },
        { period: 8, timeRange: "1:43-2:30", subject: "Talent", room: "N/A", teacher: "N/A" },
    ],
    friday: [
        { period: 1, timeRange: "8:10-8:56", subject: "ELA", room: "159", teacher: "Kolansky" },
        { period: 2, timeRange: "8:58-9:43", subject: "Biology", room: "156", teacher: "Delaney" },
        { period: 3, timeRange: "9:45-10:30", subject: "Lunch", room: "CAFE", teacher: "Cuchapin" },
        { period: 4, timeRange: "10:32-11:18", subject: "Algebra", room: "204", teacher: "Fong" },
        { period: 5, timeRange: "11:20-12:05", subject: "Non-Core Math", room: "N/A", teacher: "N/A" },
        { period: 6, timeRange: "12:07-12:53", subject: "History", room: "125", teacher: "Caviris" },
        { period: 7, timeRange: "12:55-1:41", subject: "Talent", room: "N/A", teacher: "N/A" },
        { period: 8, timeRange: "1:43-2:30", subject: "Spanish", room: "126A", teacher: "Varkey" },
    ],
};
const additionalTeachers = {
    // TODO
};
function getPeriod() {
    // Get current day, ensure that it is monday through friday
    const now = new Date();
    const day = now.getDay();
    if (day === 0 || day === 6) {
        return null;
    }
    // can now continue
    // get current time, ensure that it is between 8:10 am and 2:30 pm
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTimeInMinutes = hour * 60 + minute;
    if (!(currentTimeInMinutes >= 490 && currentTimeInMinutes <= 870)) {
        return null;
    }
    // can now continue
}
