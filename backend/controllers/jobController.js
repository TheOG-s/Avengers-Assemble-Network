import companyModel from "../models/companyModel.js";
import jobModel from "../models/jobModel.js";

const addJob = async (req, res) => {
  try {
    const {
      jobTitle,
      description,
      location,
      salary,
      skills,
      experience,
      qualifications,
    } = req.body;

    const job = new jobModel({
      jobTitle,
      company: req.company.name,
      description,
      location,
      salary,
      skills: skills && skills.length > 0 ? skills : ["None"],
      experience: experience || "None",
      qualifications:
        qualifications && qualifications.length > 0 ? qualifications : ["None"],
      datePosted: Date.now(),
      status: "active",
    });

    await job.save();

    // console.log(req.company._id);
    await companyModel.findByIdAndUpdate(req.company._id, {
      $addToSet: { jobsPosted: job._id },
    });

    return res.json({ success: true, message: "Job added." });
  } catch (error) {
    console.error("Error adding job:", error);
    return res.json({ success: false, message: "Job not added." });
  }
};

const showJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await jobModel.findById(jobId);

    if (!job) {
      return res.json({ success: false, message: "Job not found." });
    }

    res.json({ success: true, job });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error finding job." });
  }
};

const showAllJob = async (req, res) => {
  try {
    const jobs = await jobModel.find(
      {},
      { jobTitle: 1, salary: 1, location: 1, company: 1 }
    );

    res.json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Could not get jobs." });
  }
};

const showAllActiveJob = async (req, res) => {
  try {
    const jobs = await jobModel.find(
      { status: "active" },
      { jobTitle: 1, salary: 1, location: 1, company: 1 }
    );

    res.json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Could not get active jobs." });
  }
};

const showCompanyJob = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await companyModel.findById(companyId);
    if (!company) {
      return res.json({ success: false, message: "Company not found." });
    }

    const jobs = await jobModel.find(
      { _id: { $in: company.jobsPosted } },
      { jobTitle: 1, salary: 1, location: 1 }
    );

    res.json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Could not get jobs." });
  }
};

const showCompanyActiveJob = async (req, res) => {
  try {
    const { companyId } = req.params;

    const company = await companyModel.findById(companyId);
    if (!company) {
      return res.json({ success: false, message: "Company not found." });
    }

    const jobs = await jobModel.find(
      {
        _id: { $in: company.jobsPosted },
        status: "active",
      },
      { jobTitle: 1, salary: 1, location: 1, company: 1 }
    );

    res.json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Could not get jobs." });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await jobModel.findById(jobId);

    if (!job) {
      return res.json({ success: false, message: "Job not found." });
    }

    job.status = job.status === "active" ? "inactive" : "active";
    await job.save();

    res.json({
      success: true,
      message: `Job status changed to ${job.status}.`,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Could not change job status." });
  }
};

const removeJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const job = await jobModel.findById(jobId);
    if (!job) {
      return res.json({ success: false, message: "Job not found." });
    }

    const companyUpdate = await companyModel.findByIdAndUpdate(
      req.company._id,
      { $pull: { jobsPosted: jobId } },
      { new: true }
    );

    if (!companyUpdate) {
      return res.json({
        success: false,
        message: "Company not found or update failed.",
      });
    }

    await jobModel.findByIdAndDelete(jobId);

    res.json({ success: true, message: "Job removed." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Could not remove job." });
  }
};

export {
  addJob,
  showJob,
  showAllJob,
  showAllActiveJob,
  showCompanyJob,
  showCompanyActiveJob,
  changeStatus,
  removeJob,
};
