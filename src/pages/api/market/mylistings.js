import excuteQuery from '../../../services/db'

export default async (req, res) => {
    try {
      //console.log("req nom", req.query)
      const result = await excuteQuery({
          query: 'SELECT * FROM listings WHERE ownerAddress = ?',
          values: [req.query.address],
      });
      //console.log(result);
      res.status(200).json({ result: result });
  } catch ( error ) {
      console.log( error );
  }
};