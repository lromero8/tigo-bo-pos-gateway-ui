const express = require('express');
const router = express.Router();
const Handlebars = require('handlebars');
const pdf = require('html-pdf');
const path = require('path');
const fs = require('fs')
const util = require('../util/attachments')

/**
 * 
 */
router.post('/pdf', (req, res, next) => {
    var fileName = 'document'
    var dirPath = path.join(__dirname, '../public/');
    var body = req.body;

    var data = {
        documentTitle: body.documentTitle,
        title: fileName,
        headers: body.headers,
        rows: body.rows,
        columnNames: body.columnNames,
        dirPath: dirPath,
        client: {
            creationDate: body.creationDate,
            transactionId: body.transactionId
        },
        company : res.locals.company
    };

    var file     = 'document.hbs'
    var source   = fs.readFileSync(path.join(__dirname, '../views/templates/'.concat(file)), 'utf8');
    var options  = { 
                    format: 'Letter', 
                    border: { top: '5mm' },
                    orientation: 'landscape',
                    footer: {
                        height: "10mm",
                        contents: {
                                default: `<div style="text-align: center; padding-top: 10px;">${ res.locals.company.copy }</div>`, 
                            }
                        } 
                    };
    Handlebars.registerHelper("increment", (value, options) => {
        return parseInt(value) + 1;
    });
    
    Handlebars.registerHelper("removeUnderScore", (str) => {
        return str.replace(/_/g,' ');
    });    

    var template = Handlebars.compile(source);
    var result   = template(data);
  
    pdf.create(result, options).toBuffer((err, buffer) => {

        if (!err) {

            util.attchCntnt(res, 'pdf', "document-")
            res.send(buffer);

        } else {
            
            res.json({
                status: "Error",
                message: "Failed".concat(err)
         
            });
        }
    });
});


module.exports = router;
