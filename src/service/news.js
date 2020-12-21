import React from 'react';
import axios from 'axios'

import { articles_url, apikey } from '../config/rest_config';

export async function getArticles (section) {

  try {
      let articles = await fetch(`${articles_url}${section}.json?api-key=${apikey}`)

      let result = await articles.json();
      articles = null;
      // console.log('result',result.results);
      return result.results;
  }
  catch(error) {
      throw error;
  }
}