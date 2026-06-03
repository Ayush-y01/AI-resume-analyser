import TryCatch from "../middlewares/trycatch.js";
export const loginUser = TryCatch(async (req, res) => {
    const { email } = req.body;
    res.json(email);
});
