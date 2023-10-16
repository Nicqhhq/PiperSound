import 'dart:async';
import 'package:pipersound/provider/dataprovider.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/material.dart';
import 'package:nice_buttons/nice_buttons.dart';
import 'package:pipersound/functions/playsound.dart';
import 'package:pipersound/widgets/appbarcustom.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}
    
  Future<String> getServerAddress(context, DataProvider dataProvider) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    final httpAddress = prefs.getString('httpAddress') ?? '';
    dataProvider.updateHttpAddres(httpAddress);
    return dataProvider.sharedData.httpAddress;
  }
  setServerAddress(context, DataProvider dataProvider, endereco) async {
    print(endereco);
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString('httpAddress', await endereco);
    dataProvider.updateHttpAddres(await endereco);
  }


class _HomePageState extends State<HomePage> {
  @override
    initState() {
      super.initState();
    final dataProvider = Provider.of<DataProvider>(context, listen: false);
    setServerAddress(context, dataProvider, getServerAddress(context, dataProvider));
  print('valor ${dataProvider.sharedData.httpAddress}');
    }
  @override
  Widget build(BuildContext context) {
    final dataProvider = Provider.of<DataProvider>(context);
    print('valor ${dataProvider.sharedData.httpAddress}');
    var heightTop = MediaQuery.of(context).viewPadding.top + AppBarCustom(context: context, dataProvider: dataProvider).preferredSize.height;
    final TextEditingController controller = TextEditingController();
    controller.text = dataProvider.sharedData.httpAddress;
    return Scaffold(
      appBar: AppBarCustom(context: context, dataProvider: dataProvider,),
      body: Column(
        children: [
           Stack(
                alignment: AlignmentDirectional.center,
                children: [
                  Container(
                    height: MediaQuery.of(context).size.height - heightTop,
                    width: MediaQuery.of(context).size.width,
                    decoration: BoxDecoration(
                     image: DecorationImage(
                        image: AssetImage(
                            'lib/assets/images/background_bread.jpg'),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  Column(
                    children: [
                      Container(
                        height: MediaQuery.of(context).size.height * 0.09,
                        width: MediaQuery.of(context).size.width * 0.7,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment(0.8, 1),
                          colors: <Color>[
                            Colors.green,
                            Colors.yellow.shade400,
                          ], // Gradient from https://learnui.design/tools/gradient-generator.html
                          tileMode: TileMode.mirror,
                        ),
                        ),
                        child: Center(child: Text("Pão Fresco", style: TextStyle(color: Colors.white, fontSize: 40, fontWeight: FontWeight.w600),))),
                      SizedBox(
                        height: 20,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          NiceButtons(
                            height: MediaQuery.of(context).size.height * 0.3,
                            width: MediaQuery.of(context).size.width * 0.7,
                            startColor: Colors.green,
                            endColor: Colors.yellow.shade400,
                            borderColor: Colors.green.shade900,
                            borderRadius: 200,
                            stretch: false,
                            progress: false,
                            gradientOrientation: GradientOrientation.Horizontal,
                            onTap: (finish) {
                              playSound(dataProvider, context, dataProvider.sharedData.unidade);
                              },
                              child: Text(
                                'Tocar Som',
                                style: TextStyle(color: Colors.white, fontSize: 35, fontWeight: FontWeight.w600),
                              ),
                            ),
                        ],
                      )
                    ],
                  )
                ],
          )
        ],
      ),
    );
  }
}