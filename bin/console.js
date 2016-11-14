#!/usr/bin/env node

'use strict';

const argv = process.argv;
const argvLast = argv.slice().pop();

switch (argvLast) {
case '-v':
    version();
    break;

case '--v':
    version();
    break;

default:
    start();
}

function start() {
    const DIR = __dirname + '/../';
    
    const webconsole  = require('../');
    const http = require('http');
    
    const express = require('express');
    const mollify = require('mollify');
     
    const app = express();
    const server = http.createServer(app);
    
    const port =    process.env.PORT            ||  /* c9           */
                    process.env.app_port        ||  /* nodester     */
                    process.env.VCAP_APP_PORT   ||  /* cloudfoundry */
                    1337;
    
    const ip = process.env.IP ||  /* c9 */
              '0.0.0.0';
    
    app .use(webconsole({
            server: server,
            online: false,
            minify: false
        }))
        .use(mollify({
            dir: DIR
        }))
        .use(express.static(DIR));
    
    server.listen(port, ip);
    
    console.log('url: http://' + ip + ':' + port);
}

function version() {
    const pack = require('../package');
    
    console.log('v' + pack.version);
}
