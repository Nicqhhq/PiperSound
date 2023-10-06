import 'package:flutter/material.dart';
import 'package:pipersound/homepage.dart';
import 'package:pipersound/provider/dataprovider.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(ChangeNotifierProvider(
    create: (context) => DataProvider(),
    child: const MaterialApp(
            home:  HomePage(),
      ),
    ));
}
