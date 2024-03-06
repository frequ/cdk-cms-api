import { APIGatewayProxyEvent } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent) => {
  const getExperienceYears = () => {
    const now = new Date().getTime();
    const started = new Date("01/01/2012").getTime();
    const diff = now - started;
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  };

  const metaData = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };

  const frontendUrl = "https://github.com/frequ/frequ.github.io";
  const cmsUrl = "https://github.com/frequ/cdk-cms-api";

  const jsonResponse = {
    roles: ["Software developer", "Consultant", "Team lead"],
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Redux",
      "Zustand",
      "HTML",
      "CSS",
      "Jest & React testing library",
      "Python",
      "Golang",
      "NodeJS",
      "Github Actions",
      "PostgreSQL",
      "AWS",
    ],
    content: [
      `With over ${getExperienceYears()} years of experience in software development, I've cultivated a comprehensive understanding of the field. While my expertise lies in web front-end development, I'm equally adept at full-stack tasks. Continuously adapting to emerging technologies and methodologies is a cornerstone of my approach, reflecting the dynamic nature of our industry.`,
      "I consider myself a self-taught developer, recognizing that learning is a perpetual journey in this ever-evolving landscape.",
      "My commitment extends beyond delivering quality work. I aim to be a dependable team member who not only provides solutions but also actively seeks ways for improvement through open dialogue.",
      "Outside of coding, I find solace in nature, cherish moments with my family, and channel my energy at the gym, indulging in powerlifting pursuits.",
    ],
    footer_note_html: `This <a target="_blank" href="${frontendUrl}">application</a> leverages the server-side rendering features of SvelteKit and uses <a target="_blank" href="${cmsUrl}">AWS CDK built Lambda with API Gateway</a> as a content management system.`,
  };

  const response = {
    ...metaData,
    statusCode: 200,
    body: JSON.stringify(jsonResponse),
  };

  return response;
};
