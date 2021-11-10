const { datatype } = require('mxtorie')

module.exports = {
    settings: [{
        name: 'serverid',
        type: datatype.VARCHAR,
        length: 18,
    }, {
        name: 'prefix',
        type: datatype.VARCHAR,
        length: 50
    }],
    channels: [{
        name: 'serverid',
        type: datatype.VARCHAR,
        length: 18
    }, {
        name: 'startlogs',
        type: datatype.VARCHAR,
        length: 50
    }]
} /*This is the model of your database, if you want to add a column you need to add it here, don't forget to add it in your save file too.*/ 