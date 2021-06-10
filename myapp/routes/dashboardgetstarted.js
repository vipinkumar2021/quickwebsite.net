var express = require('express');
  var router = express.Router();
  var cartItemsModel = require("../modules/cartitemsschema");
  //var uploadModel = require("../modules/uploadschema");
  /* GET home page. */

router.get('/', function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  if(loginUser.loginUserCustomer) {
    res.render('dashboardgetstarted', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer });
  } else if(loginUser.loginUserEmployee) {
    res.render('dashboardgetstartedemployee', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee });
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardgetstartedadmin', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserAdmin });

  } else {
    res.render('getstarted', { title: 'Quick Website', msg: '', loginUser: '' });
  }
  //res.render('dashboardgetstarted', { title: 'Quick Website'});
});

//
// Correct One starts
//Require multer for file upload
var multer = require('multer');
//require path
var path = require('path');
router.use(express.static(path.join(__dirname, './public')));
//Set Storage Engine for file to be stored
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `./public/uploads/`)
  }, 
  
  filename: function(req, file, cb) {
   /* for(var i = 0; i < files.length; i++) {
      file = files[i];
      cb(null, `${Date.now()}_${file.fieldname}${path.extname(file.originalname)}`);
    } */   
    
    cb(null, `${Date.now()}_${file.fieldname}${path.extname(file.originalname)}`);
  }
  
  /* Correct One so far
  filename: function(req, file, cb) {
    
    
    cb(null, Date.now() + '_' + file.fieldname + '_' + path.extname(file.originalname));
  }
  */
});


//init upload correct one starts here
/*
const filesForGalleryUpload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter: function(req, file, cb) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
}).single('uploadcontentforgallery');
 Correct One Ends*/
//
const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000000},    
  fileFilter: function(req, file, cb) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
});

var multipleUploads = upload.fields([{name: 'uploadcontentforlogo', maxCount: 1}, { name: 'uploadcontentforgallery', maxCount: 1}, {name: 'uploadcontentfortemplates', maxCount: 1}, {name: 'uploadcontentformenu', maxCount: 1}, {name: 'backgroundimage', maxCount: 1}, {name: 'uploadedfilesnames', maxCount: 1}]);//.single('uploadcontentforgallery');//fields([{name: "uploadcontentforgallery", maxCount: 1}, {name: "uploadcontentfortemplates", maxCount: 1}]);

//
var aws = require("aws-sdk");
  const ses = new aws.SES({"accessKeyId": process.env.SES_I_AM_USER_ACCESS_KEY, "secretAccessKey": process.env.SES_I_AM_USER_SECRET_ACCESS_KEY, "region": process.env.AWS_SES_REGION});

router.post('/', multipleUploads, function(req, res, next) {
  //console.log(req.files);
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  var currentAccountUsername = loginUser.loginUserCustomer || loginUser.loginUserEmployee || loginUser.loginUserAdmin;
//

if(loginUser.loginUserCustomer) {  

  // Correct One
  
  // for Upload Content For Gallery
  /*
  if(req.files['uploadcontentforgallery'][0] == undefined || req.files['uploadcontentfortemplates'][0] == undefined) {
    var uploadContentForGallery = 'No Image Selected';
  } else {
    uploadContentForGallery = req.files.filename;
  }
  */
  /*if(req.files == undefined) {
    var uploadContentForGallery = 'No Image Selected';//req.file.filename;
  } else {
    uploadContentForGallery = filename;
  }
*/

console.log(req.files); //showing both files
console.log('Vipin');
console.log(typeof req.files)
//console.log(req.file.filename);
//console.log(req.files.uploadcontentforgallery[0].filename);
//console.log(req.files.uploadcontentforgallery.filename);
//Correct One is this one   console.log(req.files.uploadcontentforgallery[0].filename);
/*
if(req.files.uploadcontentforgallery[0]) {
  var uploadContentForGallery = req.files.uploadcontentforgallery[0].filename;
} else {
  uploadContentForGallery = 'No Image Selected';
}
*/
/*
if(req.files == null) {
  var uploadContentForGallery = 'No Image Selected';
} else {
  uploadContentForGallery = req.files.uploadcontentforgallery[0].filename;
}
*/
/*if(req.files == undefined || req.files == null) {
  var uploadContentForGallery = 'No Image Selected';
} else {
  var filename = req.files.uploadcontentforgallery[0].filename;
  uploadContentForGallery = filename;
} */
//var uploadContentForGallery = 'No Image Selected';
 
//var uploadContentForGallery = 'No Image Selected'// || req.files.uploadcontentforgallery[0].filename;
/*if(req) {
  var uploadContentForGallery = req.files.uploadcontentforgallery[0].filename;
} else {
  uploadContentForGallery = 'No Image Selected!'
}*/

//var uploadContentForGallery = req.files.uploadcontentforgallery;//req.files.uploadcontentforgallery[0].filename;//req.files.fieldname//req.body.fieldname;//'No Image Selected';  
// Exactly Correct One
// Exactly Correct One
if(req.files.uploadcontentforlogo) {
  var uploadContentForLogo = req.files.uploadcontentforlogo[0].filename;
} else {
  uploadContentForLogo = 'No Logo Image Provided'
}
//
if(req.files.uploadcontentforgallery) {
  var uploadContentForGalleryOne = req.files.uploadcontentforgallery[0].filename;
} else {
  uploadContentForGalleryOne = 'No Gallery Image Selected'
}
/* uncomment later if corrected
if(req.files.uploadcontentforgallery) {
  var uploadContentForGalleryTwo = req.files.uploadcontentforgallery[1].filename;
} else {
  uploadContentForGalleryTwo = 'No Gallery Image Selected'
}

if(req.files.uploadcontentforgallery) {
  var uploadContentForGalleryThree = req.files.uploadcontentforgallery[2].filename;
} else {
  uploadContentForGalleryThree = 'No Gallery Image Selected'
}

if(req.files.uploadcontentforgallery) {
  var uploadContentForGalleryFour = req.files.uploadcontentforgallery[3].filename;
} else {
  uploadContentForGalleryFour = 'No Gallery Image Selected'
}

if(req.files.uploadcontentforgallery) {
  var uploadContentForGalleryFive = req.files.uploadcontentforgallery[4].filename;
} else {
  uploadContentForGalleryFive = 'No Gallery Image Selected'
}

if(req.files.uploadcontentforgallery) {
  var uploadContentForGallerySix = req.files.uploadcontentforgallery[5].filename;
} else {
  uploadContentForGallerySix = 'No Gallery Image Selected'
}

if(req.files.uploadcontentforgallery) {
  var uploadContentForGallerySeven = req.files.uploadcontentforgallery[6].filename;
} else {
  uploadContentForGallerySeven = 'No Gallery Image Selected'
}

if(req.files.uploadcontentforgallery) {
  var uploadContentForGalleryEight = req.files.uploadcontentforgallery[7].filename;
} else {
  uploadContentForGalleryEight = 'No Gallery Image Selected'
}

if(req.files.uploadcontentforgallery) {
  var uploadContentForGalleryNine = req.files.uploadcontentforgallery[8].filename;
} else {
  uploadContentForGalleryNine = 'No Gallery Image Selected'
}  

if(req.files.uploadcontentforgallery) {
  var uploadContentForGalleryTen = req.files.uploadcontentforgallery[9].filename;
} else {
  uploadContentForGalleryTen = 'No Gallery Image Selected'
}

uncomment later if corrected */

//
if(req.files.uploadcontentfortemplates) {
  var uploadContentForTemplates = req.files.uploadcontentfortemplates[0].filename;
} else {
  uploadContentForTemplates = 'No Template Image Selected'
}

if(req.files.uploadcontentformenu) {
  var uploadContentForMenu = req.files.uploadcontentformenu[0].filename;
} else {
  uploadContentForMenu = 'No Menu Image Selected'
}

if(req.files.backgroundimage) {
  var backgroundImage = req.files.backgroundimage[0].filename;
} else {
  backgroundImage = 'No Background Image Selected'
}
//
if(req.files.uploadedfilesnames) {
  var extraUploadedFileNameOne = req.files.uploadedfilesnames[0].filename;
} else {
  extraUploadedFileNameOne = 'No Extra File Uploaded'
}
/* uncomment later if corrected
if(req.files.uploadedfilesnames) {
  var extraUploadedFileNameTwo = req.files.uploadedfilesnames[1].filename;
} else {
  extraUploadedFileNameTwo = 'No Extra File Uploaded'
}

if(req.files.uploadedfilesnames) {
  var extraUploadedFileNameThree = req.files.uploadedfilesnames[2].filename;
} else {
  extraUploadedFileNameThree = 'No Extra File Uploaded'
}

if(req.files.uploadedfilesnames) {
  var extraUploadedFileNameFour = req.files.uploadedfilesnames[3].filename;
} else {
  extraUploadedFileNameFour = 'No Extra File Uploaded'
}

if(req.files.uploadedfilesnames) {
  var extraUploadedFileNameFive = req.files.uploadedfilesnames[4].filename;
} else {
  extraUploadedFileNameFive = 'No Extra File Uploaded'
}

if(req.files.uploadedfilesnames) {
  var extraUploadedFileNameSix = req.files.uploadedfilesnames[5].filename;
} else {
  extraUploadedFileNameSix = 'No Extra File Uploaded'
}
 uncomment later if corrected */


 
/*
if(req.files.uploadedfilesnames) {
  var extraUploadedFileNameThree = req.files.uploadedfilesnames[2].filename;
} else {
  extraUploadedFileNameThree = 'No Extra File Uploaded'
}

if(req.files.uploadedfilesnames) {
  var ExtraUploadedFileNameFour = req.files.uploadedfilesnames[3].filename;
} else {
  extraUploadedFileNameFour = 'No Extra File Uploaded'
}

if(req.files.uploadedfilesnames) {
  var extraUploadedFileNameFive = req.files.uploadedfilesnames[4].filename;
} else {
  extraUploadedFileNameFive = 'No Extra File Uploaded'
}

if(req.files.uploadedfilesnames) {
  var extraUploadedFileNameSix = req.files.uploadedfilesnames[5].filename;
} else {
  extraUploadedFileNameSix = 'No Extra File Uploaded'
}

if(req.files.uploadedfilesnames) {
  var extraUploadedFileNameSeven = req.files.uploadedfilesnames[6].filename;
} else {
  extraUploadedFileNameSeven = 'No Extra File Uploaded'
}

if(req.files.uploadedfilesnames) {
  var extraUploadedFileNameEight = req.files.uploadedfilesnames[7].filename;
} else {
  extraUploadedFileNameEight = 'No Extra File Uploaded'
}

if(req.files.uploadedfilesnames) {
  var extraUploadedFileNameNine = req.files.uploadedfilesnames[8].filename;
} else {
  extraUploadedFileNameNine = 'No Extra File Uploaded'
}

if(req.files.uploadedfilesnames) {
  var extraUploadedFileNameTen = req.files.uploadedfilesnames[9].filename;
} else {
  extraUploadedFileNameTen = 'No Extra File Uploaded'
}

*/
/*
 console.log(req.files, req.body);
  
  

  */

var cartItemsList = new cartItemsModel({
  
Username: currentAccountUsername,
SessionId: '',
PaymentStatus: '',
TemplateOption: req.body.template,
TemplateOptionEstimatedTime: req.body.templateoptionestimatedtime,
TemplateOptionPrice: req.body.templateoptionprice,

//CustomerGivenTemplate: req.body.customertemplate,
//Basic Features
Home: req.body.home,
HomePageEstimatedTime: req.body.homepageestimatedtime,
HomePagePrice: req.body.homepageprice,
HomePageContent: req.body.homepagecontent,

About: req.body.about ,
AboutEstimatedTime: req.body.aboutestimatedtime,
AboutPrice: req.body.aboutprice,
AboutContent: req.body.aboutcontent,

Services: req.body.services ,
ServicesEstimatedTime: req.body.servicesestimatedtime,
ServicesPrice: req.body.servicesprice,
ServicesContent: req.body.servicescontent,

WhyUs: req.body.whyus ,
WhyUsEstimatedTime: req.body.whyusestimatedtime,
WhyUsPrice: req.body.whyusprice,
WhyUsContent: req.body.whyuscontent,

ContactUs: req.body.contactusonlyaddress ,
ContactUsEstimatedTime: req.body.contactusestimatedtime,
ContactUsPrice: req.body.contactusprice,

Address: req.body.address , 
PhoneNumber: req.body.phonenumber ,

SocialMedia: req.body.socialmedia,
SocialMediaEstimatedTime: req.body.socialmediaestimatedtime,
SocialMediaPrice: req.body.socialmediaprice,
SocialMediaLink: req.body.socialmedialink ,

Policy: req.body.policy ,
PolicyEstimatedTime: req.body.policyestimatedtime,
PolicyPrice: req.body.policyprice,
PolicyContent: req.body.policycontent,

TermsAndConditions: req.body.termsandconditions ,
TermsAndConditionsEstimatedTime: req.body.termsandconditionsestimatedtime,
TermsAndConditionsPrice: req.body.termsandconditionsprice,
TermsAndConditionsContent: req.body.termsandconditionscontent,

CopyRight: req.body.copyright ,
CopyRightEstimatedTime: req.body.copyrightestimatedtime,
CopyRightPrice: req.body.copyrightprice,
CopyRightContent: req.body.copyrightcontent,

Logo: req.body.logo,
LogoPurchasingEstimatedTime: req.body.logopurchasingestimatedtime,
LogoPurchasingPrice: req.body.logopurchasingprice,
LogoByCustomerEstimatedTime: req.body.logobycustomerestimatedtime,
LogoByCustomerPrice: req.body.logobycustomerprice,
UploadContentForLogo: uploadContentForLogo,

//External Features
Gallery: req.body.gallery ,
GalleryEstimatedTime: req.body.galleryestimatedtime,
GalleryPrice: req.body.galleryprice,
TextContentForGallery: req.body.textcontentforgallery,
UploadContentForGalleryOne: uploadContentForGalleryOne,//req.files.filename,//req.body.uploadcontentforgallery,//uploadContentForGallery,//req.files.filename,//filenameUpload,//uploadContentForGallery,//req.files.filename,//uploadContentForGallery,//req.file.uploadcontentforgallery,
/* uncomment later if corrected
UploadContentForGalleryTwo: uploadContentForGalleryTwo,
UploadContentForGalleryThree: uploadContentForGalleryThree,
UploadContentForGalleryFour: uploadContentForGalleryFour,
UploadContentForGalleryFive: uploadContentForGalleryFive,
UploadContentForGallerySix: uploadContentForGallerySix,
UploadContentForGallerySeven: uploadContentForGallerySeven,
UploadContentForGalleryEight: uploadContentForGalleryEight,
UploadContentForGalleryNine: uploadContentForGalleryNine,
UploadContentForGalleryTen: uploadContentForGalleryTen,
 uncomment later if corrected */

Templates: req.body.templatesfeature ,
TemplatesFeatureEstimatedTime: req.body.templatesfeatureestimatedtime,
TemplatesFeaturePrice: req.body.templatesfeatureprice,
TextContentForTemplates: req.body.textcontentfortemplates,
UploadContentForTemplates: uploadContentForTemplates,//req.files.filename,//req.body.uploadcontentfortemplates, //uploadContentForTemplates,//req.files.filename, /*filenameUpload,*///req.files.filename,//uploadContentForGallery,//req.file.uploadcontentfortemplates,

Menu: req.body.menu ,
MenuEstimatedTime: req.body.menuestimatedtime,
MenuPrice: req.body.menuprice,
TextContentForMenu: req.body.textcontentformenu,
UploadContentForMenu: uploadContentForMenu, 

// Advanced Features
RegisterLogin: req.body.registerlogin,
RegisterLoginEstimatedTime: req.body.registerloginestimatedtime,
RegisterLoginPrice: req.body.registerloginprice,

ContactUsForm: req.body.contactuswithform,
ContactUsWithFormEstimatedTime: req.body.contactuswithformestimatedtime,
ContactUsWithFormPrice: req.body.contactuswithformprice,

PaymentMethod: req.body.paymentmethod,
PaymentMethodEstimatedTime: req.body.paymentmethodestimatedtime,
PaymentMethodPrice: req.body.paymentmethodprice,

BankAccountAndIfsc: req.body.bankaccountandifsc,
EmailId: req.body.emailid,
//Designing Features
WebsiteBackground: req.body.websitebackground,
WebsiteBackgroundColor: req.body.backgroundcolor,
WebsiteBackgroundEstimatedTime: req.body.websitebackgroundestimatedtime,
WebsiteBackgroundColorPrice: req.body.websitebackgroundcolorprice,
WebsiteBackgroundImage: backgroundImage,//req.body.backgroundimage,
WebsiteBackgroundImagePrice: req.body.websitebackgroundimageprice,
TextColor: req.body.textcolor,
//Other Features or Services
EmailService: req.body.emailservice ,
EmailServiceEstimatedTime: req.body.emailserviceestimatedtime ,
EmailServicePrice: req.body.emailserviceprice ,
MessageService: req.body.messageservice ,
MessageServiceEstimatedTime: req.body.messageserviceestimatedtime ,
MessageServicePrice: req.body.messageserviceprice ,
DataBase: req.body.database ,
DataBaseEstimatedTime: req.body.databaseestimatedtime ,
DataBasePrice: req.body.databaseprice ,
// Uploads
ExtraUploadedFilesNameOne: extraUploadedFileNameOne,//uploadedFilesNames,//req.body.uploadedfilesnames,
/* uncomment later if corrected
ExtraUploadedFilesNameTwo: extraUploadedFileNameTwo,//uploadedFilesNames
ExtraUploadedFilesNameThree: extraUploadedFileNameThree,
ExtraUploadedFilesNameFour: extraUploadedFileNameFour,
ExtraUploadedFilesNameFive: extraUploadedFileNameFive,
ExtraUploadedFilesNameSix: extraUploadedFileNameSix,
 uncomment later if corrected */

//Additional
WebsiteBriefDescription: req.body.websitebriefdescription ,
Include: req.body.include ,
DoNotInclude: req.body.donotinclude,

//Other Charges
OtherCharges: req.body.othercharges


//
/*
//UploadFilesNames: uploadedFilesName,

//AboutContent: aboutContentImageName,

//ServicesContent: req.file.servicescontentfile, 

//WhyUsContent: req.file.whyuscontentfile,




BackgroundColor: req.body.backgroundcolor ,
TextColor: req.body.textcolor ,
LogoByCustomer: req.body.logobycustomer , 


TemplatesTextContent: req.body.templatefeaturetextcontent ,
TemplatesUploadContent: req.body.templatefeaturecontentfiles ,

MenuContent: req.body.menucontent ,
TextColor: req.body.textcolor ,
RegisterLogin: req.body.registerlogin ,
ContactUsForm: req.body.contactuswithform,
PaymentMethod: req.body.paymentmethod ,


*/
});
cartItemsList.save((err) => {
  if(err) throw err;

  //Send Email
  var output = `
  <h3>Hi, You Have received a new Order</h3>
  <p>
  ${cartItemsList}
  </p>   
`;

// exactly correct one for production
let params = {
// send to list
Destination: {
    ToAddresses: [
        'vipinkmboj211@gmail.com'
    ]
},
Message: {
    Body: {
        Html: {
            Charset: "UTF-8",
            Data: output//"<p>this is test body.</p>"
        },
        Text: {
            Charset: "UTF-8",
            Data: 'Text Message goes here'
        }
    },
    
    Subject: {
        Charset: 'UTF-8',
        Data: "New Order Through Quick Website"
    }
},
Source: 'vipinkmboj21@gmail.com', // must relate to verified SES account
ReplyToAddresses: [
    'vipinkmboj211@gmail.com',
],
};

// this sends the email
ses.sendEmail(params, (err) => {
var loginUser = {
  loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
  loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
  loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

};
if(err) {
  //res.render('signupcustomer', { title: 'frontendwebdeveloper', msg:'Contact Error, Try Again', adminDetails: ''}); 
//throw err;

if(loginUser.loginUserCustomer) {
  res.render('dashboardcustomer', { title: 'Quick Website', msg:'Error Occured, Try Again!', loginUser: loginUser.loginUserCustomer });
} else if(loginUser.loginUserEmployee){
  res.render('dashboardemployees', { title: 'Quick Website', msg:'Error Occured, Try Again!', loginUser: loginUser.loginUserEmployee });
} else if(loginUser.loginUserAdmin) {
  res.render('dashboardadmin', { title: 'Quick Website', msg:'Error Occured, Try Again!', loginUser: loginUser.loginUserAdmin});
} else {
  //res.redirect('index');    
  res.render('index', {title: 'Quick Website', msg: 'Contact Error, Try Again!' });

}  

} else {    

  if(loginUser.loginUserCustomer) {
    res.render('dashboardgetstarted', { title: 'Quick Website', msg: 'Item Added To Cart', loginUser: loginUser.loginUserCustomer });
  } else if(loginUser.loginUserEmployee) {
    res.render('dashboardgetstartedemployee', { title: 'Quick Website', msg: 'Item Added To Cart', loginUser: loginUser.loginUserEmployee });
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardgetstartedadmin', { title: 'Quick Website', msg: 'Item Added To Cart', loginUser: loginUser.loginUserAdmin });

  } else {
    res.redirect('/');
    //res.render('getstarted', { title: 'Quick Website', msg: '', loginUser: '' });
  }
  //res.render('signupcustomer', { title: 'frontendwebdeveloper', msg:'Please check the One Time Password (OTP) sent to your Email and enter it here', adminDetails: ''}); 
}
});
//

  
});
//
} else {
  res.redirect('/');
}
  });
/*
  router.post('/', (req, res, next) => {
    var cartItemsList = new cartItemsModel({
      /*
      PizzaRestaurantTemplate: req.body.template ,
      CateringTemplate: req.body.template ,
      ModalRestaurantTemplate: req.body.template ,
      CafeTemplate: req.body.template ,
      PortfolioTemplate: req.body.template ,
      ResumeTemplate: req.body.template ,
      PhotoPortfolioTemplate: req.body.template ,
      NaturePortfolioTemplate: req.body.template ,
      ClothingStoreTemplate: req.body.template ,
      BlogTemplate: req.body.template ,
      FoodBlogTemplate: req.body.template ,
      FashionBlogTemplate: req.body.template ,
    CafeBlogTemplate: req.body.template ,
    TravelBlogTemplate: req.body.template ,
    WeddingInvitationTemplate: req.body.template , 
    WebPageTemplate: req.body.template ,
    ComingSoonTemplate: req.body.template , 
    BandTemplate: req.body.template ,
    PhotoAlbumTemplate: req.body.template ,
    CustomerGivenTemplate: req.body.customertemplate ,
    */
   /*
    TemplateOption: req.body.template,
    CustomerGivenTemplate: req.body.customertemplate,
    Home: req.body.home ,
    About: req.body.about ,
    Services: req.body.services , 
    WhyUs: req.body.whyus ,
    ContactUs: req.body.contactus , 
    Address: req.body.address , 
    PhoneNumber: req.body.phonenumber , 
    SocialMediaLink: req.body.socialmedialink ,
    Policy: req.body.policy ,
    TermsAndConditions: req.body.termsandconditions ,
    CopyRight: req.body.copyright ,
    BackgroundColor: req.body.backgroundcolor ,
    TextColor: req.body.textcolor ,
    LogoByCustomer: req.body.logobycustomer , 
    LogoPurchasing: req.body.logopurchasing ,
    Gallery: req.body.gallery ,
    GalleryContent: req.body.gallerycontent ,
    Templates: req.body.templatesfeature ,
    TemplatesTextContent: req.body.templatesfeaturetextcontent ,
    TemplatesUploadContent: req.body.templatesfeatureuploadcontent ,
    Menu: req.body.menu ,
    MenuContent: req.body.menucontent ,
    TextColor: req.body.textcolor ,
    RegisterLogin: req.body.registerlogin ,
    ContactUsForm: req.body.contactusform ,
    PaymentMethod: req.body.paymentmethod ,
    EmailService: req.body.emailservice ,
    MessageService: req.body.messageservice ,
    DataBase: req.body.database ,
    WebsiteBriefDescription: req.body.websitebriefdescription ,
    Include: req.body.include ,
    DoNotInclude: req.body.donotinclude 

    });
    cartItemsList.save((err) => {
      if(err) throw err;
      /*
      var loginUser = {
        loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
        loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
        loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')
    
      };
  if(loginUser.loginUserCustomer) {
    res.render('dashboardwebsite', { title: 'Front End Web Developer', msg:'Message Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserCustomer });
  } else if(loginUser.loginUserEmployee){
    res.render('dashboardwebsite', { title: 'Front End Web Developer', msg:'Message Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserEmployee });
  } else if(loginUser.loginUserAdmin) {
    res.render('dashboardwebsiteadmin', { title: 'Front End Web Developer', msg:'Message Submitted Successfully, You will be contacted soon. Thanks!', loginUser: loginUser.loginUserAdmin});
  } else {
    //res.redirect('index');
    
    res.render('index', {title: 'Music-Website', msg: 'Message Submitted Successfully, You will be contacted soon. Thanks!' });
  
  }
     */
    /*
  res.render('dashboardgetstarted', {title: 'Quick Website', msg: 'Items Added to Cart' });
    });
    
  });
*/
  module.exports = router;