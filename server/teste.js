import('audic').then((Audic) => {
    Audic.playAudioFile('vinheta.mp3')
  }).catch((error) => {
    // Lidar com erros
  });