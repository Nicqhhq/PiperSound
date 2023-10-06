const { NodeAudioVolumeMixer } = require("node-audio-volume-mixer");
const player = require('play-sound')();
console.log(`O volume esta em: ${Math.round(NodeAudioVolumeMixer.getMasterVolumeLevelScalar() * 100)}%`)

class Mixer {

    GetVolAudio(req, res) {
        const volAudio = Math.round(NodeAudioVolumeMixer.getMasterVolumeLevelScalar() * 100);
        res.json({ volume: volAudio })
    }
    setVolAudio(req, res) {
        const corpo = req.body;
        const volAudio = corpo['volume']
        console.log(corpo)
        console.log(volAudio)
        console.log(typeof (volAudio))
        console.log(`Volume Alterado para ${volAudio / 100}%`)
        NodeAudioVolumeMixer.setMasterVolumeLevelScalar(volAudio / 100);
        res.sendStatus(200);
    }
    setAppVolAudio(req, res) {
        const corpo = req.body;
        const volAudio = corpo['volume']
        const sessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
        const session = sessions.find((value) => {
            return value.name === "chrome.exe";
        });
        NodeAudioVolumeMixer.setAudioSessionVolumeLevelScalar(session.pid, volAudio / 100);
        console.log(`Volume do Google alterado para ${volAudio / 100}%`)
        res.sendStatus(200);
    }
    playAudio(req, res) {
        this.setAppVolAudioTrue(0.1)
        const audioFile = '../../vinheta.mp3';
        player.play(audioFile, (err) => {
            if (err) {
                console.error(`Erro ao reproduzir o áudio: ${err}`);
            } else {
                console.log('Áudio reproduzido com sucesso!');
                res.sendStatus(200)
                setTimeout(() => {
                    this.setAppVolAudioTrue(0.7)
                }, 7000);
            }
        });
    }
    setAppVolAudioTrue(volume) {
        const sessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
        const session = sessions.find((value) => {
            return value.name === "chrome.exe";
        });
        NodeAudioVolumeMixer.setAudioSessionVolumeLevelScalar(session.pid, volume);
        console.log(`Volume do Google alterado para 10%`)
    }
}

module.exports = Mixer;