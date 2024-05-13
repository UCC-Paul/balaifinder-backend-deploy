import { db } from "../connect.js";

export const showAlgorithmResult = (req, res) => {
  const sqlGet = `
  SELECT *,
  (
      (CASE 
          WHEN PREF.type = PROP.type THEN 1
          ELSE 0
      END) +
      (CASE 
          WHEN PREF.location = PROP.location THEN 1
          ELSE 0
      END) +
      (CASE 
          WHEN PREF.price = PROP.price THEN 1
          ELSE 0
      END) +
      (CASE 
          WHEN TRIM(UPPER(PREF.nearelementary)) = TRIM(UPPER(PROP.nearelementary)) THEN 1
          ELSE 0
      END) +
      (CASE 
          WHEN TRIM(UPPER(PREF.nearhighschool)) = TRIM(UPPER(PROP.nearhighschool)) THEN 1
          ELSE 0
      END) +
      (CASE 
          WHEN TRIM(UPPER(PREF.nearcollege)) = TRIM(UPPER(PROP.nearcollege)) THEN 1
          ELSE 0
      END) +
      (CASE 
          WHEN TRIM(UPPER(PREF.isnearchurch)) = TRIM(UPPER(PROP.isnearchurch)) THEN 1
          ELSE 0
      END) +
      (CASE 
          WHEN TRIM(UPPER(PREF.isnearmall)) = TRIM(UPPER(PROP.isnearmall)) THEN 1
          ELSE 0
      END) +
      (CASE 
          WHEN TRIM(UPPER(PREF.businessready)) = TRIM(UPPER(PROP.businessready)) THEN 1
          ELSE 0
      END) +
      (CASE 
          WHEN PREF.numberofbedroom = PROP.numberofbedroom THEN 1
          ELSE 0
      END) +
      (CASE 
          WHEN PREF.numberofbathroom = PROP.numberofbathroom THEN 1
          ELSE 0
      END) +
      (CASE 
          WHEN PREF.typeoflot = PROP.typeoflot THEN 1
          ELSE 0
      END) +
      (CASE 
          WHEN PREF.familysize = PROP.familysize THEN 1
          ELSE 0
      END)
  ) AS score
FROM userpreferencestable AS PREF
LEFT JOIN propertiestable AS PROP ON PREF.type = PROP.type AND PREF.location = PROP.location
HAVING score > 0
ORDER BY score DESC;
`;

  db.query(sqlGet, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).json({ message: "Internal server error." });
    }

    res.send(results);
  });
};