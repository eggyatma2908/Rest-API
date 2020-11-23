# Rest-API

Tugas Week 4 Zwallet-API

REST API ini dibangun menggunakan Node JS dan menggunakan MVC Arsitektur.

MVC Arsitektur :

MVC adalah konsep arsitektur dalam pembangunan aplikasi berbasis web yang membagi aplikasi web menjadi 4 bagian besar. Yang mana setiap bagian memiliki tugas-tugas serta tanggung jawab masing-masing. Tiga bagian tersebut adalah: router, controler, model dan view.

- Router berisi logic untuk request method
- Controller: Bertugas untuk mengatur apa yang harus dilakukan model, dan view mana yang harus ditampilkan berdasarkan permintaan dari user. Namun, terkadang permintaan dari user tidak selalu memerlukan aksi dari model. Misalnya seperti menampilkan halaman form untuk registrasi user.
- Model: Bertugas untuk mengatur, menyiapkan, memanipulasi dan mengorganisasikan data (dari database) sesuai dengan instruksi dari controller.
- View: Bertugas untuk menyajikan informasi (yang mudah dimengerti) kepada user sesuai dengan instruksi dari controller.

Package Installed :
- Body-Parser
- Cors
- Dotenv
- Express
- Morgan
- Mysql
- Mysql2
- Nodemon
