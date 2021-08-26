/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Request, Response } from 'express';
import axios from 'axios';

import spotify from '../config/spotify.config';
import cache from '../cache';

const {
  client_id,
} = spotify;

const playlistInfo = async (req: Request, res: Response) => {
  try {
    const playlistId = req.query.id;
    const access_token = await cache.get(client_id);

    const cachedData = await cache.get(`playlist:${playlistId}`);
    if (cachedData) {
      res.status(200).send(JSON.parse(cachedData));
    } else {
      const response = await axios({
        url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      });

      const { items } = response.data;
      cache.add(`playlist:${playlistId}`, 60, JSON.stringify(items));

      res.status(200).send(items);
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

export default playlistInfo;
