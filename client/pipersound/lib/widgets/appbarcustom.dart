import 'package:flutter/material.dart';
import 'package:pipersound/homepage.dart';
import 'package:pipersound/provider/dataprovider.dart';
import 'package:provider/provider.dart';
AppBar appbarCustom(context, DataProvider dataProvider){
  final dataProvider = Provider.of<DataProvider>(context);
  TextEditingController controller = TextEditingController();
  controller.text = dataProvider.sharedData.httpAddress;
  return AppBar(
    title: Text("PiperSound - Padaria", style: TextStyle(fontWeight: FontWeight.w700),),
    backgroundColor: Colors.black,
    actions: [
      IconButton(onPressed: (){
        showDialog(context: context, builder:(context) {
          return AlertDialog(
            title: Text('Configurações'),
            content: Container(
              height: MediaQuery.of(context).size.height * 0.13,
              width:  MediaQuery.of(context).size.width * 0.4,
              child: Column(
                  children: [
                    TextFormField(
                      controller: controller,
                      decoration: InputDecoration(
                        labelText: 'Endereço Servidor Porta',
                        prefix: Text('http://')
                      ),
                    ),
                    TextButton(
                      child: Text("Salvar"),
                      onPressed: (){
                        setServerAddress(context, dataProvider, controller.text);
                        Navigator.of(context).pop();
                        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                          backgroundColor: Colors.green,
                          content: Center(child: Text("Configuração Salva", style: TextStyle(fontSize: 20, fontWeight: FontWeight.w500),))));
                      })
                 ]
                ),
              ),
            );
          },
        );
      }, icon: Icon(Icons.settings))
    ],
  );
}