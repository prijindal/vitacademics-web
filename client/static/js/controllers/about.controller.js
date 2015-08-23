angular.module('VitApp')
       .controller('aboutController', function(){
          var self = this;
          self.contributors = [
        {
            "_id": 1,
            "name": "Aneesh Neelam",
            "email": "neelam.aneesh@gmail.com",
            "role": "Former Project Manager; API Server Developer; Android Developer",
            "github_profile": "https://github.com/aneesh-neelam"
        },
        {
            "_id": 2,
            "name": "Karthik Balakrishnan",
            "email": "karthikb351@gmail.com",
            "role": "Founder; Android Developer; Legacy API Server Developer",
            "github_profile": "https://github.com/karthikb351"
        },
        {
            "_id": 3,
            "name": "Kishore Narendran",
            "email": "kishore.narendran09@gmail.com",
            "role": "API Server Developer; Legacy API Server Developer",
            "github_profile": "https://github.com/kishore-narendran"
        },
        {
            "_id": 4,
            "name": "Saurabh Joshi",
            "email": "saurabhjoshi94@outlook.com",
            "role": "Founder; Android Developer; Legacy API Server Developer",
            "github_profile": "https://github.com/saurabhsjoshi"
        },
        {
            "_id": 5,
            "name": "Siddharth Gupta",
            "email": "sids.1992@gmail.com",
            "role": "Founder; iOS/Mac Developer; Legacy API Server Developer",
            "github_profile": "https://github.com/biocross"
        },
        {
            "_id": 6,
            "name": "Ayush Agarwal",
            "email": "agarwalayush161@gmail.com",
            "role": "Project Manager; API Server Developer",
            "github_profile": "https://github.com/ayushagarwal95"
        },
        {
            "_id": 7,
            "name": "Gaurav Agerwala",
            "email": "gauravagerwala@gmail.com",
            "role": "Android Developer",
            "github_profile": "https://github.com/gauravagerwala"
        },
        {
            "_id": 8,
            "name": "Hemant Jain",
            "email": "hemanham@gmail.com",
            "role": "Android Developer",
            "github_profile": "https://github.com/CoderHam"
        },
        {
            "_id": 9,
            "name": "Pulkit Juneja",
            "email": "pulkit.16296@gmail.com",
            "role": "Android Developer",
            "github_profile": "https://github.com/b0rn2c0de"
        },
        {
            "_id": 10,
            "name": "Pratham Mehta",
            "email": "prathammehta@outlook.com",
            "role": "iOS/Mac Developer",
            "github_profile": "https://github.com/prathammehta"
        },
        {
            "_id": 11,
            "name": "Vinay Gupta",
            "email": "vinay.23.gupta@gmail.com",
            "role": "Windows Developer",
            "github_profile": "https://github.com/VinayGupta23"
        },
        {
            "_id": 12,
            "name": "Priyanshu Jindal",
            "email": "priyanshujindal1995@gmail.com",
            "role": "Web Developer",
            "github_profile": "https://github.com/prijindal"
        },
        {
            "_id": 13,
            "name": "Tushar Gupta",
            "email": "gamebot78@gmail.com",
            "role": "Designer",
            "github_profile": "https://www.behance.net/tushdesign"
        },
        {
            "_id": 14,
            "name": "Sreeram Boyapati",
            "email": "sreeram.boyapati2011@gmail.com",
            "role": "Former API Server Developer; Former Android Developer",
            "github_profile": "https://github.com/sreeram-boyapati"
        },
        {
            "_id": 15,
            "name": "Kunal Nagpal",
            "email": "kunagpal@gmail.com",
            "role": "Former API Server Developer",
            "github_profile": "https://github.com/kunagpal"
        }
    ]; 
    self.messages = [
        {
            "_id": 3,
            "message": "We are happy to inform you that the recent issue affecting our systems has been resolved. In case you are still having issues with your app, please try updating it to the latest version and refreshing the app, or resetting app/clearing app data and logging in again, or uninstalling and reinstalling the app. Please keep sharing the VITacademics app and provide us with your feedback.",
            "timestamp": "2015-07-22T18:09:09.976Z"
        },
        {
            "_id": 2,
            "message": "VIT has made certain changes in Parent Login, which has caused our systems to malfunction. We are already working on it. Please bear with us as we fix and make the app functional again.",
            "timestamp": "2015-07-21T08:18:19.133Z"
        },
        {
            "_id": 1,
            "message": "Hello and thank you for using VITacademics",
            "timestamp": "2015-06-25T08:18:19.133Z"
        }
    ]
       })