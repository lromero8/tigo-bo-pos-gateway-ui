const uuidv1 = require('uuid/v1');
const mimeTypes = ["application/pdf", 
                   "text/plain", 
                   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
                   "application/vnd.ms-excel", 
                   "text/csv", 
                   "application/xml", 
                   "application/octet-stream"
                ]


module.exports.attchCntnt = (res, format, fileName) => {
    var fileNameForDownload = fileName.toString().concat(uuidv1(), '.', format);
    res.setHeader("Content-Disposition", `attachment; filename="${ fileNameForDownload }"`);
    res.setHeader("content-type", 
                 (format == 'pdf')  ? mimeTypes[0] : 
                 (format == 'txt')  ? mimeTypes[1] : 
                 (format == 'xlsx') ? mimeTypes[2] :
                 (format == 'xls')  ? mimeTypes[3] : 
                 (format == 'csv')  ? mimeTypes[4] : 
                 (format == 'xml')  ? mimeTypes[5] : mimeTypes[6]
    );
}
