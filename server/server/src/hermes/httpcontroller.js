const request = require('request');
const url = require('url.js')
class Hermes {
    async enviaMensagem(numero, mensagem) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: url.url + `/v1/hermesapi/enviamenssager?numero=${numero}&mensagem=${mensagem}`,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json'
                },
                json: true
            };
            request(options, (error, response, body) => {
                if (error) {
                    this.enviaMensagem(numero, mensagem).then(resolve(
                        'Envio de mensagem concluido'
                    )).catch(reject());
                }
                else {
                    console.log(apikeyunidade)
                    switch (response.statusCode) {
                        case 200:
                            resolve('Mensagem Enviada')
                            break;
                        case 400:
                            reject('erro ao enviar mensagem')
                    }
                }
            }
            )
        })
    }
}

module.exports = Hermes;