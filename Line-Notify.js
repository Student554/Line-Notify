function myFunction() {
    var calenda = CalendarApp.getCalendarById("xxx");
    var token = "xxx"; // Line Token 
    var url = "https://notify-api.line.me/api/notify";
  
    var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    var event = calenda.getEventsForDay(today);
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
      var start = event.getStartTime().getHours() + ":" + ("0" + event.getStartTime().getMinutes()).slice(-2);
      var end = event.getEndTime().getHours() + ":" + ("0" + event.getEndTime().getMinutes()).slice(-2);
      if (event.isAllDayEvent()) {
        msg += String(index + 1) + ") " + "เวลา : " + " ทั้งวัน" + "\n 🔥เรื่อง : " + title + "\n\n";
        return;
      }
      msg += String(index + 1) + ") " + "เวลา : " + start + " - " + end + " น." + "\n🔥เรื่อง : " + title + "\n\n";
    });
    return msg;
  }