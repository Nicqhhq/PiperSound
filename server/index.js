const path = require('path');
const Express = require(path.join(__dirname, 'src', 'express', 'express.js'));
const express = new Express()
express.start()