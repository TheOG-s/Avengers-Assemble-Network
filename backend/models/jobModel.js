import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    required: false,
  },
  experience: {
    type: String,
    required: false,
  },
  qualification: {
    type: Array,
    required: false,
  },
  salary: {
    type: Number,
    required: true,
  },
});

const jobModel = mongoose.models.job || mongoose.model("job", jobSchema);

export default jobModel;
