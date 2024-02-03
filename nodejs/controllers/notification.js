import "dotenv/config";
import axios from "axios";

//GET NOTIFICATION
export const getNotification = async (req, res) => {
  const lastData = null;
  try {
    const response = await axios.get(process.env.GET_CATALOGS_URL);
    const newData = response.data;

    if (JSON.stringify(newData) !== JSON.stringify(lastData)) {
      lastData = newData;
    }

    res.json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
