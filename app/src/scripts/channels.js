import Airtable from "airtable";
import axios from "axios";

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
    console.log('Starting update for channel:', channel_id, link, sector);

    // Извлечь username из link
    const username = link.split('/').pop();
    if (!username) {
      throw new Error('Invalid link format');
    }
    console.log('Extracted username:', username);

    // Сделать GET-запрос на API
    const response = await axios.get(`https://channelsio-ce-4225c1e02412.herokuapp.com/parse/${username}/${sector}`);
    const { ev } = response.data;
    console.log('Received EV from API:', ev);

    // Найти запись по channel_id
    const channelsTable = base("Channels");
    const records = await channelsTable.select({
      filterByFormula: `{channel_id} = "${channel_id}"`,
      maxRecords: 1,
    }).firstPage();

    if (records.length === 0) {
      throw new Error(`Channel with channel_id ${channel_id} not found`);
    }

    const recordId = records[0].id;
    console.log('Found record ID:', recordId);

    // Обновить запись Channel с новым sector и EV
    await channelsTable.update(recordId, {
      "sector": sector,
      "EV": ev
    });

    console.log(`Channel ${channel_id} updated with sector: ${sector}, ev: ${ev}`);
    return ev; 
  } catch (error) {
    console.error("Error updating channel data:", error);
    throw error;
  }
}