import userModel from "../models/userModel.js";

const getSuggestedConnections = async (req, res) => {
  try {
    const currentUser = await userModel
      .findById(req.user._id)
      .select("connections");

    const suggestedUsers = await userModel
      .find({
        _id: {
          $ne: req.user._id,
          $nin: currentUser.connections,
        },
      })
      .select("name username profilePicture bio")
      .limit(5);

    res.json(suggestedUsers);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const exploreProfile = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ username: req.params.username })
      .select("-password");

    if (!user) {
      console.log(error);
      res.json({ success: false, message: "User not found." });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { getSuggestedConnections, exploreProfile };
