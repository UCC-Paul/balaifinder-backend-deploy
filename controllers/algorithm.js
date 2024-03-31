import { db } from "../connect.js";

export const showAlgorithmResult = (req, res) => {
  const sqlGetWeights = `
    SELECT 
      locationpriority, 
      typepriority, 
      pricepriority, 
      isnearelementarypriority, 
      isnearhighschoolpriority, 
      isnearcollegepriority, 
      isnearmallpriority, 
      isnearchurchpriority, 
      bedroompriority, 
      bathroompriority, 
      familysizepriority, 
      businessreadypriority, 
      lottypepriority 
    FROM userprioritytable;
  `;

  db.query(sqlGetWeights, (error, weightResults) => {
    if (error) {
      console.error("Error fetching weights:", error);
      return res.status(500).json({ message: "Internal server error." });
    }

  const sqlGet = `
    SELECT *,
      ((CASE 
          WHEN PREF.type = PROP.type THEN ${weightResults[0].typepriority / 100}
        END) +
      (CASE 
          WHEN PREF.location = PROP.location THEN ${weightResults[0].locationpriority / 100}
        END) +
        (CASE 
          WHEN PREF.price = PROP.price THEN 
              ${weightResults[0].pricepriority / 100} -- Assign the entire weight if prices match exactly
          WHEN PREF.price BETWEEN PROP.price * 0.95 AND PROP.price * 1 THEN 
              (1 - ABS(1 - PREF.price / PROP.price)) * ${weightResults[0].pricepriority / 100} -- Assign a proportionate weight if within 5% range
          ELSE 0 -- No score for mismatched prices
      END)
       +
      (CASE 
            WHEN TRIM(UPPER(PREF.nearelementary)) = TRIM(UPPER(PROP.nearelementary)) THEN ${weightResults[0].isnearelementarypriority / 100}
        ELSE 0
        END) +
      (CASE 
            WHEN TRIM(UPPER(PREF.nearhighschool)) = TRIM(UPPER(PROP.nearhighschool)) THEN ${weightResults[0].isnearhighschoolpriority / 100}
        ELSE 0
        END) +
      (CASE 
            WHEN TRIM(UPPER(PREF.nearcollege)) = TRIM(UPPER(PROP.nearcollege)) THEN ${weightResults[0].isnearcollegepriority / 100}
        ELSE 0
        END) +
      (CASE 
          WHEN TRIM(UPPER(PREF.isnearchurch)) = TRIM(UPPER(PROP.isnearchurch)) THEN ${weightResults[0].isnearchurchpriority / 100}
          ELSE 0
        END) +
      (CASE 
          WHEN TRIM(UPPER(PREF.isnearmall)) = TRIM(UPPER(PROP.isnearmall)) THEN ${weightResults[0].isnearmallpriority / 100}
          ELSE 0
        END) +
        (CASE 
            WHEN TRIM(UPPER(PREF.businessready)) = TRIM(UPPER(PROP.businessready)) THEN ${weightResults[0].businessreadypriority / 100}
            ELSE 0
          END) +
      (CASE 
          WHEN PREF.numberofbedroom = PROP.numberofbedroom THEN ${weightResults[0].bedroompriority / 100}
          ELSE 0
        END) +
      (CASE 
          WHEN PREF.numberofbathroom = PROP.numberofbathroom THEN ${weightResults[0].bathroompriority / 100}
          ELSE 0
        END) +
      (CASE 
          WHEN PREF.typeoflot = PROP.typeoflot THEN ${weightResults[0].lottypepriority / 100}
          ELSE 0
        END) +
      (CASE 
          WHEN PREF.familysize = PROP.familysize THEN ${weightResults[0].familysizepriority / 100}
          ELSE 0
        END)) AS score
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
});
};




