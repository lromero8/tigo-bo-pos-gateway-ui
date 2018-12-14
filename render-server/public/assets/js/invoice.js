var decodedJson = decodeURIComponent("{{{qrString}}}");
      ///var jsonObj = JSON.parse(decodedJson);
      //var qrcode = new QRCode(document.getElementById("qrcode"), {
       // width : 50,
       // height : 50,
       // correctLevel : QRCode.CorrectLevel.H
      //});
      //qrString
     // qrcode.makeCode(decodedJson);
var qrcode = new QRCode({
        content: decodedJson,
        width: 100,
        height: 100
});

var svg = qrcode.svg();
document.getElementById("qrcode").innerHTML = svg;
