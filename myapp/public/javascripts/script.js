// javascript for opening and closing side nav when iconbar is clicked, starts

function openNav() {
    var sideNav = document.getElementsByClassName('sidenav')[0];
    var iconBarButton = document.getElementsByClassName('iconbar')[0];
    var sidenavParent = document.querySelector('.sidenav-parent');
    sidenavParent.style.width = '100%';
    sideNav.style.width = '300px';
    iconBarButton.style.display = 'none';
}

//close sidenav when cross or outside window is clicked
var closeButton = document.getElementsByClassName('closeBtn')[0];
var sidenavParent = document.querySelector('.sidenav-parent');
var sideNav = document.getElementsByClassName('sidenav')[0];
var iconBarButton = document.getElementsByClassName('iconbar')[0];
closeButton.addEventListener('click', closeSideNav);
function closeSideNav() {
    sidenavParent.style.width = '0';
    sideNav.style.width = '0';
    iconBarButton.style.display = 'block';
}
// close sidenav + sidenav parent disply= none when anywhere outside window is clicked
var sidenavParent = document.querySelector('.sidenav-parent');
sidenavParent.addEventListener('click', closeSideNavforWindow);
function closeSideNavforWindow(e) {
    if(e.target.className == 'sidenav-parent') {
        sidenavParent.style.width = '0';
        sideNav.style.width = '0';
        iconBarButton.style.display = 'block';
    }
}
// javascript for opening and closing side nav when iconbar is clicked, ends

//sign in modal javascript starts
//open sign in modal
var parentModalSignin = document.getElementsByClassName('modal-parent-signin')[0];
var parentModalSignup = document.querySelector('.modal-parent-signup');
var parentModalGiveYourDetails = document.querySelector('.modal-parent-giveyourdetails');
    
function openSignInModal() {
    parentModalSignin.style.display = 'block';
    parentModalSignup.style.display = 'none';
    parentModalContact.style.display = 'none';
//closing sidenav when signin is clicked
    sidenavParent.style.width = '0';
    sideNav.style.width = '0';
    iconBarButton.style.display = 'block';
    //closing give details sign up modal when signin is clicked
    //parentModalGiveYourDetails.style.display = 'none';
//scroll to top
    document.body.scrollTop = 0; //For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera


}
// close sign in modal
var closeButtonModalSignin = document.getElementsByClassName('X-signin')[0];
closeButtonModalSignin.addEventListener('click', closeSigninModal);
function closeSigninModal() {
    var parentModalSignin = document.getElementsByClassName('modal-parent-signin')[0];
    parentModalSignin.style.display = 'none'; 
}
//close modal when clicked anywhere outside
var parentModalSignin = document.getElementsByClassName('modal-parent-signin')[0];
parentModalSignin.addEventListener('click', closeSigninModalForWindow);
function closeSigninModalForWindow(e) {
    if(e.target.className == 'modal-parent-signin') {
        parentModalSignin.style.display = 'none';

    }
}
//sign in modal javascript ends

//sign up modal javascript starts here
//open sign up modal when sign up button is clicked
var parentModalSignup = document.querySelector('.modal-parent-signup');
var parentModalSignin = document.getElementsByClassName('modal-parent-signin')[0];
function openSignUpModal() {
    parentModalSignup.style.display = 'block';
    parentModalSignin.style.display = 'none';
    parentModalContact.style.display = 'none';
//closing sidenav when signup is clicked
    sidenavParent.style.width = '0';
    sideNav.style.width = '0';
    iconBarButton.style.display = 'block';


    //scroll to top
    document.body.scrollTop = 0; //For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

}

//close sign up modal when close or cancel button is clicked
var parentModalSignup = document.querySelector('.modal-parent-signup');
function closeSignupModal() {
    parentModalSignup.style.display = 'none';
}

//close sign up modal when outside modal is clicked
var parentModalSignup = document.querySelector('.modal-parent-signup');
parentModalSignup.addEventListener('click', closeSignupModadforWindow);
function closeSignupModadforWindow(e) {
    if(e.target.className == 'modal-parent-signup') {
        parentModalSignup.style.display = 'none';
    }
}
//sign up modal javascript ends here

//sign up Admin modal javascript starts here
//open sign up Admin modal when sign up button is clicked
var parentModalSignupAdmin = document.querySelector('.modal-parent-signup-admin');
var parentModalSignup = document.querySelector('.modal-parent-signup');
var parentModalSignin = document.getElementsByClassName('modal-parent-signin')[0];
var parentModalContact = document.querySelector('.modal-parent-contact');

function openSignUpAdminModal() {
    parentModalSignupAdmin.style.display = 'block';
    parentModalSignup.style.display = 'none';
    parentModalSignin.style.display = 'none';
    parentModalContact.style.display = 'none';
//closing sidenav when signup Admin is clicked
    sidenavParent.style.width = '0';
    sideNav.style.width = '0';
    iconBarButton.style.display = 'block';

    

    document.body.scrollTop = 0; //For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera


}

//close sign up Admin modal when close or cancel button is clicked
var parentModalSignupAdmin = document.querySelector('.modal-parent-signup-admin');
//var parentModalSignup = document.querySelector('.modal-parent-signup');
function closeSignupAdminModal() {
    parentModalSignupAdmin.style.display = 'none';
}

//close sign up Admin modal when outside modal is clicked
var parentModalSignupAdmin = document.querySelector('.modal-parent-signup-admin');
//var parentModalSignup = document.querySelector('.modal-parent-signup');
parentModalSignupAdmin.addEventListener('click', closeSignupAdminModalforWindow);
function closeSignupAdminModalforWindow(e) {
    if(e.target.className == 'modal-parent-signup-admin') {
        parentModalSignupAdmin.style.display = 'none';
    }
}
//sign up Admin modal javascript ends here

//Give Your Details modal javascript starts here
 function openGiveYourDetailsModal() {
    var parentModalGiveYourDetails = document.querySelector('.modal-parent-giveyourdetails');

    parentModalGiveYourDetails.style.display = 'block';

 }

 function closeGiveYourDetailsModal() {
    var parentModalGiveYourDetails = document.querySelector('.modal-parent-giveyourdetails');

    parentModalGiveYourDetails.style.display = 'none';

 }
//close give your details modal on window click .. this one is not working
/*
 var parentModalGiveYourDetails = document.querySelector('.modal-parent-giveyourdetails');
 parentModalGiveYourDetails.addEventListener('click', closeGiveYourDetailsModadforWindow);
function closeGiveYourDetailsModadforWindow(e) {
    if(e.target.className == '.modal-parent-giveyourdetails') {
        parentModalGiveYourDetails.style.display = 'none';
    }
}
*/
//Give Your Details modal javascript ends here
//Website Features List Modal javascript starts here
/*
function openWebsiteFeaturesListModal() {
    var parentModalWebsiteFeaturesList = document.querySelector('.modal-parent-websitefeatureslist');

    parentModalWebsiteFeaturesList.style.display = 'block';

 }

 function closeWebsiteFeaturesListModal() {
    var parentModalWebsiteFeaturesList = document.querySelector('.modal-parent-websitefeatureslist');

    parentModalWebsiteFeaturesList.style.display = 'none';

 }
 
//View Website Features list starts here
function openViewWebsiteFeaturesListModal() {
    var parentModalViewWebsiteFeaturesList = document.querySelector('.modal-parent-viewwebsitefeatureslist');

    parentModalViewWebsiteFeaturesList.style.display = 'block';

 }

 function closeViewWebsiteFeaturesListModal() {
    var parentModalViewWebsiteFeaturesList = document.querySelector('.modal-parent-viewwebsitefeatureslist');

    parentModalViewWebsiteFeaturesList.style.display = 'none';

 }
//View Website Features list ends here
//Website Content Modal javascript starts here
function openWebsiteContentModal() {
    var parentModalWebsiteContent = document.querySelector('.modal-parent-website-content');

    parentModalWebsiteContent.style.display = 'block';

 }

 function closeWebsiteContentModal() {
    var parentModalWebsiteContent = document.querySelector('.modal-parent-website-content');

    parentModalWebsiteContent.style.display = 'none';

 }

//Website Content modal javascript ends here
//View Website Content list starts here
function openViewWebsiteContentModal() {
    var parentModalViewWebsiteContent = document.querySelector('.modal-parent-viewwebsitecontent');

    parentModalViewWebsiteContent.style.display = 'block';

 }

 function closeViewWebsiteContentModal() {
    var parentModalViewWebsiteContent = document.querySelector('.modal-parent-viewwebsitecontent');

    parentModalViewWebsiteContent.style.display = 'none';

 }
 */
//View Website Content list ends here

//Agreement Modal javascript starts here
function openAgreementModal() {
    var parentModalAgreement = document.querySelector('.modal-parent-agreement');

    parentModalAgreement.style.display = 'block';

 }

 function closeAgreementModal() {
    var parentModalAgreement = document.querySelector('.modal-parent-agreement');

    parentModalAgreement.style.display = 'none';

 }

//Agreement modal javascript ends here

// contact modal javascript starts here
//open contact modal when Contact button is clicked
function openContactModal() {
    var parentModalContact = document.querySelector('.modal-parent-contact');
    parentModalContact.style.display = 'block';
    parentModalSignin.style.display = 'none';
    parentModalSignup.style.display = 'none';
    //closing sidenav when contact is clicked
    sidenavParent.style.width = '0';
    sideNav.style.width = '0';
    iconBarButton.style.display = 'block';
    //Scroll to top
    document.body.scrollTop = 0; //For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

}

//close contat modal when Cross or Cancel button is clicked
function closeContactModal() {
    var parentModalContact = document.querySelector('.modal-parent-contact');
    parentModalContact.style.display = 'none';
}
//close contat modal when outside window is clicked
var parentModalContact = document.querySelector('.modal-parent-contact');
parentModalContact.addEventListener('click', closeContactModalforWindow);

function closeContactModalforWindow(e) {
    if(e.target.className == 'modal-parent-contact') {
        parentModalContact.style.display = 'none';  
    }
}
// contact modal javascript ends here

//footer javascript 
//tap here to go to top javascript
var tapToTopButton = document.querySelector('#taptotopButton');
tapToTopButton.addEventListener('click', goToTop);

function goToTop() {
    document.body.scrollTop = 0; //For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//Open Send Message modal 

function openSendMessageModal() {
    var sendMessageParentModal = document.querySelector('.modal-parent-send-message');
    sendMessageParentModal.style.display = 'block';
}

//Close Send Message modal on close button or cancel button click
function closeSendMessageModal() {
    var sendMessageParentModal = document.querySelector('.modal-parent-send-message');
    sendMessageParentModal.style.display = 'none';
}

//Close Send Message modal on outside window click
/*
var sendMessageParentModal = document.querySelector('.modal-parent-send-message')[0];
sendMessageParentModal.addEventListener('click', closeSendMessageModalForWindow);
function closeSendMessageModalForWindow(e) {
    if(e.target.className == 'modal-parent-send-message') {
        sendMessageParentModal.style.display = 'none';
    }
}
*/
// Open openModalStaffEditForm() 

 function openModalStaffEditForm(){
    var parentModalStaffEditForm = document.querySelector('.modal-parent-staff-edit-form');
    parentModalStaffEditForm.style.display = 'block';
 }


 // close Admin staff edit form when cancel or cross btn is clicked
 function closeModalStaffEditForm() {
    var parentModalStaffEditForm = document.querySelector('.modal-parent-staff-edit-form');
    parentModalStaffEditForm.style.display = 'none';
 }

 // close Admin staff edit form when outsidewindow is clicked
 var parentModalStaffEditForm = document.querySelector('.modal-parent-staff-edit-form');
 parentModalStaffEditForm.addEventListener('click', closeStaffEditFormModalForWindow);
  function closeStaffEditFormModalForWindow(e) {
    if (e.target.className == 'modal-parent-staff-edit-form') {
        parentModalStaffEditForm.style.display = "none";
        
    }
 }


 function showThisIdDetail() {
     document.getElementById('vip').innerHTML = 'Vipin Kamboj Kumar'
 }

 //Open  openParticularDashboard()
/* work on this when logged in as .... is clicked, then dashboard belonged to that particular id should open for eg. if admin is logged in then dashboardadmin should open, if admin staff is logged in, then dashboardadminstaff should open, in case
of employee logged in, dashboardemployee should open. when client is logged in then dashboardclient should open.
 function openParticularDashboard() { vhyj
     var admin = document.
 }

 */


 //Write a note
 /*
 var noteTitle = document.getElementById('note-title');
 var writeNoteTextArea = document.getElementById('write-note-text-area');
 var saveNoteBtn = document.getElementById('save-note-btn');
 var isOutput = document.getElementById('IsOutput');

 saveNoteBtn.onclick = function() {
     var noteKey = noteTitle.value;
     var noteValue =  writeNoteTextArea.value;

     if(noteKey && noteValue) {
        localStorage.setItem(noteKey, noteValue);
        location.reload();
     }
 }
 for(let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    isOutput.innerHTML += `${key}: ${value} <br/>`;
 }
*/

//viewmodal.ejs javascript strt here
/*
var itemPriceElements = document.getElementsByClassName('this-item-price-element');
var itemPrice;
for(i = 0; i < itemPriceElements.length; i++) {
    var itemPriceElement = itemPriceElements[i]
    var itemPrice = parseFloat(itemPriceElement.nodeValue) ;
    var totalPrice = itemPrice + itemPrice;

    
}
*/



//viewmodal.ejs javascript ends heref

//Wedding Invitation template demo javascript starts here
// Open modal RSVP

var modalParentRsvp = document.querySelector('.modal-parent-rsvp');
function openModalRsvp() {
    
       modalParentRsvp.style.display = 'block';
    
    
}
// close modal RSVP

var modalParentRsvp = document.querySelector('.modal-parent-rsvp');
modalParentRsvp.addEventListener('click', closeModal);

function closeModal(event) {
if(event.target.className = '.modal-parent-rsvp') {
    modalParentRsvp.style.display = 'none';
}
}

function closeModalRsvp() {
    var modalParentRsvp = document.querySelector('.modal-parent-rsvp');
    modalParentRsvp.style.display = 'none';
}
//Wedding Invitation template demo javascript ends here

// Freelance Work Advertisement Modal javascript starts here
//open freelance Work Advertisement Modal
/*
function openFreelanceWorkAdvertisementModal() {
    var modalParentFreelanceWork = document.getElementsByClassName('modal-parent-freelancework-advertisement')[0];
    modalParentFreelanceWork.style.display = 'block';
}
//close freelance Work Advertisement Modal
function closeFreelanceWorkAdvertisementModal() {
    var modalParentFreelanceWork = document.getElementsByClassName('modal-parent-freelancework-advertisement')[0];
    modalParentFreelanceWork.style.display = 'none';
}

//close freelance Work Advertisement Modal when outside window is clicked
/* not working
var modalParentFreelanceWork = document.getElementsByClassName('modal-parent-freelancework-advertisement')[0];
modalParentFreelanceWork.addEventListener('click', closeFreelanceWorkAdvertisementModalForWindow);
 function closeFreelanceWorkAdvertisementModalForWindow(event) {
    if(event.target.className == 'modal-parent-freelancework-advertisement')
    modalParentFreelanceWork.style.display = 'none';
}
*/
// Freelance Work Advertisement Modal javascript ends here
// Chat box modal javascript starts here
/*
function openChatBoxModal() {
    var modalParentChatbox = document.getElementsByClassName('modal-parent-chatbox')[0]; 

    document.body.scrollTop = 0; //For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    modalParentChatbox.style.display = 'block';
}

function closeChatBoxModal() {
    var modalParentChatbox = document.getElementsByClassName('modal-parent-chatbox')[0]; 

    modalParentChatbox.style.display = 'none';
}


*/
// Chat box modal javascript ends here
//dashboard get started javascript here
// Show Home Page content form in dashboardgetstarted
 /*function showHideHomePageContentForm() {
    var homePageCheckBox = document.getElementsByClassName('hompage-checkbox')[0];
    if(homePageCheckBox.checked == false) {
        var homePageContentLabel = document.getElementsByClassName('home-page-content-form')[0];
        var homePageContentTextArea = document.getElementsByClassName('home-page-content-form')[1];
        homePageContentLabel.style.display = 'none';
        homePageContentTextArea.style.display = 'none';
    } else {
        homePageContentLabel.style.display = 'block';
        homePageContentTextArea.style.display = 'block';

    }
        
}
*/
 

// Show Logo File Upload Input when "I have my on logo" is clicked.
function showLogoFileUploadInput() {
    document.getElementsByClassName('logo-file-upload-label')[0].style.display = 'block';
    document.getElementsByClassName('logo-file-upload-input')[0].style.display = 'block';
}
// hide logo file upload input if "I want to buy logo" is clicked.
function hideLogoFileUploadInput() {
    document.getElementsByClassName('logo-file-upload-label')[0].style.display = 'none';
    document.getElementsByClassName('logo-file-upload-input')[0].style.display = 'none';

}
// show backgroundcolor input and hide backgroundImage input if "I Want Back Ground color in My Website is selected" dashboardgetstarted.js

function showBackgroundColorInput() {
    //backgroundColorInput.style.display = 'block';
    document.getElementsByClassName('background-color-select-input')[0].style.display= 'inline';
    document.getElementsByClassName('background-color-select-input')[1].style.display= 'inline';
    document.getElementsByClassName('background-image-select-label')[0].style.display= 'none';
    document.getElementsByClassName('background-image-select-input')[0].style.display= 'none';

}

// show backgroundcolor input if "I Want Back Ground color in My Website is selected" dashboardgetstarted.js

function showBackgroundImageInput() {
    // hide background color input first
    document.getElementsByClassName('background-color-select-input')[0].style.display= 'none';
    document.getElementsByClassName('background-color-select-input')[1].style.display= 'none';
    document.getElementsByClassName('background-image-select-label')[0].style.display= 'inline';
    document.getElementsByClassName('background-image-select-input')[0].style.display= 'inline';

}

//

/*
if(document.readyState == 'loading')  {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeButtonsForCartItems = document.getElementsByClassName('btn-danger');
for(var i = 0; i < removeButtonsForCartItems.length; i++) {
    var removeButtonForCurrentCartItem = removeButtonsForCartItems[i];
    removeButtonForCurrentCartItem.addEventListener('click', removeCartItem}

}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
});

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for(var i = 0; i < cartRows.length; i++) {
        var currentCartRow = cartRows[i];
        var currentCartRowPriceElement = currentCartRow.getElementsByClassName('cart-price')[0];
        var currentCartRowQuantityElement = currentCartRow.getElementsByClassName('cart-quantity-input')[0]
        var currentCartRowQuantityValue = currentCartRowQuantityElement.value;
        var currentCartRowPrice = parseFloat(currentCartRowPriceElement.innerText.replace('$', ''));
        
        total = total + (currentCartRowQuantityValue*currentCartRowPrice)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}
*/