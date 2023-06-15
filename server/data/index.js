import mongoose from "mongoose";

const userIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];


export const coverletters = [
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[1],
        coverLetterContent: "Dear hiring manager, \
        I am a Backend Developer seeking employment for the SaaS Software Developer on the JumpCloud Team. \
        I have experience building  Full-Stack Web Applications and RESTful API's using languages and frameworks including Rails/Ruby, Node/JS, and Flask/Python. \
        I am proficient with relational databases such as PostgreSQL and document databases including MongoDB. \
        I have a strong understanding of fundamental CS concepts like Object Oriented Programming, MVC Architecture, REST, and Test Driven Development as well as experience building software with more modern techniques like GraphQL, service based architecture, and third party API integration. \
        As a team member, I bring strong git workflow practices and experience using agile methodologies to build software in a collaborative environment.\
        Before making a career change, I owned and operated a Stone Masonry business where I was responsible for all of phases of a project including working with clients on design and delivering a finished product on time.\
        I love the excitement of working in a faced paced environment and am very adaptable to change.\
        As a candidate, I possess the skills necessary to make meaningful contributions upon joining a team.\
        Thank you for considering my application and I look forward to hearing from you.\
        Best Regards,  \
        Steve Ralph",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[2],
        coverLetterContent: "Dear Hiring Manager,\
        I am writing to express my interest in your posting for a show production assistant position. I am a recent graduate in political science and communications from UCLA. This degree, combined with the extensive supplementary journalism and media courses I have taken in the US and the UK make me an excellent candidate. In addition, my three years of experience in television production, public relations, and media make me a great match for this position and a great fit with NBC.\
        My career is highlighted by consistent success in both television production, broadcast, and mass media. I am dedicated to continuous learning and delivering projects no matter the task. Recently, my position as a journalist at Channel 7 Brisbane has provided me with skills to handle the pressures on live reporting and breaking news production. Further, working as a production intern and online editor at CBS Television has given me invaluable lessons and enabled me to interface comfortably with senior stakeholders of all levels.\
        Noteworthy achievements include:\
        Successfully planned and executed corporate meetings, lunches, and special events for groups of eight or more employees.\
        Improved office efficiency by developing and implementing revitalized filing system and customer database protocols.\
        Wrote and edited Web content and CIO presentations.\
        Scheduled 10+ monthly interviews and correspondence for various executives in Television City division of CBS.\
        I am certain that my resume will provide you a greater understanding of my qualifications for this exciting opportunity. I would welcome the chance for an interview to discuss the value I offer your company at your earliest convenience.\
        I would greatly appreciate the opportunity to work with and learn from you and your talented team. I look forward to speaking with you soon.\
        Sincerely,\
        Jane Doe",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[5],
        coverLetterContent: "Application for the position of Summer Psychology Intern\
        Dear Recruiters,\
        With a great interest, I am writing in response to your advertisement for a Summer Psychology Intern job at Rabrew Clinic which was posted on LinkedIn.com. \
        I was thrilled to discover how well my qualifications align with your requirements and I strongly believe that it would be an exceptional opportunity for me to further develop my field expertise and gain important practical experience.\
        As a third-year Psychology student at the University of Bergen, I possess the crucial knowledge of different aspects of this field and multiple skills and qualities which are necessary for the role. At the university, I am among the top 10% of students with the best academic results (3.98 GPA) and I am also pro-actively involved in multiple extracurricular activities, including Dance Club, Psychology Society, and Volleyball Club. \
        The engagement in these activities has helped me to acquire better communication skills and provided me with a great chance to collaborate with people from different cultures and countries. What's more, throughout the years, I have worked on various individual Psychology projects which allowed me to develop important research and observation skills.\
        On top of my education, I worked as a Summer Psychology Intern at Arista Counseling & Psychotherapy, Inc. for three months. There, I not only participated in the creation of custom treatment plans but I also conducted professional psychological assessments, assisted in psychotherapy, communicated with patients to educate them on different mental disorders and treatment options, and maintained great patient experience and satisfaction.\
        I am a passionate and self-driven individual with excellent critical thinking skills and the important ability to remain calm in stressful situations. Last but not least, I am a native Hungarian speaker with a proficiency in English and a basic knowledge of French. Please do not hesitate to contact me if you require any additional information. Thank you for your time and I look forward to hearing back from you soon.\
        Sincerely,  \
        Harvey Dunn",
    },
];

export const users = [
    {
        _id: userIds[0],
        firstName: "test",
        lastName: "me",
        birthday: '2000-01-01',
        email: "aaaaaaa@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p11.jpeg",
        phoneNumber: "000-000-0000",
        location: "testLocation",
        industry: "testIndustry",
        desiredPay: 0,
        resumes: [],
        jobs: [],
        createdAt: 1115211422,
        updatedAt: 1115211422,
        __v: 0,
    },
    {
        _id: userIds[1],
        firstName: "Steve",
        lastName: "Ralph",
        birthday: '1998-01-01',
        email: "steve@gmail.com",
        password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p3.jpeg",
        phoneNumber: "458-123-1234",
        location: "New York, US",
        industry: "Software Development",
        desiredPay: 80000,
        resumes: [],
        jobs: [],
        createdAt: 1595589072,
        updatedAt: 1595589072,
        __v: 0,
    },
    {
        _id: userIds[2],
        firstName: "Jane",
        lastName: "Doe",
        birthday: '2000-05-04',
        email: "jane@gmail.com",
        password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
        picturePath: "p4.jpeg",
        phoneNumber: "458-9614-1234",
        location: "Montreal, CA",
        industry: "Journalism",
        desiredPay: 50000,
        resumes: [],
        jobs: [],
        createdAt: 1288090662,
        updatedAt: 1288090662,
        __v: 0,
    },
    {
        _id: userIds[3],
        firstName: "Vikash",
        lastName: "Singh",
        birthday: '1999-12-12',
        email: "vikash@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p6.jpeg",
        phoneNumber: "789-712-1234",
        location: "Mumbai, IN",
        industry: "Artificial Intelligence",
        desiredPay: 90000,
        resumes: [],
        jobs: [],
        createdAt: 1219214568,
        updatedAt: 1219214568,
        __v: 0,
    },
    {
        _id: userIds[4],
        firstName: "Mike",
        lastName: "Ross",
        birthday: '2002-03-07',
        email: "mike@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p5.jpeg",
        phoneNumber: "458-614-1234",
        location: "New York, US",
        industry: "Law",
        desiredPay: 100000,
        resumes: [],
        jobs: [],
        createdAt: 1493463661,
        updatedAt: 1493463661,
        __v: 0,
    },
    {
        _id: userIds[5],
        firstName: "Harvey",
        lastName: "Dunn",
        birthday: '1997-01-01',
        email: "harveydunn@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p7.jpeg",
        phoneNumber: "789-412-4751",
        location: "Manchester, UK",
        industry: "Psychology",
        desiredPay: 70000,
        resumes: [],
        jobs: [],
        createdAt: 1381326073,
        updatedAt: 1381326073,
        __v: 0,
    },
    {
        _id: userIds[6],
        firstName: "Carly",
        lastName: "Vowel",
        birthday: '2001-01-01',
        email: "carlyvowel@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p8.jpeg",
        phoneNumber: "458-753-1594",
        location: "Chicago, US",
        industry: "Arts",
        desiredPay: 40000,
        resumes: [],
        jobs: [],
        createdAt: 1714704324,
        updatedAt: 1642716557,
        __v: 0,
    },
    {
        _id: userIds[7],
        firstName: "Jessica",
        lastName: "Dunn",
        birthday: '2000-01-01',
        email: "jessicadunn@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p9.jpeg",
        phoneNumber: "458-914-4100",
        location: "Paris, FR",
        industry: "Biology",
        desiredPay: 55000,
        resumes: [],
        jobs: [],
        createdAt: 1369908044,
        updatedAt: 1359322268,
        __v: 0,
    },
];

export const resumes = [
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[1],
        firstName: "Steve",
        lastName: "Ralph",
        email: "steve@gmail.com",
        phoneNumber: '458-123-1234',
        location: "New York, US",
        externalLinks: "",
        education: "Bachelor in Computer Science from 2017 to 2022 at St-John's University",
        skills: "-detail oriented -team spirit - problem-solving skills",
        domainSkills: "-React - HTML/CSS/JavaScript - NoSQL databases",
        experience: "Two COOP terms",
        aboutMe: "Hello my name is Steve",
        references: "",
        userPicturePath: "p3.jpeg",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[3],
        firstName: "Vikash",
        lastName: "Singh",
        email: "vikash@gmail.com",
        phoneNumber: "789-712-1234",
        location: "Mumbai, IN",
        externalLinks: "",
        education: "Bachelor in Software Engineering from 2017 to 2022 at the University of Mumbai",
        skills: "-Time management -Can work independently",
        domainSkills: "-Sickit Learn - numpy/matplotlib - Kaggle",
        experience: "One internship at company X",
        aboutMe: "Hello my name is Vikash",
        references: "",
        userPicturePath: "p6.jpeg",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[4],
        firstName: "Mike",
        lastName: "Ross",
        email: "mike@gmail.com",
        phoneNumber: "458-614-1234",
        location: "Boston, US",
        externalLinks: "",
        education: "Bachelor of Civil Law at the University of Harvard",
        skills: "-Adaptability -Problem Solving -Goal setting",
        domainSkills: "-Speaking - Strategic comprehension - Social Perception",
        experience: "Mike has experience",
        aboutMe: "Hello my name is Mike",
        references: "",
        userPicturePath: "p5.jpeg",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[5],
        firstName: "Harvey",
        lastName: "Dunn",
        email: "harveydunn@gmail.com",
        phoneNumber: "789-412-4751",
        location: "Manchester, UK",
        externalLinks: "",
        education: "Bachelor of Psychology at Manchester University",
        skills: "-Abstract reasoning -Active listening",
        domainSkills: "-Empathy - Compassion - Problem Solving",
        experience: "Harvey has experience",
        aboutMe: "Hello my name is Mike",
        references: "",
        userPicturePath: "p7.jpeg",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[6],
        firstName: "Carly",
        lastName: "Vowel",
        email: "carlyvowel@gmail.com",
        phoneNumber: "458-753-1594",
        location: "Chicago, US",
        externalLinks: "",
        education: "Fraklin Fine Arts Center",
        skills: "painting",
        domainSkills: "domainSkills Arts",
        experience: "experience",
        aboutMe: "I am Carky",
        references: "",
        userPicturePath: "p8.jpeg",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[7],
        firstName: "Jessica",
        lastName: "Dunn",
        email: "jessicadunn@gmail.com",
        phoneNumber: "458-914-4100",
        location: "Paris, FR",
        externalLinks: "",
        education: "Ecole Supérieure des Techniques de Biologie Appliquée",
        skills: "biology skills",
        domainSkills: "biology domain skills",
        experience: "experience in biology",
        aboutMe: "I am Jessicca",
        references: "",
        userPicturePath: "p9.jpeg",
    },
];

const companyIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];

export const companies = [
    {
        _id: companyIds[0],
        companyName: "test",
        email: "aaaaaaa@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        website: "testwesbite",
        aboutUs: "testAboutUs",
        industry: "testIndustry",
        location: "testLocation",
        picturePath: "p11.jpeg",
        phoneNumber: "000-000-0000",
        ourVision: "testVision",
        specialities: "testSpecialities",
        foundationDate: '2000-01-01',
        createdAt: 1115211422,
        updatedAt: 1115211422,
        __v: 0,
    },
    {
        _id: companyIds[1],
        companyName: "Konrad",
        email: "contact@konradgroup.com",
        password: "Konrad12345!",
        website: "https://www.konrad.com",
        aboutUs: "Konrad is a digital agency and product innovation firm that offers strategy, design, and technology services to the world's most ambitious businesses and brands. Leveraging our design-driven approach to building cutting-edge digital solutions, we deliver compelling experiences to our clients and their customers. We are Born Digital. We have offices in New York, Toronto, Vancouver, London, Miami, and San Jose, employing over 500 of the world's brightest digital professionals.",
        industry: "Software Development",
        location: "New York, US",
        picturePath: "p11.jpeg",
        phoneNumber: "877-900-1856",
        ourVision: " ",
        specialities: "Digital Marketing, User Experience Design, Digital Strategy, Digital Transformation, Web Application Development, Mobile Application Development, Design Thinking, Customer Experience Design, eCommerce Strategy, User Interface Design, Innovation Strategy, and Content Management Systems",
        foundationDate: '2007-01-01',
        createdAt: 1115211422,
        updatedAt: 1115211422,
        __v: 0,
    },
    {
        _id: companyIds[2],
        companyName: "WSP Canada",
        email: "contactus@wsp.com",
        password: "Wsp7410!",
        website: "https://www.wsp.com/en-CA",
        aboutUs: "WSP Canada delivers local solutions to its clients backed by international expertise. Our company features more than 12,000 technical experts and strategic advisors in Canada, and 67,000 around the world, including engineers, technicians, scientists, planners, landscape architects and urban designers, surveyors, and environmental specialists, as well as other design, program and construction management professionals.",
        industry: "Professional Services",
        location: "Montreal, QC",
        picturePath: "p11.jpeg",
        phoneNumber: "514-340-0046",
        ourVision: "Working across the Transportation and Infrastructure, Earth and Environment, Property and Buildings and Energy, Resources and Industry sectors, our staff is dedicated to creating results that are resilient, sustainable, and climate-conscious, benefitting our communities for generations.",
        specialities: "Buildings/Bâtiment, Telecommunications/Télécommunications, Environment/Environnement, Infrastructure/Infrastructure, Power/Énergie, Transportation/Transport, Mining/Exploitation minière, and Industrial/Industrie",
        foundationDate: '1959-01-01',
        createdAt: 1115211422,
        updatedAt: 1115211422,
        __v: 0,
    },
    {
        _id: companyIds[3],
        companyName: "Flygreen",
        email: "flygreen@gmail.com",
        password: "Flygeen1945",
        website: "https://www.flygreen.co/",
        aboutUs: "Our Mission: To make private aviation sustainable by creating products and services that effectively offset or eliminate carbon pollution.",
        industry: "Airlines and Aviation",
        location: "Toronto, CA",
        picturePath: "p11.jpeg",
        phoneNumber: "888-598-5102",
        ourVision: "We are committed to making private jet charters sustainable until we can fully transition to electric aircraft. To achieve this, we have implemented several measures that promote sustainability and offset the environmental impact of our customers.",
        specialities: " ",
        foundationDate: '2014-01-01',
        createdAt: 1115211422,
        updatedAt: 1115211422,
        __v: 0,
    },
];

export const jobs = [
    {
        _id: new mongoose.Types.ObjectId(),
        companyId: companyIds[1],
        JobTitle: "Software developer (Entry-Level)",
        jobDescription: "As an entry level Software Developer you'll be tasked with working on both mobile and web applications. Working within the software development team, your duties will require you to assist in the development of consumer and enterprise applications. This role is ideal for entry level developers who feel confident in their technical ability and want to be a part of the highly-skilled development team at Konrad.",
        location: "Toronto, CA",
        aboutUs: "Konrad is a next generation digital consultancy. We are dedicated to solving complex business problems for our global clients with creative and forward-thinking solutions. Our employees enjoy a culture built on innovation and a commitment to creating best-in-class digital products in use by hundreds of millions of consumers around the world. We hire exceptionally smart, analytical, and hard working people who are lifelong learners.",
        requirements: "What You'll Do: \
        Write maintainable, testable, and performant software in collaboration with our world class team\
        Participate in code review and performing extensive testing to ensure high quality software\
        Research new technology and tools and share those findings with the team\
        Communicate clearly and effectively with all members of our team\ ",
        otherSkills: "Qualifications\
        Graduated from a Computer Science, Software Engineering, or similar program in a University or College\
        Strong command of important programming and computer science concepts\
        Ability to understand a web application and how it's built from end-to-end\
        Fundamental knowledge of core web principals (HTTP, the DOM, SSL, web servers)\
        Fluency with databases (schema design, querying, optimization etc.)\
        Great interpersonal skills - we work very closely together as a team and require a lot of communication\
        Proactive personality and a desire to deliver your best work.",
        advantages: "Perks And Benefits:\
        Mentorship Program\
        - Socials, Outings & Retreats\
        - Culture of Learning & Development\
        - Annual tech & travel allowance\
        - Comprehensive Health & Wellness Benefits Package\
        - Retirement Planning\
        - Flexible Working Hours\
        - Work from Home Flexibility\
        - Service Recognition Programs",
        picturePath: "",
        expiringDate: "2023-06-24",
        applicants: [],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        companyId: companyIds[2],
        JobTitle: "Application developer",
        jobDescription: "As an entry level Software Developer you'll be tasked with working on both mobile and web applications. Working within the software development team, your duties will require you to assist in the development of consumer and enterprise applications. This role is ideal for entry level developers who feel confident in their technical ability and want to be a part of the highly-skilled development team at Konrad.",
        location: "Toronto, CA",
        aboutUs: "WSP is one of the world's leading professional services firms. Our purpose is to future proof our cities and environments.\
        We have over 65,000 team members across the globe. In Canada, our 12,000+ people are involved in everything from environmental remediation to urban planning, \
        from engineering iconic buildings to designing sustainable transportation networks, from finding new ways to extract essential resources to developing renewable power sources for the future.\
        At WSP\
        -We value our people and our reputation\
        -We are locally dedicated with international scale\
        -We are future focused and challenge the status quo\
        -We foster collaboration in everything we do\
        -We have an empowering culture and hold ourselves accountable\
        Why WSP?\
        We value and are committed to upholding a culture of Inclusion and Belonging\
        Our Flexible Work Policy – we recognize the importance of balance in our lives and encourage you to prioritize the balance in yours. We will support you on and off the job so you can be fully present in both your work and home lives.\
        Our Hybrid Work Policy - a combination of in-person and remote working, enables us to purposefully think of how we work, who we need to work with, and where the work should be done.\
        A Canadian success story - we're proud to wear the red and white of this beautiful country and show the world what Canada has to offer.\
        Enhance the world around you - from the environment to the highways, to the buildings and the terrain, WSP is the fabric of Canada.\
        Outstanding career opportunities - we're growing and pushing ourselves every day to be greater than yesterday - we're open to your ideas and trying new things.\
        A phenomenal collaborative culture and a workforce filled with genuinely good people who are doing humbly important work. Come find out for yourself what it's like to be a part of our journey.",
        requirements: "A Day In The Life\
        Work with project managers, vendors, and business groups implementing software and delivering results on a frequent cycle\
        Produce clean, efficient code and software architecture\
        Integrate software components and third-party programs\
        Troubleshoot, debug, and upgrade existing software\
        Verify and deploy programs and systems, preferably to Azure Cloud\
        Extract, transform and load data from spreadsheets, CSV files and SQL databases\
        Read and write technical documentation ",
        otherSkills: "What You'll Bring To WSP ...\
        University Degree in Computer Science, MIS, or a similar field\
        A minimum of 3 years of experience as a developer, software engineer or similar\
        3 years use and knowledge of C#, SQL, HTML, JS, CSS\
        Familiarity with Agile development methodologies, SCRUM\
        Hands on experience with MS Development Stack: C#, SQL, SSIS, SSAS, HTML / JS / CSS\
        IIS / ASP.Net / MS SQL / Visual Studio / Azure DevOps source control and others.\
        Ability to learn new CS languages and technologies\
        Experience designing and developing Data Warehouses using Microsoft technologies\
        Experience with technical solution design and architecture\
        Experience with front-end frameworks such as Angular or ReactJS desired.\
        Experience with EarthSoft’s EQuIS is a plus.\
        Experience with Bentley’s OpenGround Cloud API and Microsoft Power BI a plus.\
        Experience w ith Machine Learning and Artificial Intelligence a plus",
        advantages: ".",
        picturePath: "",
        expiringDate: "2023-06-20",
        applicants: [],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        companyId: companyIds[3],
        JobTitle: "Jet Charter Sales Broker",
        jobDescription: "As a Jet Charter Sales Broker, you will play a critical role in helping us achieve our mission. You will be responsible for cultivating sales leads and establishing relationships with potential private jet charter clients. You will manage the entire booking process from start to finish, ensuring a smooth and exceptional customer experience. Our ideal candidate is self-motivated, resilient, and passionate about sustainable aviation. You have a proven track record of exceeding sales targets and possess exceptional communication and problem-solving skills.",
        location: "Toronto, CA",
        aboutUs: "Looking for a career with purpose? Flygreen is a jet charter broker with a mission to make private aviation sustainable while delivering exceptional travel experiences. We recognize the impact that air travel has on the environment and are committed to making a difference by creating products and services that improve the environment. We are passionate about the potential of electric aviation and intend on operating the world's first fleet of fully electric aircraft, transforming the way people fly. We are looking for like-minded individuals to join our team and help us achieve our mission.",
        requirements: "Duties & Responsibilities:\
        Manage customer inquiries and bookings for private jet charters;\
        Provide exemplary customer service and ensure a smooth booking and travel experience for clients, both in English and in French;\
        Coordinate trips with aircraft operators and FBOs in a timely manner;\
        Build and maintain relationships with customers and operators;\
        Maintain accurate and up-to-date records of customer interactions, bookings, and sales data, and provide regular reports to management;\
        Generate new business leads through networking, marketing campaigns, and other sales channels;\
        Stay up to date on market trends, competition, and customer needs to inform sales strategies and offerings;\
        Educate clients on the benefits of our private jet charter services.",
        otherSkills: "Skills & Requirements:\
        Proven track record of generating new business and exceeding sales targets;\
        Exceptional customer service skills and ability to build and maintain strong relationships with customers;\
        Strong communication, negotiation, and problem-solving skills;\
        Ability to work independently and as part of a team in a fast-paced environment;\
        Experience in aviation and chartering industries an asset;\
        Knowledge of sustainable aviation and carbon offsetting an asset.",
        advantages: "Base salary, plus commission\
        Competitive benefits\
        Please note this position is in Toronto, Ontario.",
        picturePath: "",
        expiringDate: "2023-06-30",
        applicants: [],
    },

];