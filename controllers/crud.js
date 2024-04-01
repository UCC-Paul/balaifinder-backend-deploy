import { db } from "../connect.js";

export const getproperties = (req, res) => {
  const q = "SELECT * FROM propertiestable";

  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
};

export const addproperties = (req, res) => {
  const q =
    "INSERT INTO propertiestable (`name`, `type`, `location`, `price`, `isnearschool`, `isnearchurch`, `isnearmall`, `numberofbedroom`, `numberofbathroom`, `typeoflot`, `familysize`, `nearelementary`, `nearhighschool`, `nearcollege`, `plantodobusiness`, `monthly`, `description`, `imgsrc`) VALUES (?)";

  const values = [
    req.body.name,
    req.body.type,
    req.body.location,
    req.body.price,
    req.body.isnearschool,
    req.body.isnearchurch,
    req.body.isnearmall,
    req.body.numberofbedroom,
    req.body.numberofbathroom,
    req.body.typeoflot,
    req.body.familysize,
    req.body.nearelementary,
    req.body.nearhighschool,
    req.body.nearcollege,
    req.body.plantodobusiness,
    req.body.monthly,
    req.body.description,
    req.body.imgsrc,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};

export const updproperties = (req, res) => {
  const propertyId = req.params.id;
  const q =
    "UPDATE propertiestable SET `name`= ?, `type`= ?, `location`= ?, `price`= ?, `isnearschool`= ?, `isnearchurch`= ?, `isnearmall`= ?, `numberofbedroom`= ?, `numberofbathroom`= ?, `typeoflot`= ?, `familysize`= ?, `nearelementary`= ?, `nearhighschool`= ?, `nearcollege`= ?, `plantodobusiness`= ?, `monthly`= ?, `description`= ?, `imgsrc`= ? WHERE id = ?";

  const values = [
    req.body.name,
    req.body.type,
    req.body.location,
    req.body.price,
    req.body.isnearschool,
    req.body.isnearchurch,
    req.body.isnearmall,
    req.body.numberofbedroom,
    req.body.numberofbathroom,
    req.body.typeoflot,
    req.body.familysize,
    req.body.nearelementary,
    req.body.nearhighschool,
    req.body.nearcollege,
    req.body.plantodobusiness,
    req.body.monthly,
    req.body.description,
    req.body.imgsrc,
  ];

  db.query(q, [...values, propertyId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};

export const delproperties = (req, res) => {
  const propertyId = req.params.id;
  const q = " DELETE FROM propertiestable WHERE id = ? ";

  db.query(q, [propertyId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};
