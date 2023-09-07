require("dotenv").config();
const { REST, Routes, Message } = require("discord.js");
const { Client, GatewayIntentBits, MessageEmbed } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const moment = require("moment");

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "account",
    description: "Replies with when you join the discord",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TESTMODE);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    console.log("Successfully reloaded application (/) commands.");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
  } catch (error) {
    console.error(error);
  }
})();

const activities = [
  "",
  "For the command type '/[command]'" ,
  "Add me: 'Sai#9104'"
];

client.on("ready", () => {
  client.user.setActivity("in my support server", { type: "PLAYING" });
  
  console.log(`Logged in as ${client.user.tag}!\n\n`);
  const Guilds = client.guilds.cache.map((guild) => guild.name);
  console.log(Guilds);
  console.log("Total of", Guilds.length, "Guild/s");
  console.log("Logs: ");
});

client.on("interactionCreate", async (interaction) => {
  var userTag = interaction.user;
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
    console.log(interaction.user.username, "command", interaction.commandName);
  }

  if (interaction.commandName === "account") {
    try {
      if (!interaction.isRepliable()) return;
      await interaction.reply(
        "You joined discord since " + moment(userTag.createdAt).format("LLLL")
      );
      console.log(
        interaction.user.username,
        "command",
        interaction.commandName
      );
    } catch (error) {
      console.error(error);
    }
  }
});

client.login(process.env.TESTMODE);
