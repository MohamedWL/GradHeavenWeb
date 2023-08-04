import Resume from "../models/Resume.js";
import User from "../models/User.js";

//CREATE

export const createResume = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const {
    highestDegree,
    fieldOfStudy,
    educationEstablishment,
    hasGraduated,
    graduationDate,
    experience,
    domSkills,
    softSkills,
    linkedInInfo,
    portfolioInfo,
    firstRefer,
    secondRef,
  } = req.body;

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      const parsedGraduationDate = new Date(graduationDate);

      const newResume = new Resume({
          userIdenditification: userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          location: user.location,
          highestDegree,
          fieldOfStudy,
          educationEstablishment,
          hasGraduated,
          graduationDate: parsedGraduationDate,
          experience,
          domainSkills: domSkills,
          skills: softSkills,
          linkedInLink:linkedInInfo,
          portfolioLink: portfolioInfo,
          firstReference: firstRefer,
          secondReference: secondRef,
      });

      console.log(newResume.firstReference);

      const savedResume = await newResume.save();
      res.status(201).json(savedResume);
  } catch (err) {
      res.status(409).json({ message: err.message });
  }
};


export const getUserResumes = async (req, res) => {
    const { id: userId } = req.params; // Assuming the userId is passed as 'id' in the request parameters
  
    try {
      // Find the resume with the given userIdenditification (userId)
      const resume = await Resume.findOne({ userIdenditification: userId });
  
      if (resume) {
        // If a resume is found, return it in the response
        res.status(200).json(resume);
      } else {
        // If no resume is found, return null or a flag value along with a message
        res.status(404).json({ resume: null });
      }
    } catch (error) {
      // Handle any potential errors during the database query
      res.status(500).json({ message: "Server error" });
    }
};


export const updateResume = async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  try {
    // Find the user by their _id (userId)
    const resume = await Resume.findOne({ userIdenditification: userId });
    if (!resume) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the resume fields if the data is not empty
    resume.linkedInLink = updatedData.linkedIn !== "" || null ? updatedData.linkedIn : resume.linkedInLink;
    resume.portfolioLink = updatedData.portfolio !== "" || null ? updatedData.portfolio : resume.portfolioLink;
    resume.highestDegree = updatedData.degree !== "" || null ? updatedData.degree : resume.highestDegree;
    resume.fieldOfStudy = updatedData.field !== "" || null ? updatedData.field : resume.fieldOfStudy;
    resume.educationEstablishment = updatedData.establishment !== "" || null ? updatedData.establishment : resume.educationEstablishment;
    resume.skills = updatedData.softSkills !== "" || null ? updatedData.softSkills : resume.skills;
    resume.domainSkills = updatedData.domSkills !== "" || null ? updatedData.domSkills : resume.domainSkills;
    resume.experience = updatedData.exper !== "" || null ? updatedData.exper : resume.experience;
    resume.firstReference = updatedData.firstRef !== "" || null ? updatedData.firstRef : resume.firstReference;
    resume.secondReference = updatedData.secondRef !== "" || null ? updatedData.secondRef : resume.secondReference;
    resume.hasGraduated = updatedData.isGrad !== "" || null ? updatedData.isGrad : resume.hasGraduated;

    // Convert updatedData.graduation to a Date if it exists
    if (updatedData.graduation !== "" && updatedData.graduation !== null) {
      resume.graduationDate = new Date(updatedData.graduation);
    } else {
      resume.graduationDate = resume.graduationDate; // Keep the previous value
    }
    // Save the updated user data
    const updatedResume = await resume.save();
    // Send the updated user data in the response
    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: "Error updating user information", error });
  }
};