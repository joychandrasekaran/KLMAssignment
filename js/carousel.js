//*** Object Literal Notation Pattern
//Instantiated global objects and initialized necessary values
"use strict";

let SimpleCarousel={};
SimpleCarousel.images = [];
SimpleCarousel.isAutoScrollEnabled = false;

//Function object used to create Slider specific DOM dynamically into requeired Dom
SimpleCarousel.show = function() {
    let attrId;
    let attrClass;

    let parentWrapper = document.getElementsByClassName("carousel-wrapper")[0];

    //Step2: create content Wrapper
    let contentWrapper = document.createElement("div");
    attrClass = document.createAttribute("class");
    attrClass.value ="content-wrapper";
    contentWrapper.setAttributeNode(attrClass);

    //Step5: create Image Wrapper
    let imageWrapper = document.createElement("div");
    attrClass = document.createAttribute("class");
    attrClass.value ="img-wrapper";
    imageWrapper.setAttributeNode(attrClass);

    //Step7: create Navigation Wrapper
    let navWrapper = document.createElement("div");
    attrClass = document.createAttribute("class");
    attrClass.value ="nav-wrapper";
    navWrapper.setAttributeNode(attrClass);

    //for(var i=1; i<=SimpleCarousel.images.length; i++){
    let lengthImages = SimpleCarousel.images.length;
    let i = 1;
    while(i<=lengthImages){

        //Step1: create index list
        SimpleCarousel.addIndexElement(parentWrapper, i);

        //Step4: Add content div list
        SimpleCarousel.addContentPlaceholder(contentWrapper, i);

        //Step6: Add image content list
        SimpleCarousel.addImagePlaceholder(imageWrapper, i);

        //Step8: Add nav button list
        SimpleCarousel.addNavButton(navWrapper, i);

        i+=1;
    }
    parentWrapper.appendChild(contentWrapper);
    parentWrapper.appendChild(imageWrapper);
    parentWrapper.appendChild(navWrapper);

    SimpleCarousel.initNavEvents();
};

//Supporting function: Add scroller index element
SimpleCarousel.addIndexElement = function(parentWrapper, dataIndex){
    let span = document.createElement("span");
    let attrId = document.createAttribute("id");
    attrId.value ="cimage" + dataIndex;
    span.setAttributeNode(attrId);

    let classAttr = document.createAttribute("class");
    classAttr.value = "ccimage"+dataIndex;
    span.setAttributeNode(classAttr);

    parentWrapper.appendChild(span);
};

//Supporting function: add scroll cotent element
SimpleCarousel.addContentPlaceholder = function(contentWrapper, dataIndex){
    let contentItem = document.createElement("div");
    let attrClass = document.createAttribute("class");
    attrClass.value ="content" + dataIndex + " content";
    contentItem.setAttributeNode(attrClass);
    contentItem.innerText = SimpleCarousel.images[dataIndex-1].content;
    contentWrapper.appendChild(contentItem);
};

//Supporting function: add scroll images
SimpleCarousel.addImagePlaceholder = function(imageWrapper, dataIndex){
    let imageItem = document.createElement("img");

    let attrId = document.createAttribute("class");
    attrId.value ="cimage";
    imageItem.setAttributeNode(attrId);

    let attrAlt = document.createAttribute("alt");
    attrAlt.value = "Slider page"+dataIndex;
    imageItem.setAttributeNode(attrAlt);
    imageWrapper.appendChild(imageItem);
    SimpleCarousel.asynImageLoad(imageItem, SimpleCarousel.images[dataIndex-1].image);
};

//supporting function: add navigation anchor tag
SimpleCarousel.addNavButton = function(navWrapper, dataIndex){
    let anchorItem = document.createElement("a");
    let attrHref = document.createAttribute("href");
    attrHref.value ="#cimage"+dataIndex;
    anchorItem.setAttributeNode(attrHref);

    let classAttr = document.createAttribute("class");
    classAttr.value = "cimage-move cm"+dataIndex;
    anchorItem.setAttributeNode(classAttr);

    let attrOnClick = document.createAttribute("onclick");
    attrOnClick.value = "SimpleCarousel.handleNavClick('content" + dataIndex +"', 'cm" + dataIndex + "');";
    anchorItem.setAttributeNode(attrOnClick);
    navWrapper.appendChild(anchorItem);
};

//Async Image Loading
SimpleCarousel.asynImageLoad = function(imgElement, imgPath){
    setTimeout(function() {
        imgElement.src = imgPath;
    },100);
};

///Used to initialize the necessary navigation contents and links contents
SimpleCarousel.initNavEvents = function(){
    SimpleCarousel.autoScroll();
    SimpleCarousel.hideInactiveContent();
    SimpleCarousel.handleNavClick("content1", "cm1");
};

//Used to handle navigation button options
SimpleCarousel.handleNavClick=function(btnId, selNavId) {
    SimpleCarousel.hideInactiveContent();
    let elementContent = document.getElementsByClassName(btnId)[0];
    elementContent.style.visibility = "visible";
    elementContent.style.opacity="1";

    SimpleCarousel.unselectAllNavbuttons();
    let elementButton = document.getElementsByClassName(selNavId)[0];
    elementButton.style.backgroundColor= "blue";

    SimpleCarousel.currPage = parseInt(selNavId.replace("cm",""));
};

///Supporting function. Used to hide inactive slider content
SimpleCarousel.hideInactiveContent=function() {
    let navButtons = document.getElementsByClassName("content");

    let lengthNavBtns = navButtons.length;
    let i = 0;
    while(i<lengthNavBtns){
        navButtons[i].style.visibility = "hidden";
        navButtons[i].style.opacity="0";
        i+=1;
    }
};

//Supporting function, Used to unselect navigation buttons
SimpleCarousel.unselectAllNavbuttons=function(){
    let navButtons = document.getElementsByClassName("cimage-move");

    let lengthNavBtns = navButtons.length;
    let i = 0;
    while(i<lengthNavBtns){
        navButtons[i].style.backgroundColor = "#fff";
        i+=1;
    };
};

//Supporting function, used to handle auto scroll slider
SimpleCarousel.currPage=1;
SimpleCarousel.autoScroll = function(){
    if(!SimpleCarousel.isAutoScrollEnabled) {return;}
    setInterval(function(){
        if(SimpleCarousel.currPage===6){
             SimpleCarousel.currPage=1;
        }
        let elementName= "cm" + SimpleCarousel.currPage;
        let element = document.getElementsByClassName(elementName)[0];
        element.click();
        SimpleCarousel.currPage+=1;
    },2000);
};