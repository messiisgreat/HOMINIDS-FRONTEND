import {excuteMultiQuery} from '../../services/db'

export default async (req, res) => {
    try {
      //console.log("req nom", req.query)
      const result = await excuteMultiQuery({
          queries: ["select SUM(price) as total_volume from activities WHERE collection_address = ? and type = 'Bought';", 
          "select Min(price) as floor_price from listings WHERE collection_address = ?;",
          "select count(*) as listings_count from listings WHERE collection_address = ?;"
          ],
          values: [req.query.address],
      });
      
      res.status(200).json({ result: {'total_volume':result[0][0].total_volume,'floor_price':result[1][0].floor_price,'listings_count':result[2][0].listings_count} });
  } catch ( error ) {
      console.log( error );
  }
};