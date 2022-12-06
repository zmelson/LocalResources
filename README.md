# LocalResources

Currently, there is no centralized location of information for people to access up-to-date and essential community resources such as low-cost medical clinics, food assistance distribution sites and times, and other life-saving information for those facing hardship. Those in the most need of community health resources must rely on Facebook,  word of mouth, or community health workers–all of which are extremely limited and do not keep up with the volatility of resources like food distribution events and “pop-up” clinics. Furthermore, the decentralization of information for essential resources makes finding the resource you need challenging, time-consuming, and unrealistic. 

To tackle this problem, our group created Local Resources! Local Resources is a web app to share and access information about resources for those in poverty, such as local food banks and low-cost healthcare. It is designed to be user-friendly and accessible to those who do not have a lot of technology experience, with all relevant information in one place. Additionally, those involved in community health or knowledgeable about specific resources can contribute to the website to ensure up-to-date and accurate services. Once logged in with Gmail, Contributors can edit the resource information, such as updating the days of the week a vision clinic is open or adding a new resource to the website. For example, local physicians can add services for free clinics, or community health workers can add a free food distribution event happening in a few hours! The user can filter through the resources based on a category that is relevant to them or scroll through the whole collection of resources in Gainesville.


### Website Homepage
![LocalResources Homepage](https://user-images.githubusercontent.com/56763637/205850509-8afbc647-3a03-4608-9507-027081478abf.JPG)


### Website Login
![LocalResources Google Login](https://user-images.githubusercontent.com/56763637/205850519-4a38d7ea-76f7-4f05-80a2-ffc76a7a6daf.JPG)


### Website Contribute Resource
![LocalResources Contribute Resource](https://user-images.githubusercontent.com/56763637/205850530-741d6a90-2851-4045-8f1d-55317c80e0e6.JPG)

Installation Instructions
Our end goal of the project is to host the web app online, where users will simply need to navigate to the appropriate URL to run the app. Since this is still in the proof-of-concept stage, however, the following is needed to run the application locally:
1. Retrieve the codebase from GitHub
2. Install Node.js and configure the PATH variable per website’s installation instructions
3. In a terminal, navigate to the mern/server directory of the project, and run ‘npm install’ to install packages listed in the project’s JSON files
Once packages are installed, run ‘node server.js’ to start the local server
  3a.If you receive error messages of the form “Could not find module <package name>”, run ‘npm install <package name>’ and then ‘node server.js’ again
4. Open a second terminal and navigate to the mern/client directory
5. Run ‘npm start’ to open the web app in your default browser
  5a.Depending on your machine configuration, you may receive a ‘bad option’ error. If you do, navigate to the mern/client/package.json file and remove the ‘--openssl-legacy-provider’ tag in line 17. Then save the file and try again.
