# Flutter Android wrapper setup

এই Android অংশটি আপনার প্রকাশিত MiniDrama Website-কে Android অ্যাপের WebView-তে দেখায়। তাই Website আগে HTTPS-এ publish করতে হবে।

1. Flutter project তৈরি করুন: `flutter create minidrama`
2. তৈরি হওয়া project-এর `pubspec.yaml` ও `lib/main.dart`-কে এই ZIP-এর `android` ফোল্ডারের ফাইল দিয়ে প্রতিস্থাপন করুন।
3. `lib/main.dart`-এ `websiteUrl`-এ নিজের GitHub Pages URL দিন।
4. AndroidManifest-এ internet permission নিশ্চিত করুন:
   `<uses-permission android:name="android.permission.INTERNET" />`
5. `flutter pub get`
6. `flutter build apk --release`

WebView wrapper হওয়ায় native push notification, offline download, DRM বা advanced background playback এতে স্বয়ংক্রিয়ভাবে নেই। সেগুলো আলাদা করে তৈরি করতে হবে।
