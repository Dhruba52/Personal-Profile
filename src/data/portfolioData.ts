import {
  PersonalInfo,
  InterestSkill,
  Project,
  JourneyActivity,
  Competition,
  FavoriteCategory,
  Hobby,
  SocialLink,
  VisionStage,
} from '../types';

/**
 * =====================================================================
 * DHRUBA.EXE — CENTRAL PORTFOLIO CONFIGURATION DATA
 * =====================================================================
 * 
 * NOTE FOR DHRUBA:
 * To add or edit your projects, achievements, skills, or links in the future:
 * Simply modify the arrays and objects below.
 * The entire website automatically renders cards, badges, and modals from this file!
 * 
 * 1. To add a new Project -> Go to `export const projects = [...]` and add a new item.
 * 2. To update Personal Info -> Modify `export const personalInfo = {...}`.
 * 3. To add an Activity / Journey node -> Add to `export const journeyActivities = [...]`.
 * 4. To update Social Links -> Modify `export const socialLinks = [...]`.
 */

export const personalInfo: PersonalInfo = {
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
  // You can replace this image path with any personal photo in public/assets/profile/
  avatarUrl: "/assets/profile/dhruba-avatar.jpg",
};

/**
 * WHAT I LOVE TO EXPLORE (INTERESTS & SKILLS)
 * Note: Status uses literal labels: 'Interested', 'Learning', 'Exploring'
 */
export const interestsSkills: InterestSkill[] = [
  {
    id: "robotics",
    name: "Robotics",
    icon: "Bot",
    status: "Exploring",
    description: "Exploring robots, sensors, automation and embedded systems.",
    focusAreas: ["Sensor Integration", "Embedded Automation", "Motor Controllers", "Autonomous Navigation"],
  },
  {
    id: "ml",
    name: "Machine Learning",
    icon: "Brain",
    status: "Learning",
    description: "Interested in understanding and exploring machine learning.",
    focusAreas: ["Core ML Concepts", "Predictive Modeling", "Signal Pattern Analysis", "Neural Networks"],
  },
  {
    id: "coding",
    name: "Coding",
    icon: "Code2",
    status: "Learning",
    description: "Interested in programming and problem solving.",
    focusAreas: ["Algorithm Design", "Logic Building", "Microcontroller Code", "Problem Solving"],
  },
  {
    id: "video-editing",
    name: "Video Editing",
    icon: "Film",
    status: "Interested",
    description: "Interested in visual storytelling and editing.",
    focusAreas: ["Visual Storytelling", "Cinematic Cuts", "Pacing & Motion", "Audio Sync"],
  },
  {
    id: "latex",
    name: "LaTeX",
    icon: "FileText",
    status: "Learning",
    description: "Interested in technical documentation and academic report creation.",
    focusAreas: ["Academic Reports", "Formula Typography", "Technical Whitepapers", "Clean Layouts"],
  },
  {
    id: "management",
    name: "Management",
    icon: "BarChart3",
    status: "Exploring",
    description: "Interested in management, leadership and organizational concepts.",
    focusAreas: ["Team Coordination", "Strategic Planning", "Project Execution", "Resource Organization"],
  },
];

/**
 * PROJECTS I HAVE BUILT
 * To add a new project, copy an existing block and change the values!
 */
export const projects: Project[] = [
  {
    id: "fire-fighting-robot",
    number: "01",
    title: "Fire Fighting Robot",
    category: "Robotics / Embedded Systems",
    description: "A robotic project based on fire detection and automated response concepts.",
    longDescription:
      "A specialized autonomous robotic prototype designed to identify potential flame thresholds in real time using high-sensitivity flame sensors and execute automated emergency mitigation via localized pump suppression.",
    image: "/assets/projects/fire-fighting-robot.jpg",
    technologies: ["Flame Sensor Modules", "Microcontroller", "L298N Motor Driver", "DC Water Pump", "Chassis"],
    githubUrl: "https://github.com/yourusername",
    demoUrl: "#",
    features: [
      "Tri-directional flame detection array",
      "Automated servo-guided extinguishing mechanism",
      "Embedded microcontroller decision loop",
      "Rugged all-terrain tracked chassis design"
    ]
  },
  {
    id: "ecg-machine",
    number: "02",
    title: "ECG Machine",
    category: "Biomedical Electronics",
    description: "A low-cost ECG monitoring project exploring ECG signal acquisition, waveform visualization and heart-rate monitoring.",
    longDescription:
      "A biomedical electronics exploration centered around acquiring low-amplitude electrical cardiac signals using surface electrodes, filtering electromagnetic noise, and streaming clean P-Q-R-S-T cardiac waveforms.",
    image: "/assets/projects/ecg-machine.jpg",
    technologies: ["Analog Signal Processing", "Instrumentation Amplifier", "Bio-electrodes", "Microcontroller ADC", "Visualizer"],
    githubUrl: "https://github.com/yourusername",
    demoUrl: "#",
    features: [
      "High-gain analog differential filtering",
      "Electromagnetic 50/60Hz notch attenuation",
      "Real-time cardiac pulse waveform visualizer",
      "Low-cost biomedical hardware exploration"
    ]
  },
  {
    id: "home-automation",
    number: "03",
    title: "Home Automation",
    category: "Automation / Simulation",
    isSimulation: true,
    simulationPlatform: "Tinkercad",
    description: "A home automation system created as a simulation using Tinkercad.",
    longDescription:
      "A complete smart home simulation modeled on the Tinkercad platform, integrating simulated ambient light sensors, passive infrared motion detectors, and automated relays to control home lighting and appliances.",
    image: "/assets/projects/home-automation.jpg",
    technologies: ["Tinkercad", "Arduino Simulation", "PIR Motion Sensors", "Relay Controls", "LDR Photocell"],
    githubUrl: "https://github.com/yourusername",
    demoUrl: "#",
    features: [
      "Simulation Project built & verified on Tinkercad",
      "Smart ambient lighting responsive to motion",
      "Automated appliance switching logic",
      "Energy-efficient electrical load simulation"
    ]
  },
  {
    id: "human-following-robot",
    number: "04",
    title: "Human Following Robot",
    category: "Robotics",
    description: "A robot designed to detect and follow a person/object using sensors and motor control.",
    longDescription:
      "An intelligent robotic platform that calculates dynamic distance and direction of target obstacles or persons using ultrasonic sensor arrays, tracking movement while maintaining a safe obstacle-avoidance perimeter.",
    image: "/assets/projects/human-following-robot.jpg",
    technologies: ["Ultrasonic Sensors", "Motor Driver Circuitry", "Differential Drive", "Obstacle Avoidance Logic"],
    githubUrl: "https://github.com/yourusername",
    demoUrl: "#",
    features: [
      "Dynamic ultrasonic distance measurement",
      "Smooth target-following velocity control",
      "Automated collision avoidance override",
      "Responsive microcontroller closed-loop feedback"
    ]
  },
];

/**
 * JOURNEY / ACTIVITIES (CHRONOLOGICAL & LEADERSHIP)
 */
export const journeyActivities: JourneyActivity[] = [
  {
    id: "cr-eee05",
    title: "Class Representative (CR) of EEE-05 Batch",
    roleOrType: "Leadership / Student Representation",
    organization: "Jamalpur Science & Technology University (JSTU)",
    period: "From the beginning of 1st Year — Present",
    description: "Serving as the elected liaison between faculty and students, coordinating academic schedules, institutional notices, and peer problem-solving across all semesters.",
    badge: "Active Leadership",
    active: true,
  },
  {
    id: "assistant-organizing-sec",
    title: "Assistant Organizing Secretary",
    roleOrType: "Executive Club Management",
    organization: "JSTU Robotics Club",
    period: "Present",
    description: "Assisting in organizing robotics workshops, tech sessions, logistics, team building, and event planning to foster engineering enthusiasm within the university.",
    badge: "Robotics Executive",
    active: true,
  },
  {
    id: "clever-sapiens",
    title: "Founder",
    roleOrType: "Initiative & Community Building",
    organization: "Clever Sapiens",
    period: "Personal Group / Project Initiative",
    description: "A self-founded personal initiative bringing together inquisitive minds to explore tech ideas, collaborate on creative endeavors, and exchange peer knowledge.",
    badge: "Founder",
    active: true,
  },
  {
    id: "green-voice",
    title: "Volunteer",
    roleOrType: "Environmental & Social Action",
    organization: "Green Voice",
    period: "Volunteer Engagement",
    description: "Actively volunteering in environmental awareness initiatives, tree plantation drives, and student-led sustainability campaigns.",
    badge: "Volunteer",
    active: false,
  },
  {
    id: "home-tutor",
    title: "Home Tutor",
    roleOrType: "Academic Mentorship",
    organization: "Private Mentorship",
    period: "Class 10 Student",
    description: "Mentoring a secondary school student in Mathematics and Sciences, fostering clear analytical thinking and academic discipline.",
    badge: "Mentorship",
    active: false,
  },
  {
    id: "robotics-recruitment-2026",
    title: "Volunteer — Club Recruitment 2026",
    roleOrType: "Event Volunteering",
    organization: "JSTU Robotics Club",
    period: "2026",
    description: "Volunteered and supported the execution of student onboarding, orientation, and recruitment activities for the university robotics club.",
    badge: "Event Volunteer",
    active: false,
  },
];

/**
 * COMPETITIONS & EVENTS
 * Note: Strictly reflects confirmed participation (no invented awards or rankings)
 */
export const competitions: Competition[] = [
  {
    id: "robofusion-uftb",
    name: "Robofuision UFTB",
    type: "Project Showcasing",
    description: "Demonstrated and presented hands-on engineering project hardware to attendees and technical reviewers.",
  },
  {
    id: "coding-comp",
    name: "Coding Competition",
    type: "Programming Contest",
    description: "Participated in a structured coding competition solving algorithmic problem sets under time constraints.",
  },
];

/**
 * FAVORITES (ANIME, WEB SERIES, MOVIES, CARTOONS)
 */
export const favoritesData: FavoriteCategory[] = [
  {
    category: "anime",
    label: "Anime",
    icon: "Sparkles",
    items: [
      { id: "a1", title: "Black Clover", note: "Magic, grit & relentless perseverance" },
      { id: "a2", title: "Attack on Titan", note: "Epic worldbuilding, freedom & high stakes" },
      { id: "a3", title: "Naruto", note: "The foundational ninja journey & shinobi spirit" },
      { id: "a4", title: "Bleach", note: "Supernatural swordplay, Bankai & style" },
      { id: "a5", title: "The Eminence in Shadow", note: "Master of shadows, tactical humor & power" },
    ],
  },
  {
    category: "webSeries",
    label: "Web Series",
    icon: "Tv",
    items: [
      { id: "w1", title: "Game of Thrones", note: "Complex political strategy & fantasy lore" },
      { id: "w2", title: "House of the Dragon", note: "Targaryen dynasty dynamics & intense rivalries" },
      { id: "w3", title: "11 11", note: "Suspense, temporal mystery & thrill" },
    ],
  },
  {
    category: "movies",
    label: "Movies",
    icon: "Clapperboard",
    items: [
      { id: "m1", title: "Iron Man", note: "The quintessential tech engineer hero" },
      { id: "m2", title: "Avengers", note: "Earth's mightiest heroes assembly" },
      { id: "m3", title: "Avengers: Endgame", note: "The grand cinematic climax" },
      { id: "m4", title: "Harry Potter", note: "Timeless magic, mystery & camaraderie" },
      { id: "m5", title: "Narnia", note: "Fantasy gateway through the wardrobe" },
      { id: "m6", title: "I Am Legend", note: "Survival, science & resilience against the odds" },
      { id: "m7", title: "More...", note: "Sci-Fi, psychological thrillers & action films" },
    ],
  },
  {
    category: "cartoons",
    label: "Cartoons",
    icon: "Smile",
    items: [
      { id: "c1", title: "Doraemon", note: "The 22nd-century gadget cat & boundless imagination" },
      { id: "c2", title: "Tom & Jerry", note: "Pure timeless comedic physics & slapstick genius" },
      { id: "c3", title: "Mr. Bean", note: "Masterclass in non-verbal visual humor" },
    ],
  },
];

/**
 * HOBBIES
 */
export const hobbies: Hobby[] = [
  {
    id: "chess",
    name: "Chess",
    iconName: "Castle",
    tagline: "Strategy & Tactical Foresight",
    description: "Analyzing positions, calculating tempos, and learning patience through every move.",
  },
  {
    id: "badminton",
    name: "Badminton",
    iconName: "Activity",
    tagline: "Agility & Reflexes",
    description: "Fast-paced court rallies that test physical endurance, quick footwork, and instant focus.",
  },
  {
    id: "card-game-29",
    name: "29 Card Game",
    iconName: "Layers",
    tagline: "Mental Calculation & Team Chemistry",
    description: "Classic South Asian trick-taking game requiring sharp memory, bidding strategy, and trust in your partner.",
  },
  {
    id: "video-editing-hobby",
    name: "Video Editing",
    iconName: "Film",
    tagline: "Visual Craft & Storytelling",
    description: "Synthesizing raw footage, transitions, sound effects, and color grades into compelling narratives.",
  },
  {
    id: "anime-hobby",
    name: "Anime",
    iconName: "Tv2",
    tagline: "Inspiration & Artistic Escapism",
    description: "Drawing motivation from stories of underdog perseverance, technical imagination, and heroic journeys.",
  },
  {
    id: "technology-hobby",
    name: "Technology",
    iconName: "Cpu",
    tagline: "Curiosity & Experimentation",
    description: "Staying updated on emerging microelectronics, computing breakthroughs, and real-world maker tools.",
  },
];

/**
 * FUTURE VISION PATHWAY
 */
export const visionStages: VisionStage[] = [
  {
    step: 1,
    stage: "Student",
    summary: "Learning engineering and technology",
    detail: "Mastering circuit theory, microcontrollers, embedded systems, mathematical logic, and scientific foundations at JSTU.",
  },
  {
    step: 2,
    stage: "Creator",
    summary: "Building projects and exploring ideas",
    detail: "Transforming theoretical knowledge into physical prototypes, simulations, software tools, and collaborative team endeavors.",
  },
  {
    step: 3,
    stage: "Entrepreneur",
    summary: "Building meaningful businesses and ventures",
    detail: "My long-term ambition: harnessing engineering acumen and organizational leadership to establish sustainable, impactful tech ventures.",
  },
];

/**
 * PERSONAL PHILOSOPHY
 */
export const personalPhilosophy = {
  headline: "LEARN. BUILD. EXPERIENCE. LEAD.",
  quote: "I believe every project is an opportunity to learn, every challenge is an opportunity to improve, and every idea is a possibility waiting to be explored.",
  subtext: "I don't just want to learn technology. I want to use it to build something meaningful.",
};

/**
 * SOCIAL & CONTACT CHANNELS (PLACEHOLDERS)
 * Replace these placeholder links with your real handles when ready!
 */
export const socialLinks: SocialLink[] = [
  {
    id: "email",
    platform: "Email",
    url: "mailto:dhruboacharjee52@gmail.com",
    handlePlaceholder: "dhruboacharjee52@gmail.com",
    iconName: "Mail",
  },
  {
    id: "github",
    platform: "GitHub",
    url: "https://github.com/yourusername",
    handlePlaceholder: "github.com/yourusername",
    iconName: "Github",
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    handlePlaceholder: "linkedin.com/in/yourusername",
    iconName: "Linkedin",
  },
  {
    id: "facebook",
    platform: "Facebook",
    url: "https://facebook.com/yourusername",
    handlePlaceholder: "facebook.com/yourusername",
    iconName: "Facebook",
  },
  {
    id: "instagram",
    platform: "Instagram",
    url: "https://instagram.com/yourusername",
    handlePlaceholder: "instagram.com/yourusername",
    iconName: "Instagram",
  },
];
