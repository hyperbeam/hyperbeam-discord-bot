import { Client, Intents } from "discord.js";
import { readFileSync } from "fs";
import fetch from "node-fetch";

const { hyperbeamApiKey, token } = JSON.parse(
  readFileSync(new URL("../config.json", import.meta.url), "utf-8")
);

const client = new Client({ intents: Intents.FLAGS.GUILDS });

client.once("ready", () => {
  console.log("Ready!");
});

const hasProtocol = (s: string) => {
  try {
    const url = new URL(s);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch (e) {
    return false;
  }
};

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (commandName === "start") {
    const startUrl = interaction.options.getString("start_url");

    const response = await fetch("https://enginetest.hyperbeam.com/v0/vm", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hyperbeamApiKey}`,
      },
      body: JSON.stringify({
        start_url: startUrl
          ? hasProtocol(startUrl)
            ? startUrl
            : `https://duckduckgo.com/?q=${encodeURIComponent(startUrl)}`
          : "https://duckduckgo.com",
        offline_timeout: 300,
      }),
    });

    const { embed_url } = await (response.json() as { embed_url?: string });

    if (embed_url)
      await interaction.reply(
        `Started a multiplayer browser session at ${embed_url}`
      );
    else await interaction.reply("Something went wrong! Please try again.");
  }
});

client.login(token);
