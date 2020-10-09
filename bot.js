const settings = require("./settings.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

client.login(settings.token);

client.on("ready", ready =>{
    console.log("Ready");
})

client.on("message", msg=>{
    if(msg.content.toLowerCase().split(' ')[0] === settings.prefix + "role" && msg.member.hasPermission("ADMINISTRATOR")){
        //role role_id
        let args = msg.content.split(' ');
        if(!args[1]) return;
        let role = msg.guild.roles.get(args[1]);
        if(!role) return;
        let text = '';
        fs.readFile("list.txt", function(err, buf) {
            if(err) console.log(err);
            let ids = buf.toString().split("\r\n");
            for(let i = 0 ; i < ids.length; i++){
                let memb = msg.guild.members.get(ids[i])
                if(memb){
                    memb.addRole(role);
                }
            }
        });
        msg.reply("Done!");
    }

})