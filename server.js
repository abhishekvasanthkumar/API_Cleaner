/**
 * Created by Abhishek A V Kuamr on 8/5/18.
 * API_Cleaner - Take home coding assignment
 */
let express     = require('express');
let bodyP       = require('body-parser');
let http        = require('https');
let url         = 'gmapi.azurewebsites.net';

let app = express();

app.set('json spaces', 4);
app.use(bodyP.urlencoded({extended: true}));
app.use(bodyP.json());


let port = process.env.PORT || 4800;

async function getBackendResponse(vehicalInfo, service) {
    let serviceCall;
    switch (service) {
        case 'doors':
            serviceCall = '/getSecurityStatusService';
            break;
        case 'fuel':
            serviceCall = '/getEnergyService';
            break;
        case 'battery':
            serviceCall = '/getEnergyService';
            break;
        case 'engine':
            serviceCall = '/actionEngineService';
            break;
        default:
            serviceCall = '/getVehicleInfoService';
    }


    // Build the post string from an object
    let post_data = {
        "id": vehicalInfo.id,
        "responseType": "JSON"
    };

    if (service == 'engine') {
        post_data['command'] = vehicalInfo.command;
    }

    post_data = JSON.stringify(post_data);

    // An object of options to indicate where to post to
    let post_options = {
        host: url,
        path: serviceCall,
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    };
    let returningPromise = await new Promise(function (resolve, reject) {
        const requ = http.request(post_options, (res) => {
            res.on('data', (chunk) => {
                resolve(JSON.parse(chunk));
            });
        });
        requ.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });

        // write data to request body
        requ.write(post_data);
        requ.end();
    });


    return returningPromise;
};

app.get('/',function (req,res) {
    res.json({message: "Welcome to SmartCar cleaning API. :D"})
});

app.get('/vehicles/:id', function (req, response) {
    let result = {};
    getBackendResponse({id: req.params.id}).then(function (response_data) {
        result['vin'] = response_data['data']['vin']['value'];
        result['color'] = response_data['data']['color']['value'];

        if(response_data['data']['fourDoorSedan']['value'] == 'True') {
            result['doorCount'] = 4;
        } else {
            result['doorCount'] = 2;
        }
        result['driveTrain'] = response_data['data']['driveTrain']['value'];

        response.json(result);
    });
});

app.get('/vehicles/:id/doors', function (req, res) {
    let result = {};
    getBackendResponse({id: req.params.id}, 'doors').then(function (response_data) {
        response_data['data']['doors']['values'].map(function (door) {
            result[door['location']['value']] = JSON.parse(door['locked']['value'].toLowerCase());
        });

        res.json(result);
    });
});

app.get('/vehicles/:id/fuel', function (req, res) {
    getBackendResponse({id: req.params.id}, 'fuel').then(function (response_data) {
        res.json({percent: JSON.parse(response_data['data']['tankLevel']['value'])});
    })
});

app.get('/vehicles/:id/battery', function (req, res) {
    getBackendResponse({id: req.params.id}, 'battery').then(function (response_data) {
        res.json({percent: JSON.parse(response_data['data']['batteryLevel']['value'])});
    })
});

app.post('/vehicles/:id/engine', function (req, res) {
    let parsedCommand;
    if (req.body.action == 'START') {
        parsedCommand = 'START_VEHICLE';
    } else {
        parsedCommand = 'STOP_VEHICLE';
    }
    getBackendResponse({id: req.params.id, command: parsedCommand}, 'engine').then(function (response_data) {
        let resultCommand = response_data['actionResult']['status'];
        if (resultCommand == 'EXECUTED') {
            resultCommand = 'success';
        } else {
            resultCommand = 'error';
        }
        res.json({status: resultCommand});
    })
});

app.listen(port,function () {
    console.log("Node instance is running on "+port);
});
