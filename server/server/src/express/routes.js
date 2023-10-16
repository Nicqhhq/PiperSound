const path = require('path')
const express = require('express');
const router = express.Router();
const Api = require(path.join(__dirname, '..', 'api', 'mixer.js'));
const api = new Api();

router.post('/v1/pipersound/play', (req, res) => {
    api.playAudio(req, res);
})
router.post('/v1/pipersound/setvolume', (req, res) => {
    api.setVolAudio(req, res)
})

router.post('/v1/pipersound/setAppvolume', (req, res) => {
    api.setAppVolAudio(req, res)
})


module.exports = router