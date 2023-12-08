const { NodeAudioVolumeMixer } = require("node-audio-volume-mixer");
const path = require('path')
const player = require('play-sound')();
console.log(`O volume esta em: ${Math.round(NodeAudioVolumeMixer.getMasterVolumeLevelScalar() * 100)}%`)
const appName = require('./app.js')
const Hermes = require('../hermes/httpcontroller');
const hermes = new Hermes()
const log = require(path.join(__dirname, '..', 'log', 'gravalog.js'))
let ultimoTocouAudioEm = null;
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
            return value.name === appName.appName;
        });
        NodeAudioVolumeMixer.setAudioSessionVolumeLevelScalar(session.pid, volAudio / 100);
        console.log(`Volume do Zara Audio alterado para ${volAudio / 100}%`)
        res.sendStatus(200);
    }
    playAudio(req, res) {
        const now = new Date();
        if (ultimoTocouAudioEm) {
            const diffEmMinutos = (now - ultimoTocouAudioEm) / 60000; 
            if (diffEmMinutos < 2) {
                return res.sendStatus(204);
            }
        }
        const corpo = req.body
        var numero;
        var nome;
        console.log(corpo['unidade'])
        switch (corpo['unidade']) {
            case '1':
                // numero = '11961776581'
                nome = 'Alenicio'
                numero = '11999992978'
                break;
            case '2':
                // numero = '11933128640'
                nome = 'Ercilio'
                numero = '11996971537'
                break;
            case '4':
                // numero = '11961776581'
                nome = 'Daniela'
                numero = '11943812780'
                break;
            case '5':
                // numero = '11969060335'
                nome = 'Odair'
                numero = '11984027782'
                break;
            case '6':
                // numero = '11961776581'
                nome = 'Laura'
                numero = '11997486268'
                break;
            case '7':
                nome = 'Rodrigo'
                // numero = '11961776581'
                numero = '11995506300'
                break;
            case '100':
                nome = 'Nicolas'
                numero = '11961776581'
                break;

        }
        console.log(numero);
        hermes.enviaMensagem(numero, nome).then((_) => { console.log(_) }).catch((_) => { console.log(_) })
        this.setAppVolAudioTrue(0.1)
        const audioFile = path.join(__dirname, '..', '..', 'vinheta.mp3');
        player.play(audioFile, (err) => {
            if (err) {
                console.error(`Erro ao reproduzir o áudio: ${err}`);
                res.sendStatus(400)
 			setTimeout(() => {
                log.gravaLog("erro ao reproduzir audio")
                    this.setAppVolAudioTrue(1.0)
                }, 33000);
            } else {
                console.log('Áudio reproduzido com sucesso!');
		ultimoTocouAudioEm = now;
                res.sendStatus(200)
                log.gravaLog("Audio Reproduzido com sucesso")
                setTimeout(() => {
                    this.setAppVolAudioTrue(1.0)
                }, 33000);
            }
        });
    }
    setAppVolAudioTrue(volume) {
        const sessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
        const session = sessions.find((value) => {
            return value.name === appName.appName;
        });
        NodeAudioVolumeMixer.setAudioSessionVolumeLevelScalar(session.pid, volume);
        console.log(`Volume do ${appName.appName} alterado para ${volume}%`)
        log.gravaLog(`Volume do ${appName.appName} alterado para ${volume}%`)
    }
}

module.exports = Mixer;


