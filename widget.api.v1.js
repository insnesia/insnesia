function SAPrayerApi() {
    var userLang = navigator.language || navigator.userLanguage;
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var prayer_results = JSON.parse(request.responseText);
                var local_offset = prayer_results.data.meta.local_offset;
                document.getElementById("kuto").innerHTML = prayer_results.data.meta.timezone;
                document.getElementById("prayer_date").innerHTML = prayer_results.data.date.readable;
                document.getElementById("hari").innerHTML = prayer_results.data.date.hijri.day;
                document.getElementById("bulan").innerHTML = prayer_results.data.date.hijri.month.en;
                document.getElementById("hijr").innerHTML = prayer_results.data.date.hijri.year;
                document.getElementById("Imsak").innerHTML = prayer_results.data.timings.Imsak;
                document.getElementById("Terbit").innerHTML = prayer_results.data.timings.Sunrise;
                document.getElementById("Fajr").innerHTML = prayer_results.data.timings.Fajr;
                document.getElementById("Dhuhr").innerHTML = prayer_results.data.timings.Dhuhr;
                document.getElementById("Asr").innerHTML = prayer_results.data.timings.Asr;
                document.getElementById("Sunset").innerHTML = prayer_results.data.timings.Sunset;
                document.getElementById("Maghrib").innerHTML = prayer_results.data.timings.Maghrib;
                document.getElementById("Isha").innerHTML = prayer_results.data.timings.Isha;
                document.getElementById("Bengi").innerHTML = prayer_results.data.timings.Midnight;
                SetTheClock(local_offset);
            } else {
                console.log('An error occurred during your request: ' + request.status + ' ' + request.statusText);
            }
        }
    };
    request.open('Get', api_url, true);
    request.send();
}
function time(offset) {
    var location_date = new Date(new Date().getTime() + offset * 3600000);
    var hours = location_date.getUTCHours(),
        minutes = location_date.getUTCMinutes(),
        seconds = location_date.getUTCSeconds();
    hours = addZero(hours);
    minutes = addZero(minutes);
    seconds = addZero(seconds);
    document.getElementById("prayer_clock").innerHTML = hours + ':' + minutes + ':' + seconds;
}
function addZero(val) {
    return val <= 9 ? "0" + val : val;
}
function SetTheClock(local_offset) {
    time(7);
    setInterval(function () { time(7); }, 1000);
}