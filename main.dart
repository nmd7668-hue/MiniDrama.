import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() => runApp(const MiniDramaApp());

class MiniDramaApp extends StatelessWidget {
  const MiniDramaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'MiniDrama',
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF09090D),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFFF315E),
          brightness: Brightness.dark,
        ),
      ),
      home: const DramaWebScreen(),
    );
  }
}

class DramaWebScreen extends StatefulWidget {
  const DramaWebScreen({super.key});
  @override
  State<DramaWebScreen> createState() => _DramaWebScreenState();
}

class _DramaWebScreenState extends State<DramaWebScreen> {
  late final WebViewController controller;
  bool loading = true;

  // Publish the web folder, then replace this URL with your real HTTPS URL.
  static const websiteUrl = 'https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/';

  @override
  void initState() {
    super.initState();
    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setNavigationDelegate(NavigationDelegate(
        onPageStarted: (_) => setState(() => loading = true),
        onPageFinished: (_) => setState(() => loading = false),
      ))
      ..loadRequest(Uri.parse(websiteUrl));
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        body: SafeArea(
          child: Stack(children: [
            WebViewWidget(controller: controller),
            if (loading)
              const Center(
                child: CircularProgressIndicator(color: Color(0xFFFF315E)),
              ),
          ]),
        ),
      );
}
