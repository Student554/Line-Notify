function lineNotify() {
  var calendar = CalendarApp.getCalendarById("...");//ID Calendar
  var token = "..."; // Line Token 
  var url = "https://notify-api.line.me/api/notify";//Line Notify API

  var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  var event = calendar.getEventsForDay(today);
  var msg = "";
  if (event.length === 0) {
    msg = "วันนี้ไม่มีกิจกรรม";
  }
  else {
    msg += "📣📣วันนี้มีทั้งหมด " + String(event.length) + " กิจกรรม ได้แก่\n\n";
    msg += sendMessage(event);
  }
  var jsonData = {
    message: msg
  }
  var options =
  {
    "method": "post",
    "contentType": "application/x-www-form-urlencoded",
    "payload": jsonData,
    "headers": { "Authorization": "Bearer " + token }
  };
  var res = UrlFetchApp.fetch(url, options);
}

function sendMessage(events) {
  var msg = "";
  events.forEach(function (event, index) {
    var title = event.getTitle();
    var des = event.getDescription();
    var lo = event.getLocation();
    var start = event.getStartTime().getHours() + ":" + ("0" + event.getStartTime().getMinutes()).slice(-2);
    var end = event.getEndTime().getHours() + ":" + ("0" + event.getEndTime().getMinutes()).slice(-2);
    if (event.isAllDayEvent()) {
      msg += String(index + 1) + ") " + "เวลา : " + " ทั้งวัน" + "\n 🔥เรื่อง : " + title + "\n📍สถานที่ : "+lo+"\n👉 รายละเอียด : "+des+ "\n\n";
    }
    msg += String(index + 1) + ") " + "เวลา : " + start + " - " + end + " น." + "\n🔥เรื่อง : " + title +"\n📍สถานที่ : "+ lo +"\n👉 รายละเอียด : "+des+"\n\n";
  });
  return msg;
}