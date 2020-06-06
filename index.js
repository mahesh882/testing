var request = require("request");
var FormData = require("form-data");
var fs = require("fs");
var cron = require("node-cron");
const screenshot = require("screenshot-desktop");
const timestamp = require("time-stamp");

var log = 0;
cron.schedule("* * * * *", () => {
    log = log + 1;
    console.log("----------->");
    /*  screenshot({ filename: "Update" + log + ".jpg" }).then((imgPath) => {
        var data = {
            file: fs.createReadStream(imgPath),
        };
        request.post({
                url: "http://projects.sparkleinfotech.com/nodeLog/updatelog.php",
                formData: data,
            },
            function callback(err, response, body) {
                if (err) {
                    return console.error("Failed to upload:", err);
                }
                console.log("Upload successful!");
            }
        );
    });
*/
    var options = {
        method: "POST",
        url: "http://projects.sparkleinfotech.com/nodeLog/updatelog.php",
        headers: {
            "cache-control": "no-cache",
            "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        },
        formData: { log: "Update" + log },
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
});

var http = require("http");

//create a server object:
http
    .createServer(function(req, res) {
        res.write("Hello World!"); //write a response to the client
        res.end(); //end the response
    })
    .listen(process.env.PORT);