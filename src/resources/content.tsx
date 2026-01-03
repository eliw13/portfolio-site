import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Eli",
  lastName: "Waterkotte",
  name: `Eli Waterkotte`,
  role: "Applications Analyst/Photographer",
  avatar: "/images/avatar-eli.jpg",
  email: "example@gmail.com",
  location: "America/Chicago", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: [], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/once-ui-system",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/company/once-ui/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/once_ui/",
    essential: false,
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@once_ui",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building bridges between design and code</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
    I'm Eli, a design engineer at <Text as="span" size="xl" weight="strong">ONCE UI</Text>, where I craft intuitive <br /> user experiences. After hours, I build my own projects.
</>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Eli is an Illinois-based Applications Analyst and photographer with a passion for technology
        and automation. With experience in application development, IT support, and systems automation,
        Eli helps organizations streamline their processes and enhance their technology infrastructure.
        When not working with technology, Eli enjoys photography, gaming, and spending time with loved ones.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Illinois State University",
        timeframe: "July 2023 - Present",
        role: "Applications Analyst",
        achievements: [
          <>
            Configure, support, and maintain various applications vital to the Division of Student Affairs.
          </>,
          <>
            Develop web applications utilizing low code development tools to enhance efficiency.
          </>,
          <>
            Ensure the security of applications and sensitive data.
          </>,
          <>
            Collaborate within the Student Affairs IT Applications team to meet functional and technical requirements.
          </>,
          <>
            Play a pivotal role in enhancing technology resources for students and staff at ISU, thereby contributing to their success, safety, and overall experience.
          </>,
        ],
        images: [],
      },
      {
        company: "United Community Bank IL",
        timeframe: "January 2023 - August 2023",
        role: "Systems/Automations Engineer I & IT Help Desk Technician",
        achievements: [
          <>
            Designed, developed, and implemented automated solutions to streamline backend processes.
          </>,
          <>
            Wrote scripts to automate repetitive tasks and developed custom integrations between software systems.
          </>,
          <>
            Monitored and maintained automated systems, troubleshot technical problems, and performed system upgrades.
          </>,
          <>
            Provided technical support to end-users and managed computer replacements and imaging for new hires.
          </>,
        ],
        images: [],
      },
      {
        company: "Illinois College",
        timeframe: "September 2021 - January 2023",
        role: "Student Developer & Student Technician",
        achievements: [
          <>
            Maintained infrastructure of underlying automations using Microsoft Power Automate.
          </>,
          <>
            Overhauled the college mobile application based on student feedback to better suit new and current students.
          </>,
          <>
            Helped maintain the technology infrastructure and provided tech support.
          </>,
        ],
        images: [],
      },
      {
        company: "Illinois REALTORS®",
        timeframe: "May 2022 - August 2022",
        role: "Information Technology Intern",
        achievements: [
          <>
            Maintained office technology and provided tech support to staff members.
          </>,
          <>
            Worked on SharePoint environment projects and automated tasks using Microsoft Power Automate.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Illinois College",
        description: <>Bachelor's degree, Computer Science (August 2019 - May 2023)</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Programming Languages",
        description: (
          <>Proficient in multiple programming languages for application development and automation.</>
        ),
        tags: [
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "Python",
            icon: "python",
          },
          {
            name: "TypeScript",
            icon: "typescript",
          },
          {
            name: "PowerShell",
            icon: "powershell",
          },
          {
            name: "CSS",
            icon: "css",
          },
        ],
        images: [],
      },
      {
        title: "Front-End Design",
        description: (
          <>Building modern, responsive web applications with cutting-edge frameworks and libraries.</>
        ),
        tags: [
          {
            name: "React",
            icon: "react",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "HTML/CSS",
            icon: "html",
          },
        ],
        images: [],
      },
      {
        title: "Back-End Development",
        description: (
          <>Designing and implementing server-side logic and API integrations.</>
        ),
        tags: [
          {
            name: "Node.js",
            icon: "nodejs",
          },
          {
            name: "API Development",
            icon: "api",
          },
        ],
        images: [],
      },
      {
        title: "Databases",
        description: (
          <>Experience with both SQL and NoSQL databases for data management and storage.</>
        ),
        tags: [
          {
            name: "SQL",
            icon: "database",
          },
          {
            name: "Supabase",
            icon: "supabase",
          },
          {
            name: "Firebase",
            icon: "firebase",
          },
        ],
        images: [],
      },
      {
        title: "DevOps & Tools",
        description: (
          <>Utilizing modern development tools and automation platforms to streamline workflows.</>
        ),
        tags: [
          {
            name: "Git/GitHub",
            icon: "github",
          },
          {
            name: "ServiceNow",
            icon: "servicenow",
          },
          {
            name: "Active Directory",
            icon: "activedirectory",
          },
          {
            name: "SCCM",
            icon: "sccm",
          },
          {
            name: "Power Automate",
            icon: "automation",
          },
          {
            name: "VS Code",
            icon: "code",
          },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
