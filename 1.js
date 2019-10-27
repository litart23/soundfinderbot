const TelegramBot = require('node-telegram-bot-api');
//const Agent = require('socks5-https-client/lib/Agent');
var YoutubeMp3Downloader = require("youtube-mp3-downloader");
// replace the value below with the Telegram token you receive from @BotFather
const token = '871328481:AAGiPl4wmjpCMab4auRHCyLyz-trt10-Gfc'
	var fs = require("fs");
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
//var link;
var YD = new YoutubeMp3Downloader({
    "ffmpegPath": ".\\ffmpeg\\bin\\ffmpeg.exe",        // Where is the FFmpeg binary located?
    "outputPath": "folder",    // Where should the downloaded and encoded files be stored?
    "youtubeVideoQuality": "highest",       // What video quality should be used?
    "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
    "progressTimeout": 2000                 // How long should be the interval of the progress reports
});

YD.on("finished", async function(err, data) {
    console.log(JSON.stringify(data));
});

YD.on("error", async function(error) {
    console.log(error);
});

YD.on("progress", async function(progress) {
    console.log(JSON.stringify(progress));
});

// Matches "/echo [whatever]"
/*bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});
*/
bot.on('message', async (msg) => {
  console.log(msg)
  var link;
  link = msg.text;
   var startID = link.charAt(16);
  var startIDpc = link.charAt(23);
  console.log(startIDpc);
  console.log(msg.text);
 // link = msg.text;
  var compare=link;
  var chatId = msg.chat.id;
  switch("/") {
  case startID:  //
         link = msg.text.slice(17,37)
      console.log(link);  
      bot.sendMessage(chatId, 'Phone user'); 
 downLoad(link);
    break;
  case startIDpc:  // if (x === 'value2')
    link = msg.text.slice(32,43)
      console.log(link);
       bot.sendMessage(chatId, 'PC user'); 
       downLoad(link);
    //     bot.sendPhoto(chatId, "https://loremflickr.com/320/240/computer")
    break;

  default:
    //  bot.sendMessage(chatId, 'Bite my shiny metal ass');
      //kek();
    break;
}
  //https://youtu.be/3WAOxKOmR90   14
 function downLoad(link){
  YD.download(link);
  //msg.text=link;
  
  console.log("Well done");
  // send a message to the chat acknowledging receipt of their message
  //bot.sendMessage(chatId, 'Wait me, bitch'); 
//   bot.sendMessage(chatId, link); 
  YD.on("finished", function(err, data) { // когда файл скачался то делаем ->
    console.log("./folder/"+JSON.stringify(data.videoTitle).slice(1,-1)+".mp3");
  //  bot.sendMessage(chatId, ("./folder/"+JSON.stringify(data.title).slice(1,-1)+".mp3"));
    bot.sendAudio(msg.chat.id, ("./folder/"+JSON.stringify(data.videoTitle).slice(1,-1)+".mp3")); // отправка файла
    bot.sendPhoto(chatId, JSON.stringify(data.thumbnail).slice(1,49) );
    console.log("'"+JSON.stringify(data.thumbnail).slice(1,49)+"'");
    fs.unlink("./folder/"+JSON.stringify(data.videoTitle).slice(1,-1)+".mp3", function(err){ //удаление файла
    if (err) {
        console.log(err);
    } else {
        console.log("Файл "+JSON.stringify(data.videoTitle).slice(1,-1)+ ".mp3 "+ "удалён");
    }
        chatId = '';
});
    
});
 }
  /*function kek(){
    console.log(msg.from.first_name+", "+ msg.from.last_name+", "+msg.from.username+", "+msg.text);
    bot.sendMessage(388792572, msg.from.first_name+" "+ msg.from.last_name+" username= '"+msg.from.username+"' sent= "+msg.text);
    //
  }*/
});