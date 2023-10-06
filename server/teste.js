const player = require('play-sound')();

// Substitua 'caminho/para/seu/arquivo_de_audio.mp3' pelo caminho real do seu arquivo de áudio.
const audioFile = './vinheta.mp3';

player.play(audioFile, (err) => {
    if (err) {
        console.error(`Erro ao reproduzir o áudio: ${err}`);
    } else {
        console.log('Áudio reproduzido com sucesso!');
    }
});