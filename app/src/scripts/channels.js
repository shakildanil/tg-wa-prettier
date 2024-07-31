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
    // Найти запись пользователя в таблице Users по tgID
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

    // Пройти по каждому значению из userChannels_id
    for (const userChannelId of userChannelsIds) {
      const userChannelRecord = await userChannelsTable.find(userChannelId);
      const channelId = userChannelRecord.fields.channel_id;

      // Найти и добавить запись Channels в массив ответа
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

    // Извлечь username из link
    const username = link.split("/").pop();
    if (!username) {
      throw new Error("Invalid link format");
    }
    console.log("Extracted username:", username);

    // Сделать GET-запрос на API
    const response = await axios.get(
      `https://channelsio-ce-4225c1e02412.herokuapp.com/parse/${username}/${sector}`
    );
    let { ev } = response.data;
    console.log("Received EV from API:", ev);

    // Найти запись по channel_id
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
    const members = records[0].fields.members; // Предполагается, что members хранится в записи
    console.log("Found record ID:", recordId);
    console.log("Members:", members);

    // Проверка и расчет EV
    if (!ev || ev === 0 || ev === "0" || ev === "N/A" || ev === null) {
      const sectorData = sectors[sector];
      if (sectorData) {
        ev = members * sectorData.av_cost;
        console.log("Calculated EV:", ev);
      } else {
        ev = "N/A"; // В случае если sectorData не найден
      }
    }

    // Обновить запись Channel с новым sector и EV
    await channelsTable.update(recordId, {
      sector: sector,
      EV: ev,
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

export async function updateChannelPublish(channel_id, total_supply = 10000) {
  try {
    console.log("Starting publish update for channel:", channel_id);

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
    const ev = records[0].fields.EV;
    console.log("Current EV:", ev);

    if (!ev || ev === 0 || ev === "0" || ev === "N/A" || ev === null) {
      throw new Error(`Invalid EV value for channel ${channel_id}`);
    }

    const listing_price = ev / total_supply;
    console.log("Calculated listing price:", listing_price);

    await channelsTable.update(recordId, {
      total_supply: total_supply,
      listing_price: listing_price,
      isPublished: true,
    });

    console.log(`Channel ${channel_id} published with total supply: ${total_supply}, listing price: ${listing_price}`);
  } catch (error) {
    console.error("Error updating channel publish status:", error);
    throw error;
  }
}

export async function getPublishedChannels() {
  try {
    const channelsTable = base("Channels");
    const records = await channelsTable
      .select({
        filterByFormula: `{isPublished} = TRUE()`,
        maxRecords: 100, // например, максимальное количество записей
      })
      .all();

    return records.map(record => record.fields);
  } catch (error) {
    console.error("Error fetching published channels:", error);
    throw error;
  }
}
