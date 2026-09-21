/**
 * Dhruba.exe — Central Portfolio Data (JavaScript version for direct static editing)
 * You can edit this file or src/data/portfolioData.ts
 */

export const personalInfo = {
  name: "Dhruba Acharjee",
  codename: "Dhruba.exe — Engineer in Progress",
  tagline: "EEE Student | Tech Enthusiast | Creator | Future Entrepreneur",
  role: "Electrical & Electronic Engineering Student",
  age: 22,
  studentId: "24010608",
  department: "Electrical and Electronic Engineering",
  semester: "2nd Year — 2nd Semester",
  university: "Jamalpur Science & Technology University",
  presentAddress: "Jamalpur Sadar, Jamalpur, Bangladesh",
  permanentAddress: "Chandpur Sadar, Chandpur",
  nationality: "Bangladeshi",
  bioParagraph1:
    "I am Dhruba Acharjee, an Electrical and Electronic Engineering student at Jamalpur Science & Technology University. I am passionate about technology, robotics, coding, machine learning, video editing and creative problem solving.",
  bioParagraph2:
    "I enjoy learning by building projects, participating in activities, working with people and exploring new technologies.",
  avatarUrl: "./assets/profile/dhruba-avatar.jpg",
};

export const interestsSkills = [
  {
    id: "robotics",
    name: "Robotics",
    status: "Exploring",
    description: "Exploring robots, sensors, automation and embedded systems.",
  },
  {
    id: "ml",
    name: "Machine Learning",
    status: "Learning",
    description: "Interested in understanding and exploring machine learning.",
  },
  {
    id: "coding",
    name: "Coding",
    status: "Learning",
    description: "Interested in programming and problem solving.",
  },
  {
    id: "video-editing",
    name: "Video Editing",
    status: "Interested",
    description: "Interested in visual storytelling and editing.",
  },
  {
    id: "latex",
    name: "LaTeX",
    status: "Learning",
    description: "Interested in technical documentation and academic report creation.",
  },
  {
    id: "management",
    name: "Management",
    status: "Exploring",
    description: "Interested in management, leadership and organizational concepts.",
  },
];

export const projects = [
  {
    id: "fire-fighting-robot",
    number: "01",
    title: "Fire Fighting Robot",
    category: "Robotics / Embedded Systems",
    description: "A robotic project based on fire detection and automated response concepts.",
    image: "./assets/projects/fire-fighting-robot.jpg",
    technologies: ["Flame Sensors", "Microcontroller", "Motor Driver", "DC Water Pump"],
    githubUrl: "https://github.com/yourusername",
    demoUrl: "#"
  },
  {
    id: "ecg-machine",
    number: "02",
    title: "ECG Machine",
    category: "Biomedical Electronics",
    description: "A low-cost ECG monitoring project exploring ECG signal acquisition, waveform visualization and heart-rate monitoring.",
    image: "./assets/projects/ecg-machine.jpg",
    technologies: ["Analog Filtering", "Instrumentation Amp", "Electrodes", "Microcontroller"],
    githubUrl: "https://github.com/yourusername",
    demoUrl: "#"
  },
  {
    id: "home-automation",
    number: "03",
    title: "Home Automation",
    category: "Automation / Simulation",
    isSimulation: true,
    simulationPlatform: "Tinkercad",
    description: "A home automation system created as a simulation using Tinkercad.",
    image: "./assets/projects/home-automation.jpg",
    technologies: ["Tinkercad", "Arduino Simulation", "PIR Sensors", "Relays"],
    githubUrl: "https://github.com/yourusername",
    demoUrl: "#"
  },
  {
    id: "human-following-robot",
    number: "04",
    title: "Human Following Robot",
    category: "Robotics",
    description: "A robot designed to detect and follow a person/object using sensors and motor control.",
    image: "./assets/projects/human-following-robot.jpg",
    technologies: ["Ultrasonic Sensors", "Motor Driver", "Tracking Algorithm"],
    githubUrl: "https://github.com/yourusername",
    demoUrl: "#"
  }
];
