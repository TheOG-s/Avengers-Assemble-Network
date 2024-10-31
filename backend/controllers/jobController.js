import jobModel from "../models/jobModel.js";

const addJob = async (req, res) => {
  try {
    const {
      jobTitle,
      company,
      description,
      location,
      salary,
      skills,
      experience,
      qualifications,
    } = req.body;

    const parsedSkills =
      skills && JSON.parse(skills).length > 0 ? JSON.parse(skills) : "None";
    const parsedQualifications =
      qualifications && JSON.parse(qualifications).length > 0
        ? JSON.parse(qualifications)
        : "None";

    const job = new jobModel({
      jobTitle,
      company,
      description,
      location,
      salary,
      skills: parsedSkills,
      experience: experience || "None",
      qualifications: parsedQualifications,
      datePosted: Date.now(),
    });

    await job.save();

    return res.json({ success: true, message: "Job added." });
  } catch (error) {
    console.error("Error adding job:", error);
    return res.json({ success: false, message: "Job not added." });
  }
};

const showJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const job = await jobModel.findById(jobId);
    res.json({ success: true, job });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Could not find job." });
  }
};

const showAllJob = async (req, res) => {
  try {
    const jobs = await jobModel.find({});
    res.json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Could not get jobs." });
  }
};

const removeJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    await jobModel.findByIdAndDelete(jobId);
    res.json({ success: true, message: "Job removed" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Could not remove jobs." });
  }
};

export { addJob, showJob, showAllJob, removeJob };
