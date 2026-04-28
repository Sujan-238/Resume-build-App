// Mock OpenAI Integration
// Replace these with actual fetch calls to https://api.openai.com/v1/chat/completions when you get a key.

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const generateSummary = async (fullName, skills) => {
  await delay(1200); // Simulate network latency
  
  const skillText = skills.length > 0 ? ` skilled in ${skills.slice(0, 3).join(', ')}` : '';
  return `Detail-oriented and highly motivated software professional${skillText}. Proven ability to adapt quickly, solve complex problems, and deliver impactful results in fast-paced environments. Passionate about leveraging robust technical solutions to drive organizational success.`;
};

export const improveDescription = async (text) => {
  await delay(1500); // Simulate network latency
  
  if (!text || text.length < 10) {
    return "Optimized development workflows and spearheaded key deliverables. Collaborated cross-functionally to ensure high-quality software deployment on schedule.";
  }

  // A generic mock upgrade strategy
  return `Spearheaded software initiatives by leveraging modern technologies to improve efficiency by 30%. \nAnalyzed complex system requirements and successfully executed deliverables ahead of strictly enforced deadlines. \nCollaborated aggressively with cross-functional teams to engineer scalable solutions.`;
};

export const suggestSkills = async (jobRole) => {
  await delay(1000); // Simulate network latency
  
  const role = jobRole.toLowerCase();
  
  if (role.includes('frontend') || role.includes('react')) {
    return ['React.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Jest Testing'];
  }
  if (role.includes('backend') || role.includes('node') || role.includes('java')) {
    return ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'REST APIs', 'Microservices'];
  }
  if (role.includes('data') || role.includes('python')) {
    return ['Python', 'SQL', 'Pandas', 'Machine Learning', 'Data Visualization'];
  }
  if (role.includes('manager') || role.includes('agile')) {
    return ['Agile Scrum', 'Jira', 'Cross-functional Leadership', 'Roadmapping', 'Stakeholder Management'];
  }
  
  // Default suggestions
  return ['Critical Thinking', 'Problem Solving', 'Project Management', 'Agile Methodology', 'Team Collaboration'];
};
