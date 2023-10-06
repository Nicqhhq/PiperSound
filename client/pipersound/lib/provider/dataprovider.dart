import 'package:flutter/material.dart';
import 'package:pipersound/interface/shareddata.dart';

class DataProvider extends ChangeNotifier{
  SharedData _sharedData = SharedData();

  SharedData get sharedData => _sharedData;

  void updateHttpAddres(String httpAddress){
    _sharedData.httpAddress = httpAddress;
    print(_sharedData.httpAddress);
    notifyListeners();
  }
}