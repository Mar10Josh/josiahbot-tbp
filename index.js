// Prepare libaries
// DO NOT MODIFY ANYTHING OR RUN.

function decodeEntities(encodedString) {
  var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  var translate = {
    nbsp: ' ',
    amp: '&',
    quot: '"',
    lt: '<',
    gt: '>',
  };
  return encodedString
    .replace(translate_re, function (match, entity) {
      return translate[entity];
    })
    .replace(/&#(\d+);/gi, function (match, numStr) {
      var num = parseInt(numStr, 10);
      return String.fromCharCode(num);
    });
}
const fs = require('fs');
const io = require('socket.io-client');
// const socket = require("socket.io-client/lib/socket");
const loggedin = [['-771b8d00 ', 'josiah.txt']];
const quotes = [
  '"Oh no! Which one do I shoot?" - Tom, Eddsworld ',
  '"Twishorts what are you doing here?" - Various minecraft tiktokers except @twishorts',
  '"I found a thing!" - Matt, Eddsworld',
  '"Thanks so much dude!" - Kevin - Spooky Month 4',
  '"trollbox is dead" - @e(admin)',
  '"Don\'t kick the god damn baby!" - A south park person i forgor 💀',
];

// Prepeare Client
const client = io('https://trollbox.party', {
  'force new connection': true,
  reconnectionAttempts: 'Infinity',
  timeout: 10000,
  transports: ['websocket'],
  path: '/api/v0/si',
});

function error(message) {
  client.send('❌ Oops!\nSomething went wrong. ' + message);
}

// Prepare bot
client.on('_connected', (data) => {
  client.emit('user joined', 'JosiahBot [j!]', 'red');
  console.log(client.id);
  setTimeout(() => {
    client.emit('message', 'JosiahBot! v1.9.1');
  }, 1000);
});

client.on('user joined', function (data) {
  console.log(data);
});

client.on('message', function (data) {
  var msg = decodeEntities(data.msg);
  var nick = data.nick;
  var args = msg.split(' ');
  var home = data.home;
  args = args.splice(1, args.length);
  console.log(data);
  console.log(args);
  if (msg.startsWith('j!') && !(home == 'DSJGHC7E487EMHIAF3FG2GASEJIAIADS')) {
    if (msg.startsWith('j!help')) {
      client.send(
        'HELP\n😃 Fun\nj!kill <tokill>: Kill something.\nj!say <something>: Say anything!\nj!quote: Get a quote!\n👤 User Control\nj!signup <username> <totally not a password>: Sign Up\nj!login <username> <NOT password> Login\nj!logout <username: confirmmation> Logout\n💻Creator Exclusive\nj!eval <code> Eval something\nj!shutdown Shutdown the bot'
      );
    } else if (msg.startsWith('j!kill')) {
      client.send(args.join(' ') + ' was killed by ' + nick + ' successfully.');
    } else if (msg.startsWith('j!signup')) {
      error('We are working on it too!');
    } else if (msg.startsWith('j!login')) {
      error("We're working on it! 🛠");
    } else if (msg.startsWith('j!logout')) {
      client.send('Not avaliable! 🛠');
    } else if (msg.startsWith('j!eval')) {
      client.send('Evaluating...');
      if (!(home == 'DSJGHC7E487EMHIAF3FG2GASEJIAIADS')) {
        client.send(
          'SIKE! I will not evaluate. Disabled for remove and IP grabbing. No more abuse mfs'
        );
      } else {
        client.send('Of course my creator.');
        try {
         eval(args.join(' '));
        } catch(e) {
          client.send("Before I crashed I caught " + e + " and threw it away to the box of errors.")
        }
      }
    } else if (msg.startsWith('j!quote')) {
      if (args == []) {
        client.send(quotes[Math.floor(Math.random() * quotes.length)]);
      } else {
        var whatquote = data.msg.replace('j!name ', '');
        if (!whatquote == NaN) {
          client.send(quotes[whatquote]);
        } else {
          error('Is that a number? It returned as NaN. (Not a Number)');
        }
      }
    } else if (msg.startsWith('j!say')) {
      client.send(nick + ': ' + args.join(' '));
    } else if (msg == 'j!shutdown') {
      if (!(home == 'DSJGHC7E487EMHIAF3FG2GASEJIAIADS')) {
        client.send('SIKE! I will not shutdown!');
      } else {
        client.send('Farewell i guess');
        process.exit(0);
      }
    } else {
      client.send(
        "❌ Oops!\nSomething went wrong. I didn't understand that command! Is it in j!help?"
      );
    }
  }
});

client.on('connect_error', (data) => {
  console.log('error');
  console.log(data);
});

client.on('disconnect', () => {
  console.log(client.id);
});
