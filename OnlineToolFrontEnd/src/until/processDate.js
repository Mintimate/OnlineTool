export function DateDifference(faultDate, completeTime) {
    // let d1 = new Date(faultDate);
    // let d2 = new Date(completeTime);
    var stime = new Date(faultDate).getTime();
    var etime = new Date(completeTime).getTime();
    var usedTime = etime - stime;  //两个时间戳相差的毫秒数
    var days = Math.floor(usedTime / (24 * 3600 * 1000));
    //计算出小时数
    var leave1 = usedTime % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    // var time = days + "天"+hours+"时"+minutes+"分";
    var time = days;
    return time;
}
export function addDate(startTime,days){
    let stime = new Date(startTime).getTime();
    let endTime =stime+days*(24 * 3600 * 1000);  //两个时间戳相差的毫秒数
    let time=new Date(endTime).Format("yyyy-MM-dd");
    return time
}
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
