const { NodeAudioVolumeMixer } = require("node-audio-volume-mixer");

console.log(`O volume esta em: ${Math.round(NodeAudioVolumeMixer.getMasterVolumeLevelScalar() * 100)}%`)

class Mixer {

    GetVolAudio(req, res) {
        const volAudio = Math.round(NodeAudioVolumeMixer.getMasterVolumeLevelScalar() * 100);
        res.json({ volume: volAudio })
    }
    setVolAudio(req, res) {
        const corpo = req.body;
        const volAudio = corpo['volume']
        console.log(`Volume Alterado para ${volAudio / 100}%`)
        NodeAudioVolumeMixer.setMasterVolumeLevelScalar(volAudio / 100);
        res.sendStatus(200);
    }
    setAppVolAudio(req, res) {
        const corpo = req.body;
        const volAudio = corpo['volume']
        // NodeAudioVolumeMixer.setMasterVolumeLevelScalar(volAudio / 100);
        const sessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
        const session = sessions.find((value) => {
            return value.name === "chrome.exe";
        });
        NodeAudioVolumeMixer.setAudioSessionVolumeLevelScalar(session.pid, volAudio / 100);
        console.log(`Volume do Google alterado para ${volAudio / 100}%`)
        res.sendStatus(200);
    }
}

module.exports = Mixer;