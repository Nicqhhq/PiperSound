const ClientWhatsapp = require('./example.js')
class sendMessage {
    constructor() {
        this.cliente = new ClientWhatsapp()
    }
    enviaMensagem(numero, mensagem) {
        var numero = '11996176182'
        var mensagem = 'Teste envio de mensagens automatico'
        var data = new Date
        if (this.cliente.clientUp == false) {
            console.log("Cliente nao disponivel, tentando novamente em 10 segundos")
            setTimeout(() => {
                this.enviaMensagem(`${numero}`, mensagem)
            }, 10000)
        }
        else {
            console.log("Cliente Disponivel Enviando mensagem")
            this.cliente.client.sendMessage(`55${numero}@c.us`, `Mensagem Automatica  ${mensagem} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`)
        }
    }
}
module.exports = sendMessage;













// cliente.on('ready', () => {
//     console.log('READY');
//     console.log(`Enviando mensagem para ${numero}`)
//     setInterval(() => {
//     }, 3000);
// });