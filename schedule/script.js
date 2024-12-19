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