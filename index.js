// Prepare libaries
// DO NOT MODIFY ANYTHING OR RUN.

function decodeEntities(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp":" ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
    };
    return encodedString.replace(translate_re, function(match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}
function lz(m, t = 2, x = "0") { x = x.repeat(t); return (x + m).slice(-t) }
function tocsp(sec) {
 var d = ~~(sec / 86400);
 var h = ~~(sec / 3600) % 24;
 var m = ~~(sec / 60) % 60;
 var s = ~~(sec % 60);
 var res = lz(s) + "";
 res = lz(m) + ":" + res;
 if (h) {
  res = lz(h) + ":" + res;
  if (d) {
   res = d + "d " + res;
  }
 }
 return res;
}
const os = require("os")
const fs = require('fs')
const io = require('tbparty');
const vm = require("vm")

// const socket = require("socket.io-client/lib/socket");
const loggedin = [['-771b8d00 ', 'josiah.txt']]
const quotes = ['"Oh no! Which one do I shoot?" - Tom, Eddsworld ', '"Twishorts what are you doing here?" - Various minecraft tiktokers except @twishorts', '"I found a thing!" - Matt, Eddsworld', '"Thanks so much dude!" - Kevin - Spooky Month 4', '"trollbox is dead" - @e(admin)', '"Don\'t kick the god damn baby!" - A south park person i forgor 💀']
const ownerhome = ["J1DS3FFDSCF4H2CDSFGASEEEFMFDSIAJ", "HJ87GHECC2CCGC787H43DSCIAAS2FHF1"]


// Prepeare Client
const client = io();

const cfg = require('./cfg.json')
const pfx = cfg.prefix
function error(message) {
    client.send("❌ Oops!\nSomething went wrong. " + message)
}


// Prepare bot
client.on("_connected", (data) => {
    client.emit('user joined', cfg.name + " [" + cfg.prefix + "]", cfg.color)
    console.log(client.id);
    setTimeout(() => {
        client.emit('message', cfg.name + '! v1.9.1');
    }, 1000);
});

client.on('user joined', function (data) {
    console.log(data);
});

client.on('message', function (data) {
    var msg = decodeEntities(data.msg)
    var nick = data.nick
    var args = msg.split(" ")
    var home = data.home
    args = args.splice(1, args.length)
    console.log(data);
    console.log(args)
    if (msg.startsWith(cfg.prefix) && !(home == "FASASHM7HJJIA877HCIADSASASDS3877")) {
     if (msg.startsWith(cfg.prefix + "help")) {
        client.send('HELP\nCurrent Prefix:' + pfx + '\n😃 Fun\nkill <tokill>: Kill something.\nsay <something>: Say anything!\nquote: Get a quote!\neval <code>: Your favorite eval, now in an isolation!\n👤 User Control\nsignup <username> <totally not a password>: Sign Up\nlogin <username> <NOT password> Login\nlogout <username: confirmmation> Logout\n💻Creator Exclusive\nusafeeval <code> Eval something\nshutdown Shutdown the bot')
     } else if (msg.startsWith(pfx + "kill")) {
       client.send(args.join(" ") + ' was killed by ' + nick + ' successfully.')
       }
       else if (msg.startsWith(cfg.prefix + "signup")) {
         error("We are working on it too!")
       }
       else if (msg.startsWith(cfg.prefix + "login")) {
       error("We're working on it! 🛠")
        } else if(msg.startsWith(cfg.prefix + "logout")) {
            client.send("Not avaliable! 🛠")
          }
         else if (msg.startsWith(pfx + "usafeeval")) {
            client.send("Evaluating...")
            if (!(ownerhome.includes(home))) {
            client.send("SIKE! I will not evaluate. Disabled for remove and IP grabbing. No more abuse mfs")
         } else {
             client.send("Of course my creator.")
             eval(args.join(' '))
         }
        }
         else if (msg.startsWith(pfx + "quote")) {
          var args = msg.replace('j!name ', '');
          if (args == '') {
          client.send(quotes[Math.floor(Math.random() * quotes.length)]);
          } else {
              client.send(quotes[whatquote]);
          }
         } else if (msg.startsWith(pfx + "say")) {
             if (args.includes("-rn", args.length - 1)) {
                 if (ownerhome.includes(home)) {
                     args.pop()
                     client.send(args.join(' '))
                 } else {
                     client.send(nick + ":" + args.join(' '))             
                 }            
             } else {
                client.send(nick + ":" + args.join(' '))
             }
         } else if (msg == pfx + "shutdown") {
            if (!(ownerhome.includes(home))) {
                client.send("SIKE! I will not shutdown!")
             } else {
                 client.send("Farewell i guess")
                 process.exit(0)
             }
         } else if (msg == pfx + "uptime") {
           client.send("Seconds of Github VM OS (Ubuntu Latest):\n|_ " + tocsp(os.uptime()) + "\nSeconds of me (a process)\n|_" + tocsp(process.uptime()))
         } else if (msg.startsWith(pfx + "eval")) {
            var myscript = new vm.Script(args.join(" "))
            const ctx = {
             client: "undefined",
             socket: "undefined"
            }
            vm.createContext(ctx)
            try {
             myscript.runInContext(ctx)
            } catch(e) {
             myscript = "Failed to eval."
            }
            client.send("> " + args.join(" ") + "\n Result: " + myscript)
         }
         else {
          client.send('❌ Oops!\nSomething went wrong. I didn\'t understand that command! Is it in help?')
      }
    } else if (msg.startsWith(cfg.spfx + "-pfx")) {
      client.send("What's up? Did you say\"" + cfg.spfx + "-pfx\"because you don't have my prefix? My prefix is in my nickname, or: " + pfx + " right now!")
    }
  })

client.on("connect_error", (data) => {
    console.log('error');
    console.log(data);
});
  
client.on("disconnect", () => {
    console.log(client.id);
});
