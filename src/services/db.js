// db.js
require('dotenv').config();
import mysql from 'serverless-mysql';

var config = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
}
const db = mysql({config});
export default async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}

export async function excuteMultiQuery({ queries, values  }) {
  try {
    let transaction =  db.transaction()
    queries.map((query)=>transaction.query(query,values));
    let results = await transaction.commit();
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}

/*
ERA HOMI SQL DATABASE MODELISAION 
COMBINE WEB3 AND WEB2

MYSQL_HOST= 89.116.147.1
MYSQL_PORT= 3306
MYSQL_DATABASE= u783618664_era_homi_dapp
MYSQL_USER= u783618664_era_dapp_asmar
MYSQL_PASSWORD= Cocojumbo@06

Listed Items Table:

id
collection_address (varchar: Address)
nft_address (varchar: Address)
price
name
imageUrl
ownerAddress


Collections Table:

id
collection_address (varchar: Address)
name
description
logo
bannerImage
creatorAddress

listings
floor
volume




*/