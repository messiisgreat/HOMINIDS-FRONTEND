import excuteQuery from '../../services/db'

export default async (req, res) => {
    try {
      //console.log("req nom", req.body)
      const result = await excuteQuery({
          query: 'SELECT * FROM activities WHERE collection_address = ? order by created_at desc limit 20',
          values: [req.query.address],
      });
      //console.log(result);
      res.status(200).json({ result: result });
  } catch ( error ) {
      console.log( error );
  }
};