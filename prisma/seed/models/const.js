const {
  EntityStatus,
  JobOfferStatus,
  Seniority,
  UserStatus,
  UserRoles,
} = require("@prisma/client");

const statuses = Object.values(EntityStatus);

const userStatuses = [
  UserStatus.ACTIVE,
  UserStatus.INACTIVE,
  UserStatus.BLOCKED,
];

const jobOfferStatuses = [
  JobOfferStatus.DRAFT,
  JobOfferStatus.ACTIVE,
  JobOfferStatus.INACTIVE,
  JobOfferStatus.FINISHED,
];

const seniorities = [
  Seniority.TRAINEE,
  Seniority.JUNIOR,
  Seniority.MIDDLE,
  Seniority.SENIOR,
  Seniority.LEAD,
  Seniority.ARCHITECT,
];

// password: "admin",
const mockPassword =
  "$argon2id$v=19$m=65536,t=3,p=4$aoeCUKn+4UX1pkX7ESxk4g$rz+1GkqG7owCPtWSGMfg0GauPs4zhNhVmKAkhAVriQw";

const jobDescriptionHTML = `
  <h1>Job Title: Web Developer</h1>

  <h2>About Us</h2>
  <p>[Company Name] is a leading tech company that specializes in [industry/sector]. Our mission is to [mission statement]. With a focus on innovation and collaboration, we strive to create a work environment that fosters creativity and excellence.</p>

  <h2>Project Description</h2>
  <p>Join our team to work on an exciting project involving the development of a cutting-edge [describe the project]. You will have the opportunity to contribute to the entire development lifecycle, from concept to deployment, and work with a talented team of professionals.</p>

  <h2>Requirements</h2>
  <ul>
      <li>Proven experience in web development</li>
      <li>Proficient in HTML, CSS, and JavaScript</li>
      <li>Experience with responsive and mobile design</li>
      <li>Familiarity with front-end frameworks (e.g., React, Angular)</li>
      <li>Knowledge of version control systems (e.g., Git)</li>
  </ul>

  <h2>You Are the Perfect Candidate If</h2>
  <ul>
      <li>You have a passion for creating clean, efficient, and visually appealing web interfaces.</li>
      <li>You enjoy working collaboratively in a team environment.</li>
      <li>You stay updated on industry trends and emerging technologies.</li>
  </ul>

  <h2>Recruitment Process</h2>
  <p>The recruitment process consists of the following stages:</p>
  <ol>
      <li>Submit your resume and portfolio to careers@example.com.</li>
      <li>Initial screening interview with HR.</li>
      <li>Technical assessment or coding challenge.</li>
      <li>Interview with the development team.</li>
      <li>Final interview with senior management.</li>
      <li>Offer and onboarding process.</li>
  </ol>

  <h2>Benefits</h2>
  <ul>
      <li>Competitive salary based on experience and skills.</li>
      <li>Health, dental, and vision insurance.</li>
      <li>Flexible work hours and remote work options.</li>
      <li>Professional development opportunities.</li>
      <li>Collaborative and inclusive work culture.</li>
      <li>Company-sponsored social events and outings.</li>
  </ul>

  <h2>How to Apply</h2>
  <p>If you are excited about the opportunity to work with us, please send your resume and portfolio to careers@example.com.</p>

  <p>Application deadline: January 31, 2024</p>
  `;

const jobSkills = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "SQL",
  "Python",
  "Django",
  "Flask",
  "Ruby",
  "Ruby on Rails",
  "PHP",
  "Laravel",
  "Java",
  "Spring Framework",
  "C#",
  ".NET",
  "ASP.NET",
  "RESTful APIs",
  "GraphQL",
  "TypeScript",
  "Redux",
  "MobX",
  "Webpack",
  "Babel",
  "Jest",
  "Mocha",
  "Chai",
  "Git",
  "GitHub",
  "GitLab",
  "Bitbucket",
  "Agile",
  "Scrum",
  "Kanban",
  "DevOps",
  "Continuous Integration",
  "Continuous Deployment",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud Platform (GCP)",
  "Firebase",
  "Heroku",
  "JIRA",
  "Trello",
  "Slack",
  "GraphQL",
  "JSON",
  "XML",
  "OAuth",
  "JWT",
  "SASS/SCSS",
  "LESS",
  "Responsive Web Design",
  "Cross-Browser Compatibility",
  "UI/UX Design",
  "Wireframing",
  "Prototyping",
  "Adobe Creative Suite",
  "Photoshop",
  "Illustrator",
  "Sketch",
  "Figma",
  "Zeplin",
  "InVision",
  "UI Frameworks (Bootstrap, Materialize)",
  "Web Accessibility",
  "Performance Optimization",
  "Browser Developer Tools",
  "Responsive Images",
  "WebSockets",
  "WebRTC",
  "OAuth",
  "Web Security",
  "Penetration Testing",
  "Cryptography",
  "SSL/TLS",
  "OWASP Top 10",
  "Blockchain",
  "Smart Contracts",
  "Ethereum",
  "Solidity",
  "NFTs",
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing",
  "Computer Vision",
  "TensorFlow",
  "PyTorch",
  "Data Science",
  "Data Analysis",
  "Data Visualization",
  "Statistics",
  "Big Data",
  "Hadoop",
  "Spark",
  "NoSQL Databases",
  "RabbitMQ",
  "WebSocket",
  "GraphQL",
  "Microservices Architecture",
  "Serverless Architecture",
];

const mockCompanyOwner = {
  name: "Company Owner",
  email: "company@mail.com",
  password: mockPassword,
  role: UserRoles.OWNER,
  isAcceptInvite: true,
  status: UserStatus.ACTIVE,
};

module.exports = {
  mockCompanyOwner,
  statuses,
  jobOfferStatuses,
  seniorities,
  mockPassword,
  userStatuses,
  jobDescriptionHTML,
  jobSkills,
};
