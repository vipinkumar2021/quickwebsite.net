var express = require('express');
var router = express.Router();

// require dot env
require('dotenv').config();
//stripe
var cartItemsModel = require('../modules/cartitemsschema'); 
var purchasedModel = require('../modules/purchasedschema');
const { error } = require('console');
const { findByIdAndRemove, findOne } = require('../modules/cartitemsschema');
var itemId = require('./index');
//
const stripeSecretKey = process.env.STRIPE_SECRET_KEY_Test
//const stripeSecretKey = process.env.STRIPE_SECRET_KEY_Live 

//const stripePublicKey = process.env.STRIPE_PUBLIC_KEY_Test//process.env.STRIPE_PUBLIC_KEY_Live;
const stripe = require('stripe')(stripeSecretKey);


/* GET home page. */
router.get('/', async function(req, res, next) {
  var loginUser = {
    loginUserCustomer: req.session.customerLoginUserName,//localStorage.getItem('customerLoginUserName'),
    loginUserEmployee: req.session.employeeLoginUserName,//localStorage.getItem('employeeLoginUserName'),
    loginUserAdmin: req.session.adminLoginUserName//localStorage.getItem('adminLoginUserName')

  };
  
  if(loginUser.loginUserCustomer) {

    //
    const session = await stripe.checkout.sessions.retrieve(req.query.id, {
      expand: ['line_items']
    });
    //var Session = res.json(session); 

    var sessionId = session.id;
    var customerId = session.customer;
    var orderId = session.client_reference_id;
    var totalCost = session.amount_total;
    var paymentStatus = session.payment_status;
    cartItemsModel.findByIdAndRemove(orderId, function(err, itemToBeMovedToPurchased) {
      if(err) throw err;
      if(itemToBeMovedToPurchased) {
        var purchasedDetail = new purchasedModel({
          Username: loginUser.loginUserCustomer,
          CustomerId: customerId,
          ClientReferenceId: orderId,
          //
          SessionId: itemToBeMovedToPurchased.SessionId,
PaymentStatus: paymentStatus,
TemplateOption: itemToBeMovedToPurchased.TemplateOption,
TemplateOptionEstimatedTime: itemToBeMovedToPurchased.TemplateOptionEstimatedTime,
TemplateOptionPrice: itemToBeMovedToPurchased.TemplateOptionPrice,

//CustomerGivenTemplate: req.body.customertemplate,
//Basic Features
Home: itemToBeMovedToPurchased.Home,
HomePageEstimatedTime: itemToBeMovedToPurchased.HomePageEstimatedTime,
HomePagePrice: itemToBeMovedToPurchased.HomePagePrice,
HomePageContent: itemToBeMovedToPurchased.HomePageContent,

About: itemToBeMovedToPurchased.About,
AboutEstimatedTime: itemToBeMovedToPurchased.AboutEstimatedTime,
AboutPrice: itemToBeMovedToPurchased.AboutPrice,
AboutContent: itemToBeMovedToPurchased.AboutContent,

Services: itemToBeMovedToPurchased.Services,
ServicesEstimatedTime: itemToBeMovedToPurchased.ServicesEstimatedTime,
ServicesPrice: itemToBeMovedToPurchased.ServicesPrice,
ServicesContent: itemToBeMovedToPurchased.ServicesContent,

WhyUs: itemToBeMovedToPurchased.WhyUs,
WhyUsEstimatedTime: itemToBeMovedToPurchased.WhyUsEstimatedTime,
WhyUsPrice: itemToBeMovedToPurchased.WhyUsPrice,
WhyUsContent: itemToBeMovedToPurchased.WhyUsContent,

ContactUs: itemToBeMovedToPurchased.ContactUs,
ContactUsEstimatedTime: itemToBeMovedToPurchased.ContactUsEstimatedTime,
ContactUsPrice: itemToBeMovedToPurchased.ContactUsPrice,

Address: itemToBeMovedToPurchased.Address, 
PhoneNumber: itemToBeMovedToPurchased.PhoneNumber,

SocialMedia: itemToBeMovedToPurchased.SocialMedia,
SocialMediaEstimatedTime: itemToBeMovedToPurchased.SocialMediaEstimatedTime,
SocialMediaPrice: itemToBeMovedToPurchased.SocialMediaPrice,
SocialMediaLink: itemToBeMovedToPurchased.SocialMediaLink,

Policy: itemToBeMovedToPurchased.Policy,
PolicyEstimatedTime: itemToBeMovedToPurchased.PolicyEstimatedTime,
PolicyPrice: itemToBeMovedToPurchased.PolicyPrice,
PolicyContent: itemToBeMovedToPurchased.PolicyContent,

TermsAndConditions: itemToBeMovedToPurchased.TermsAndConditions,
TermsAndConditionsEstimatedTime: itemToBeMovedToPurchased.TermsAndConditionsEstimatedTime,
TermsAndConditionsPrice: itemToBeMovedToPurchased.TermsAndConditionsPrice,
TermsAndConditionsContent: itemToBeMovedToPurchased.TermsAndConditionsContent,

CopyRight: itemToBeMovedToPurchased.CopyRight,
CopyRightEstimatedTime: itemToBeMovedToPurchased.CopyRightEstimatedTime,
CopyRightPrice: itemToBeMovedToPurchased.CopyRightPrice,
CopyRightContent: itemToBeMovedToPurchased.CopyRightContent,

Logo: itemToBeMovedToPurchased.Logo,
LogoPurchasingEstimatedTime: itemToBeMovedToPurchased.LogoPurchasingEstimatedTime,
LogoPurchasingPrice: itemToBeMovedToPurchased.LogoPurchasingPrice,
LogoByCustomerEstimatedTime: itemToBeMovedToPurchased.LogoByCustomerEstimatedTime,
LogoByCustomerPrice: itemToBeMovedToPurchased.LogoByCustomerPrice,
UploadContentForLogo: itemToBeMovedToPurchased.UploadContentForLogo,

//External Features
Gallery: itemToBeMovedToPurchased.Gallery,
GalleryEstimatedTime: itemToBeMovedToPurchased.GalleryEstimatedTime,
GalleryPrice: itemToBeMovedToPurchased.GalleryPrice,
TextContentForGallery: itemToBeMovedToPurchased.TextContentForGallery,
UploadContentForGalleryOne: itemToBeMovedToPurchased.UploadContentForGalleryOne,//req.files.filename,//req.body.uploadcontentforgallery,//uploadContentForGallery,//req.files.filename,//filenameUpload,//uploadContentForGallery,//req.files.filename,//uploadContentForGallery,//req.file.uploadcontentforgallery,
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

Templates: itemToBeMovedToPurchased.Templates,
TemplatesFeatureEstimatedTime: itemToBeMovedToPurchased.TemplatesFeatureEstimatedTime,
TemplatesFeaturePrice: itemToBeMovedToPurchased.TemplatesFeaturePrice,
TextContentForTemplates: itemToBeMovedToPurchased.TextContentForTemplates,
UploadContentForTemplates: itemToBeMovedToPurchased.UploadContentForTemplates,//req.files.filename,//req.body.uploadcontentfortemplates, //uploadContentForTemplates,//req.files.filename, /*filenameUpload,*///req.files.filename,//uploadContentForGallery,//req.file.uploadcontentfortemplates,

Menu: itemToBeMovedToPurchased.Menu,
MenuEstimatedTime: itemToBeMovedToPurchased.MenuEstimatedTime,
MenuPrice: itemToBeMovedToPurchased.MenuPrice,
TextContentForMenu: itemToBeMovedToPurchased.TextContentForMenu,
UploadContentForMenu: itemToBeMovedToPurchased.UploadContentForMenu, 

// Advanced Features
RegisterLogin: itemToBeMovedToPurchased.RegisterLogin,
RegisterLoginEstimatedTime: itemToBeMovedToPurchased.RegisterLoginEstimatedTime,
RegisterLoginPrice: itemToBeMovedToPurchased.RegisterLoginPrice,

ContactUsForm: itemToBeMovedToPurchased.ContactUsForm,
ContactUsWithFormEstimatedTime: itemToBeMovedToPurchased.ContactUsWithFormEstimatedTime,
ContactUsWithFormPrice: itemToBeMovedToPurchased.ContactUsWithFormPrice,

PaymentMethod: itemToBeMovedToPurchased.PaymentMethod,
PaymentMethodEstimatedTime: itemToBeMovedToPurchased.PaymentMethodEstimatedTime,
PaymentMethodPrice: itemToBeMovedToPurchased.PaymentMethodPrice,

BankAccountAndIfsc: itemToBeMovedToPurchased.BankAccountAndIfsc,
EmailId: itemToBeMovedToPurchased.EmailId,
//Designing Features
WebsiteBackground: itemToBeMovedToPurchased.WebsiteBackground,
WebsiteBackgroundColor: itemToBeMovedToPurchased.WebsiteBackgroundColor,
WebsiteBackgroundEstimatedTime: itemToBeMovedToPurchased.WebsiteBackgroundEstimatedTime,
WebsiteBackgroundColorPrice: itemToBeMovedToPurchased.WebsiteBackgroundColorPrice,
WebsiteBackgroundImage: itemToBeMovedToPurchased.WebsiteBackgroundImage,//req.body.backgroundimage,
WebsiteBackgroundImagePrice: itemToBeMovedToPurchased.WebsiteBackgroundImagePrice,
TextColor: itemToBeMovedToPurchased.TextColor,
//Other Features or Services
EmailService: itemToBeMovedToPurchased.EmailService,
EmailServiceEstimatedTime: itemToBeMovedToPurchased.EmailServiceEstimatedTime,
EmailServicePrice: itemToBeMovedToPurchased.EmailServicePrice,
MessageService: itemToBeMovedToPurchased.MessageService,
MessageServiceEstimatedTime: itemToBeMovedToPurchased.MessageServiceEstimatedTime,
MessageServicePrice: itemToBeMovedToPurchased.MessageServicePrice,
DataBase: itemToBeMovedToPurchased.DataBase,
DataBaseEstimatedTime: itemToBeMovedToPurchased.DataBaseEstimatedTime,
DataBasePrice: itemToBeMovedToPurchased.DataBasePrice,
// Uploads
ExtraUploadedFilesNameOne: itemToBeMovedToPurchased.ExtraUploadedFilesNameOne,//uploadedFilesNames,//req.body.uploadedfilesnames,
/* uncomment later if corrected
ExtraUploadedFilesNameTwo: extraUploadedFileNameTwo,//uploadedFilesNames
ExtraUploadedFilesNameThree: extraUploadedFileNameThree,
ExtraUploadedFilesNameFour: extraUploadedFileNameFour,
ExtraUploadedFilesNameFive: extraUploadedFileNameFive,
ExtraUploadedFilesNameSix: extraUploadedFileNameSix,
 uncomment later if corrected */

//Additional
WebsiteBriefDescription: itemToBeMovedToPurchased.WebsiteBriefDescription,
Include: itemToBeMovedToPurchased.Include,
DoNotInclude: itemToBeMovedToPurchased.DoNotInclude,

//Other Charges
OtherCharges: itemToBeMovedToPurchased.OtherCharges,

          //
          //Purchased: itemToBeMovedToPurchased,
          TotalCost: totalCost/100 + ' ' + '(' + session.currency + ')'
        });
        purchasedDetail.save((err) => {
          if(err) throw err;
          res.render('success', { title: 'Quick Website', msg: 'Check Your Details in Purchased Section', loginUser: loginUser.loginUserCustomer, Session: ''/*, customer: customer */});
        });
       
      }
    })
    /*
    cartItemsModel.find({Username: loginUser.loginUserCustomer}).exec(async (err, cartItemData) => {
      if(err) throw err;
      console.log(cartItemData);
      if(cartItemData != null) {

        var sessionId = cartItemData.sessionId
        if(sessionId != '') {

          const sessionn = await stripe.checkout.sessions.retrieve(
            sessionId
          );

          console.log(sessionn);
          res.render('success', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer/*, customer: customer */ /*});
        } else {
          res.render('success', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer/*, customer: customer */ /*});
        }


        
      } else {
        res.render('success', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer/*, customer: customer */ /*});
      }
      
    });

*/
    //

    //res.render('success', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserCustomer, Session: Session/*, customer: customer */});
  } else if(loginUser.loginUserEmployee) {
    res.render('success', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserEmployee, Session: ''/*, customer: customer*/ });
  } else if(loginUser.loginUserAdmin) {
    res.render('success', { title: 'Quick Website', msg: '', loginUser: loginUser.loginUserAdmin, Session: ''/*, customer: customer*/ });
  } else {
    res.redirect('/');
    //res.render('/', { title: 'Quick Website', msg: '', loginUser: '' });
  }  
});

/*
router.get('/', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.id);
    res.json(session);  
  
});
*/



module.exports = router;
