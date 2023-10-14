import 'dart:async';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:pipersound/provider/dataprovider.dart';

playSound(DataProvider dataProvider, context) async {
  try {
    var response = await http.get(
      Uri.parse('http://${dataProvider.sharedData.httpAddress}/v1/pipersound/play'),
      headers: {
        "content-type": "application/json",
      },
    ).timeout(
  const Duration(seconds: 2),
  onTimeout: () {
    return http.Response('Error', 404);
  },
);
    if (response.statusCode == 200) {
       ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        backgroundColor: Colors.green,
        content: Text("🔈 Sucesso em instantes o áudio será tocado 🔈", style: TextStyle(fontSize: 20, fontWeight: FontWeight.w500),)));

    } else if(response.statusCode == 404){
             ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        backgroundColor: Colors.red,
        content: Text("Erro: 🔇 Sem conexão com o servidor. Verifique as configurações e sua rede", style: TextStyle(fontSize: 20, fontWeight: FontWeight.w500),)));

    };
  }
   on SocketException catch (_) {
            print("Erro a rede está indisponível. Verifique sua conexão de rede.");
       ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        backgroundColor: Colors.red,
        content: Text("Erro: Sem conexão com o servidor. Verifique as configurações e sua rede", style: TextStyle(fontSize: 20),)));


  }
}
