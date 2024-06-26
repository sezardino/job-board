import {
  EntityStatus,
  JobContract,
  JobOperatingMode,
  JobType,
  OfferStatus,
  Seniority,
  SkillLevel,
  UserRoles,
  UserStatus,
} from "@prisma/client";

export const statuses = Object.values(EntityStatus) as EntityStatus[];

export const userStatuses = Object.values(UserStatus) as UserStatus[];

export const jobOperatingModes = Object.values(
  JobOperatingMode
) as JobOperatingMode[];
export const jobContracts = Object.values(JobContract) as JobContract[];
export const jobOfferStatuses = Object.values(OfferStatus) as OfferStatus[];
export const jobTypes = Object.values(JobType) as JobType[];

export const seniorities = Object.values(Seniority) as Seniority[];
export const skillLevels = Object.values(SkillLevel) as SkillLevel[];

// password: "password",
export const mockPassword =
  "$argon2id$v=19$m=65536,t=3,p=4$ksL++i4JghttGKcJWzi34Q$2i5qDdlA6ClSJPhZL8HY02zguWuL6GuvvyNFCt7dbFU";

export const jobDescriptionHTML = `
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

export const jobSkills = [
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

export const mockCompanyOwner = {
  name: "Company Owner",
  email: "company@mail.com",
  password: mockPassword,
  emailToken: "123",
  role: UserRoles.OWNER,
  isAcceptInvite: true,
  emailVerified: true,
  status: UserStatus.ACTIVE,
};
