// const { NodeAudioVolumeMixer } = require("node-audio-volume-mixer");
// const player = require('play-sound')();
// console.log(`O volume esta em: ${Math.round(NodeAudioVolumeMixer.getMasterVolumeLevelScalar() * 100)}%`)
const Hermes = require('../hermes/httpcontroller');
const hermes = new Hermes()
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
            return value.name === "ZaraRadio.exe";
        });
        NodeAudioVolumeMixer.setAudioSessionVolumeLevelScalar(session.pid, volAudio / 100);
        console.log(`Volume do Zara Audio alterado para ${volAudio / 100}%`)
        res.sendStatus(200);
    }
    playAudio(req, res) {
        const corpo = req.body
        var numero;
        console.log(corpo['unidade'])
        switch (corpo['unidade']) {
            case '1':
                numero = '11961776581'
                // numero = '11999992978'
                break;
            case '2':
                numero = '11961776581'
                // numero = '11996971537'
                break;
            case '4':
                numero = '11961776581'
                // numero = '11943812780'
                break;
            case '5':
                numero = '11961776581'
                // numero = '11984027782'
                break;
            case '6':
                numero = '11961776581'
                // numero = '11997486268'
                break;
            case '7':
                numero = '11961776581'
                // numero = '11995506300'
                break;
            case '100':
                break;
            default:
                break;
        }
        console.log(numero)
        res.sendStatus(200)
        hermes.enviaMensagem(numero, `Mensagem teste`)
        // this.setAppVolAudioTrue(0.1)
        // const audioFile = '../../vinheta.mp3';
        // player.play(audioFile, (err) => {
        //     if (err) {
        //         console.error(`Erro ao reproduzir o áudio: ${err}`);
        //     } else {
        //         console.log('Áudio reproduzido com sucesso!');
        //         res.sendStatus(200)
        //         setTimeout(() => {
        //             this.setAppVolAudioTrue(1.0)
        //         }, 33000);
        //     }
        // });
    }
    setAppVolAudioTrue(volume) {
        const sessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
        const session = sessions.find((value) => {
            return value.name === "ZaraRadio.exe";
        });
        NodeAudioVolumeMixer.setAudioSessionVolumeLevelScalar(session.pid, volume);
        console.log(`Volume do Google alterado para 10%`)
    }
}

module.exports = Mixer;