var mongoose = require('mongoose');
require('dotenv').config();
var uri = process.env.DATABASEADMIN
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
useCreateIndex: true});
var conn = mongoose.Collection;

var cartItemsSchema = new mongoose.Schema({

Username: {
    type:String
},
TemplateOption: {
    type:String
},
TemplateOptionEstimatedTime: {
    type:String
},
TemplateOptionPrice: {
    type:String
},
Home: {
    type: String,
    //required: true
}, 
HomePageEstimatedTime: {
    type: String,
    //required: true
}, 
HomePagePrice: {
    type: String,
    //required: true
}, 
HomePageContent: {
    type: String,
    //required: true
}, 
HomePageContent: {
    type: String
    
    //required: true
},
About: {
    type: String,
    //required: true
},
AboutEstimatedTime: {
    type: String,
    //required: true
}, 
AboutPrice: {
    type: String,
    //required: true
}, 
AboutContent: {
    type: String,
    //required: true
},
Services: {
    type: String,
    //required: true
},
ServicesEstimatedTime: {
    type: String,
    //required: true
}, 
ServicesPrice: {
    type: String,
    //required: true
}, 
ServicesContent: {
    type: String,
    //required: true
},
WhyUs: {
    type: String,
    
},
WhyUsEstimatedTime: {
    type: String,
    //required: true
}, 
WhyUsPrice: {
    type: String,
    //required: true
}, 
WhyUsContent: {
    type: String,
    //required: true
},
ContactUs: {
    type: String,
    //required: true
},
ContactUsEstimatedTime: {
    type: String,
    //required: true
},
ContactUsPrice: {
    type: String,
    //required: true
},
Address: {
    type: String,
    //required: true
},
PhoneNumber: {
    type: String,
    //required: true
},
SocialMedia: {
    type: String
},
SocialMediaEstimatedTime: {
    type: String,
    //required: true
},
SocialMediaPrice: {
    type: String,
    //required: true
},
SocialMediaLink: {
    type: String,
    //required: true
},
Policy: {
    type: String,
    //required: true
},
PolicyEstimatedTime: {
    type: String,
    //required: true
},
PolicyPrice: {
    type: String,
    //required: true
},
PolicyContent: {
    type: String,
    //required: true
},
TermsAndConditions: {
    type: String,
    //required: true
},
TermsAndConditionsEstimatedTime: {
    type: String,
    //required: true
},
TermsAndConditionsPrice: {
    type: String,
    //required: true
},
TermsAndConditionsContent: {
    type: String,
    //required: true
},
CopyRight: {
    type: String,
    //required: true
},
CopyRightEstimatedTime: {
    type: String,
    //required: true
},
CopyRightPrice: {
    type: String,
    //required: true
},
CopyRightContent: {
    type: String
},
Logo: {
    type: String,
    //required: true
},
LogoPurchasingEstimatedTime: {
    type: String,
    //required: true
},
LogoPurchasingPrice: {
    type: String,
    //required: true
},
LogoByCustomerEstimatedTime: {
    type: String,
    //required: true
},
LogoByCustomerPrice: {
    type: String,
    //required: true
},
//External Features
Gallery: {
    type: String,
    //required: true
},
GalleryEstimatedTime: {
    type: String,
    //required: true
},
GalleryPrice: {
    type: String,
    //required: true
},
TextContentForGallery: {
    type: String,
    //required: true
},
UploadContentForGallery: {
    type: String,
    //required: true
},
Templates: {
    type: String,
    //required: true
},
TemplatesFeatureEstimatedTime: {
    type: String,
    //required: true
},
TemplatesFeaturePrice: {
    type: String,
    //required: true
},
TextContentForTemplates: {
    type: String,
    //required: true
},
UploadContentForTemplates: {
    type: String,
    //required: true
},
Menu: {
    type: String,
    //required: true
},
MenuEstimatedTime: {
    type: String,
    //required: true
},
MenuPrice: {
    type: String,
    //required: true
},
TextContentForMenu: {
    type: String,
    //required: true
},
UploadContentForMenu: {
    type: String,
    //required: true
},
//Advanced Features
RegisterLogin: {
    type: String,
    //required: true
},
RegisterLoginEstimatedTime: {
    type: String,
    //required: true
},
RegisterLoginPrice: {
    type: String,
    //required: true
},

ContactUsForm: {
    type: String,
    //required: true
},
ContactUsWithFormEstimatedTime: {
    type: String,
    //required: true
},
ContactUsWithFormPrice: {
    type: String,
    //required: true
},
PaymentMethod: {
    type: String,
    //required: true
},
PaymentMethodEstimatedTime: {
    type: String,
    //required: true
},
PaymentMethodPrice: {
    type: String,
    //required: true
},
BankAccountAndIfsc: {
    type: String,
    //required: true
},
EmailId: {
    type: String,
},
// Designing Features
WebsiteBackground: {
    type: String,
},
WebsiteBackgroundColor: {
    type: String,
},
WebsiteBackgroundEstimatedTime: {
    type: String,
},
WebsiteBackgroundColorPrice: {
    type: String,
},

WebsiteBackgroundImage: {
    type: String,
},
WebsiteBackgroundImagePrice: {
    type: String,
},
TextColor: {
    type: String,
},
/*
EmailService: {
    type: String,
    //required: true
},
MessageService: {
    type: String,
    //required: true
},
DataBase: {
    type: String,
    //required: true
},
/*

BackgroundColor: {
    type: String,
    //required: true
},
TextColor: {
    type: String,
    //required: true
},
LogoByCustomer: {
    type: String,
    //required: true
},
LogoContentByCustomer: {
    type: String,
    //required: true
},




WebsiteBriefDescription: {
    type: String,
    //required: true
},
Include: {
    type: String,
    //required: true
},
DoNotInclude: {
    type: String,
    //required: true
},

UploadFilesNames: {
    type: String
},
*/
Date: {
    type: Date,
    default: Date.now
}
});

var cartItemsModel = mongoose.model('cartitems', cartItemsSchema);
module.exports = cartItemsModel;
