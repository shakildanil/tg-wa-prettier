import Airtable from "airtable";
import axios from "axios";
import { sectors } from '../scripts/sectors';

const AIRTABLE_API_KEY = import.meta.env.VITE_APP_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_APP_AIRTABLE_BASE_ID;

Airtable.configure({
  apiKey: AIRTABLE_API_KEY,
});

const base = Airtable.base(AIRTABLE_BASE_ID);

export async function getUserChannels(tgID) {
  try {
    const usersTable = base("Users");
    const usersRecords = await usersTable
      .select({
        filterByFormula: `{tgID} = "${tgID}"`,
        maxRecords: 1,
      })
      .firstPage();

    if (usersRecords.length === 0) {
      throw new Error("User not found");
    }

    const userRecord = usersRecords[0];
    const userChannelsIds = userRecord.fields.userChannels_id || [];

    const channelsTable = base("Channels");
    const userChannelsTable = base("UserChannels");
    const userChannels = [];

    for (const userChannelId of userChannelsIds) {
      const userChannelRecord = await userChannelsTable.find(userChannelId);
      const channelId = userChannelRecord.fields.channel_id;

      const channelRecord = await channelsTable.find(channelId);
      if (!channelRecord.fields.isDeleted) {
        userChannels.push(channelRecord.fields);
      }
    }

    return userChannels;
  } catch (error) {
    console.error("Error fetching user channels:", error);
    throw error;
  }
}

export async function updateChannelDataEV(channel_id, link, sector) {
  try {
    console.log("Starting update for channel:", channel_id, link, sector);

    const username = link.split("/").pop();
    if (!username) {
      throw new Error("Invalid link format");
    }
    console.log("Extracted username:", username);

    const response = await axios.get(
      `https://channelsio-ce-4225c1e02412.herokuapp.com/parse/${username}/${sector}`
    );
    let { ev } = response.data;
    console.log("Received EV from API:", ev);

    const channelsTable = base("Channels");
    const records = await channelsTable
      .select({
        filterByFormula: `{channel_id} = "${channel_id}"`,
        maxRecords: 1,
      })
      .firstPage();

    if (records.length === 0) {
      throw new Error(`Channel with channel_id ${channel_id} not found`);
    }

    const recordId = records[0].id;
    const members = records[0].fields.members;
    console.log("Found record ID:", recordId);
    console.log("Members:", members);

    if (!ev || ev === 0 || ev === "0" || ev === "N/A" || ev === null) {
      const sectorData = sectors[sector];
      if (sectorData) {
        ev = members * sectorData.av_cost;
        console.log("Calculated EV:", ev);
      } else {
        ev = "N/A";
      }
    }

    await channelsTable.update(recordId, {
      sector: sector,
      listing_value: ev,
    });

    console.log(
      `Channel ${channel_id} updated with sector: ${sector}, ev: ${ev}`
    );
    return ev;
  } catch (error) {
    console.error("Error updating channel data:", error);
    throw error;
  }
}

export async function updateChannelPublish(channel_id, totalSupply = 10000) {
  try {
    const channelsTable = base("Channels");
    const records = await channelsTable
      .select({
        filterByFormula: `{channel_id} = "${channel_id}"`,
        maxRecords: 1,
      })
      .firstPage();

    if (records.length === 0) {
      throw new Error(`Channel with channel_id ${channel_id} not found`);
    }

    const recordId = records[0].id;
    const ev = records[0].fields.listing_value;

    const listingPrice = ev / totalSupply;

    await channelsTable.update(recordId, {
      total_supply: totalSupply,
      listing_price: listingPrice,
      isPublished: true,
      current_price: listingPrice,
      current_value: ev,
    });

    console.log(
      `Channel ${channel_id} updated with total supply: ${totalSupply}, listing price: ${listingPrice}, isPublished: true`
    );

    const channels = JSON.parse(localStorage.getItem('publishedChannels')) || [];
    const updatedChannels = channels.map(channel => {
      if (channel.channel_id === channel_id) {
        return { ...channel, total_supply: totalSupply, listing_price: listingPrice, isPublished: true };
      }
      return channel;
    });
    localStorage.setItem('publishedChannels', JSON.stringify(updatedChannels));

    return { totalSupply, listingPrice };
  } catch (error) {
    console.error("Error updating channel data:", error);
    throw error;
  }
}

export async function getPublishedChannels() {
  try {
    const channelsTable = base("Channels");
    const records = await channelsTable
      .select({
        filterByFormula: `{isPublished} = TRUE()`,
      })
      .firstPage();

    const publishedChannels = records.map(record => record.fields);
    return publishedChannels;
  } catch (error) {
    console.error("Error fetching published channels:", error);
    throw error;
  }
}
