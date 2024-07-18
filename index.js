;(async()=>{

const express = require(`express`)
const app = express();
const { stdin: input, stdout: output } = require('node:process');
const readlineasync = require(`node:readline`);
const modMapData = require(`./modMapData.js`)

const rl = readlineasync.createInterface({
    input: process.stdin, //or fileStream 
    output: process.stdout
});

let mods = {
    "ADMIN": {
        "title": "Gain access to Admin menus (non-functional, but cool)",
        "enabled": false,
        "toggle": ()=>{ return new Promise(async(r)=>{

            if(mods["ADMIN"].enabled){
                mods["ADMIN"].enabled = false;
            }else{
                let username = await new Promise(resolve => {
                    rl.question("What's your IWM username? > ", resolve)
                })

                mods["ADMIN"].enabled = true;
                mods["ADMIN"].username = username;
            }

            r();

        })}
    },
    "DISABLE_MAPCOUNT": {
        "title": "Disable mapcount text",
        "enabled": false,
        "toggle": ()=>{ mods["DISABLE_MAPCOUNT"].enabled = !mods["DISABLE_MAPCOUNT"].enabled }
    },
    "ENABLE_VIEW_IN_EDITOR": {
        "title": "View any level in the editor, cleared or not",
        "enabled": false,
        "toggle": ()=>{ mods["ENABLE_VIEW_IN_EDITOR"].enabled = !mods["ENABLE_VIEW_IN_EDITOR"].enabled }
    },
    "MORE_LEVEL_STATS": {
        "title": "View extra level stats in level descriptions (play count, thumbs down)",
        "enabled": false,
        "toggle": ()=>{ mods["MORE_LEVEL_STATS"].enabled = !mods["MORE_LEVEL_STATS"].enabled }
    },
    "LEVEL_FLIGHT": {
        "title": "Modifies all levels to give infinite flight",
        "enabled": false,
        "toggle": ()=>{ mods["LEVEL_FLIGHT"].enabled = !mods["LEVEL_FLIGHT"].enabled }
    },
    "LEVEL_COINS": {
        "title": "Modifies all levels to give infinite coins",
        "enabled": false,
        "toggle": ()=>{ mods["LEVEL_COINS"].enabled = !mods["LEVEL_COINS"].enabled }
    },
    "LEVEL_SHIELD": {
        "title": "Modifies all levels to give infinite shields",
        "enabled": false,
        "toggle": ()=>{ mods["LEVEL_SHIELD"].enabled = !mods["LEVEL_SHIELD"].enabled }
    },
    "DISABLE_SUBMISSION": {
        "title": "Don't allow cleared levels to be uploaded",
        "enabled": true,
        "toggle": ()=>{ return new Promise(async(r)=>{

            if(mods["DISABLE_SUBMISSION"].enabled){
                console.clear()
                console.log(`⚠️ WARNING: YOU'RE DOING SOMETHIN' DANGEROUS ⚠️
Clearing ANY MAP with mods that give you an unfair advantage (e.g. flight) WILL BAN YOU sooner or later.
Enabling map submission allows this to happen by submitting your level result to IWM's servers.

Again: Enabling map submission whilst blatently cheating WILL BAN YOU.

To continue with enabling, please type: "I want to enable map submission and I know I could be banned. I am doing this at my own risk."`)

                let waiver = await new Promise(resolve => {
                    rl.question("Type waiver text or nothing to cancel > ", resolve)
                })

                if(waiver.toLowerCase() == "i want to enable map submission and i know i could be banned. i am doing this at my own risk.") mods["DISABLE_SUBMISSION"].enabled = false;
            }else{
                mods["DISABLE_SUBMISSION"].enabled = true;
            }

            r();

        })}
    }
}

function modLevelMetadata(data){
    if(mods["ENABLE_VIEW_IN_EDITOR"].enabled) data.Clear = true;
    if(mods["ENABLE_VIEW_IN_EDITOR"].enabled) data.FullClear = true;
    if(mods["MORE_LEVEL_STATS"].enabled) data.Description = `${data.PlayCount} plays, ${data.NumThumbsDown} thumbs down |` + data.Description;
    return data;
}

app.use(require(`body-parser`).text({
    type: "*/*"
}));

app.use((req,res,next)=>{
   let head = req.headers
   delete head["content-length"];

   if(req.url.endsWith(`/stop`) && mods["DISABLE_SUBMISSION"].enabled){
        res.status(400).send(`Map submission disabled (IWP)`)
        return;
    }

    if(req.url == "/api/v1/mapcount" && mods["DISABLE_MAPCOUNT"].enabled){
        res.send(``)
        return;
    }

    fetch(`http://make.fangam.es${req.url}`,{
        method: req.method,
        body: req.method == "GET" ? undefined : req.body,
        headers: head
    }).then(async(r)=>{

        let t = await r.text()

        try{
            let j = JSON.parse(t);

            if(j.MapData || j.CurMap?.MapData){
                let mapData = t.split(`"MapData":"`)[1].split(`",`)[0]
                let patchedMapData = modMapData(mapData, mods)
                t = t.replace(mapData, patchedMapData)

                res.status(r.status).send(t)
                return;
            }

            if(j[0]?.PlayerCount && j[0]?.BestTimeUsername){ // it's an array of levels
                j = j.map((t)=>modLevelMetadata(t))
            }else if(j.PlayerCount && j.BestTimeUsername){ // it's one level
                j = modLevelMetadata(t)
            }

            if(mods["ADMIN"].enabled && j?.Username == mods["ADMIN"].username) j.Admin = true;

            res.status(r.status).send(JSON.stringify(j))
        }catch(e){
            e = e.toString();
            if(!e.includes("Unexpected token")) console.log(e)
            res.status(r.status).send(t)
        }
    }).catch(console.log)
})


// command line stuff
console.log("  ___  __      __                     ___                  \n" +
" |_ _| \\ \\    / /_ _ _ _  _ _  __ _  | _ \\_ _ _____ ___  _ \n" +
"  | |   \\ \\/\\/ / _` | ' \\| ' \\/ _` | |  _/ '_/ _ \\ \\ / || |\n" +
" |___|   \\_/\\_/\\__,_|_||_|_||_\\__,_| |_| |_| \\___/_\\_\\\\_, |\n" +
"                                                      |__/  by coding398.dev\n")

console.log(`Welcome!
This is a neat little tool that allows you to indirectly modify your I Wanna Maker game by setting up a proxy server.
Before we begin, understand:

- The usage of these mods in submitted runs is VERY LIKELY to get you banned.
- You will NOT gain any administrator permissions, of course- but you can easily get a ton of advantages that makes gameplay unfair.
- Usage of any of these tools is at your own risk!

That being said, IWP can also provide a neat way to learn about cool hidden menus, disable particle effects in levels, and just have a whole lotta fun :)
By default, run submissions will be turned OFF whilst using the proxy.

Repeat "I understand the risks" into the console to continue.`)

let waiver = await new Promise(resolve => {
    rl.question("Enter > ", resolve)
})

if(waiver.toLowerCase() !== "i understand the risks" && false){
    process.exit()
}

console.clear()

console.log(`Have you set up IWP before?

Y: Yes, I have, bring me to the options.
N: No, tell me how to set it up.`)

let selection = await new Promise(resolve => {
    rl.question("Y/N > ", resolve)
})

console.clear()

if(!selection.toLowerCase().startsWith("y")){
    console.log(`I Wanna Proxy involves modifying a single configuration file in IWM's app data directory.

If you are on WINDOWS, you will find this file in  %localappdata%\\IWM (paste that in the top bar of Explorer).
If you are on LINUX, open the directory /home/(user)/.local/share/Steam/steamapps/compatdata then search for a folder titled "IWM".

You should see a file called "config.ini". Open it, and change the line:

Server_hostname="https://make.fangam.es"
to
Server_hostname="http://localhost:2048"

Then save and restart IWM.
`)

    await new Promise(resolve => {
        rl.question("Press ENTER to continue.", resolve)
    })
}

app.listen(2048)

function modMenu(){
    console.clear()
    console.log(`Modifications:`)
    for (let i = 0; i < Object.values(mods).length; i++) {
        const mod = Object.values(mods)[i];
        
        console.log(`${i} | ${mod.enabled ? "🟩" : "🟥"} | ${mod.title}`)
    }

    rl.question(`Enter in a mod number to toggle it: `, async(num)=>{
        let mod = Object.values(mods)[num];
        
        if(!mod){
            modMenu()
            return;
        }

        await mod.toggle()
        modMenu()
    })
}
modMenu()

})();