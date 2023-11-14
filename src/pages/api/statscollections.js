import {excuteMultiQuery} from '../../services/db'

export default async (req, res) => {
    try {
      //console.log("req nom", req.query)
      const result = await excuteMultiQuery({
          queries: [
          "SELECT SUM(activities.price) as volume,collections.collection_address,collections.name,collections.logo FROM collections,activities where collections.collection_address = activities.collection_address and activities.type = 'Bought' group by activities.collection_address order by volume desc;",
          "SELECT min(price) as floor_price,count(*) as listings_count,collection_address from listings WHERE collection_address in (SELECT  collections.collection_address as collection_address FROM collections,activities where collections.collection_address = activities.collection_address and activities.type = 'Bought' group by collection_address order by SUM(activities.price) desc) group by collection_address;",
          "SELECT  collection_address,SUM(price) as month_volume from activities where type = 'Bought' and EXTRACT(YEAR_MONTH FROM created_at) = EXTRACT(YEAR_MONTH FROM current_timestamp()) group by collection_address order by month_volume desc;",
          "SELECT  collection_address,SUM(price) as week_volume from activities where type = 'Bought' and EXTRACT(YEAR_MONTH FROM created_at) = EXTRACT(YEAR_MONTH FROM current_timestamp()) and EXTRACT(WEEK FROM created_at) = EXTRACT(WEEK FROM current_timestamp()) group by collection_address order by week_volume desc;",
          "SELECT  collection_address,SUM(price) as day_volume from activities where type = 'Bought' and EXTRACT(YEAR_MONTH FROM created_at) = EXTRACT(YEAR_MONTH FROM current_timestamp()) and EXTRACT(DAY FROM created_at) = EXTRACT(DAY FROM current_timestamp()) group by collection_address order by day_volume desc;",
          "SELECT  collection_address,SUM(price) as hour_volume from activities where type = 'Bought' and EXTRACT(YEAR_MONTH FROM created_at) = EXTRACT(YEAR_MONTH FROM current_timestamp()) and EXTRACT(DAY_HOUR FROM created_at) = EXTRACT(DAY_HOUR FROM current_timestamp()) group by collection_address order by hour_volume desc;",
        ],
          values: [],
      });
      //console.log(result);
      res.status(200).json({ result: result });
  } catch ( error ) {
      console.log( error );
  }
};