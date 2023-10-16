import 'package:flutter/material.dart';
import 'package:pipersound/homepage.dart';
import 'package:pipersound/provider/dataprovider.dart';
import 'package:provider/provider.dart';

class AppBarCustom extends StatefulWidget  implements PreferredSizeWidget {
  const AppBarCustom({super.key, required this.context, required this.dataProvider});
 @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
  final BuildContext context;
  final DataProvider dataProvider;

  @override
  State<AppBarCustom> createState() => _AppBarCustomState();
}

class _AppBarCustomState extends State<AppBarCustom> {
static const List<String> list = <String>['1', '2', '4', '5', '6', '7', '100'];
  @override
  Widget build(BuildContext context) {
  String dropdownValue = widget.dataProvider.sharedData.unidade == '' ? list.first : widget.dataProvider.sharedData.unidade;
  final dataProvider = Provider.of<DataProvider>(context);
  TextEditingController controller = TextEditingController();
  controller.text = dataProvider.sharedData.httpAddress;
  return AppBar(
    title: Text("PiperSound - Padaria", style: TextStyle(fontWeight: FontWeight.w700),),
    backgroundColor: Colors.black,
    actions: [
      IconButton(onPressed: (){
        showDialog(context: context, builder:(context) {
          return StatefulBuilder(
            builder: (context, setState) {
              return AlertDialog(
                title: Text('Configurações'),
                content: Container(
                  height: MediaQuery.of(context).size.height * 0.19,
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
                        Row(
                          children: [
                            Text("Unidade"),
                            SizedBox(width: 20,),
                            DropdownButton(
                              value: dropdownValue,
                              items:  list.map<DropdownMenuItem<String>>((String value) {
                                  return DropdownMenuItem<String>(
                                    value: value,
                                    child: Text(value),
                                  );
                                }).toList(),
                                  onChanged: ((value) => {
                                    setState(() {
                                    dropdownValue = value!;
                                   dataProvider.updateUnidade(value);
                                  })
                              }),
                            ),
                          ],
                        ),
                        Container(
                          width: 200,
                          decoration: BoxDecoration(gradient: LinearGradient(colors: <Color>[
                            Colors.green,
                            Colors.yellow.shade400,
                          ],),
                          borderRadius: BorderRadius.circular(10)
                          ),
                          child: TextButton(
                            child: Text("Salvar", style: TextStyle(color: Colors.white),),
                            onPressed: (){
                              setServerAddress(context, dataProvider, controller.text);
                              Navigator.of(context).pop();
                              ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                                backgroundColor: Colors.green,
                                content: Center(child: Text("Configuração Salva", style: TextStyle(fontSize: 20, fontWeight: FontWeight.w500),))));
                            }),
                        )
                     ]
                    ),
                  ),
                );
            }
          );
          },
        );
      }, icon: Icon(Icons.settings))
    ],
  );
  
  }

}




// AppBar appbarCustom(context, DataProvider dataProvider){
//   final dataProvider = Provider.of<DataProvider>(context);
//   TextEditingController controller = TextEditingController();
//   controller.text = dataProvider.sharedData.httpAddress;
// const List<String> list = <String>['1', '2', '4', '5', '6', '7', '100'];
//   return AppBar(
//     title: Text("PiperSound - Padaria", style: TextStyle(fontWeight: FontWeight.w700),),
//     backgroundColor: Colors.black,
//     actions: [
//       IconButton(onPressed: (){
//         showDialog(context: context, builder:(context) {
//           return AlertDialog(
//             title: Text('Configurações'),
//             content: Container(
//               height: MediaQuery.of(context).size.height * 0.19,
//               width:  MediaQuery.of(context).size.width * 0.4,
//               child: Column(
//                   children: [
//                     TextFormField(
//                       controller: controller,
//                       decoration: InputDecoration(
//                         labelText: 'Endereço Servidor Porta',
//                         prefix: Text('http://')
//                       ),
//                     ),
//                     Row(
//                       children: [
//                         Text("Unidade"),
//                         SizedBox(width: 20,),
//                         DropdownButton(
//                           value: list.first,
//                           items:  list.map<DropdownMenuItem<String>>((String value) {
//                               return DropdownMenuItem<String>(
//                                 value: value,
//                                 child: Text(value),
//                               );
//                             }).toList(),
//                           onChanged: ((value) => {
//                             setState(() {
//                               dropdownValue = value!;
//                             })
//                           }),
//                         ),
//                       ],
//                     ),
//                     TextButton(
//                       child: Text("Salvar"),
//                       onPressed: (){
//                         setServerAddress(context, dataProvider, controller.text);
//                         Navigator.of(context).pop();
//                         ScaffoldMessenger.of(context).showSnackBar(SnackBar(
//                           backgroundColor: Colors.green,
//                           content: Center(child: Text("Configuração Salva", style: TextStyle(fontSize: 20, fontWeight: FontWeight.w500),))));
//                       })
//                  ]
//                 ),
//               ),
//             );
//           },
//         );
//       }, icon: Icon(Icons.settings))
//     ],
//   );
// }