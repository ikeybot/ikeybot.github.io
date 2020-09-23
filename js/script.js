var sidebarVisible = false;
var currentPageID = "#tm-home";

// Setup SidebarNav
function setupSidebarNav() {
    // Add Event Listener to each Nav item
    $(".tm-sidebar-nav a").click(function(e){
        e.preventDefault();

        var currentSidebarNavItem = $(this);
        changePage(currentSidebarNavItem);

        setupFooter();

        // Hide the nav on mobile
        $("#tmSidebar").removeClass("show");
    });	    
}

function changePage(currentSidebarNavItem) {
    // Update SidebarNav items
    $(".tm-sidebar-nav a").removeClass("active");
    currentSidebarNavItem.addClass("active");
    
    $(currentPageID).hide();

    // Show current page
    currentPageID = currentSidebarNavItem.data("page");
    $(currentPageID).fadeIn(1000);

}

// Setup SidebarNav Toggle Button
function setupSidebarNavToggle() {
    $("#tmSidebarNavToggle").on("click", function(){
        $(".sidebar").toggleClass("show");
    });
}

// Setup SidebarNav
function setupCommandLists() {
    // Add Event Listener to each Nav item
    $(".tm-commands-nav a").click(function(){
        
        var currentCommandsNavItem = $(this); 
        loadCommandList(currentCommandsNavItem);

        setupFooter();

        // Hide the nav on mobile
        $("#tmSidebar").removeClass("show");
    });	    
}

function loadCommandList(currentCommandsNavItem) {

    // Hide current page
    $(currentPageID).hide();

    currentPageID = currentCommandsNavItem.data("page");
    $(currentPageID).fadeIn(1000);

}

// If there is enough room, stick the footer at the bottom of page content.
// If not, place it after the page content
function setupFooter() {

    var padding = 100;
    var footerPadding = 40;
    var mainContent = $("section"+currentPageID);
    var mainContentHeight = mainContent.outerHeight(true);
    var footer = $(".footer-link");
    var footerHeight = footer.outerHeight(true);
    var totalPageHeight = mainContentHeight + footerHeight + footerPadding + padding;
    var windowHeight = $(window).height();		

    if(totalPageHeight > windowHeight){
        $(".tm-content").css("margin-bottom", footerHeight + footerPadding + "px");
        footer.css("bottom", footerHeight + "px");  			
    }
    else {
        $(".tm-content").css("margin-bottom", "0");
        footer.css("bottom", "20px");  				
    }  			
}

// Everything is loaded including images.
$(window).on("load", function(){

    // Render the page on modern browser only.
    if(renderPage) {
        // Remove loader
        $('body').addClass('loaded');

        // Page transition
        var allPages = $(".tm-section");

        // Hide all pages
        allPages.hide();

        $("#tm-home").fadeIn();

        $.backstretch("./img/background.jpg", {fade: 500});

        // Setup Nav, Nav Toggle and Footer
        setupCommandLists();
        setupSidebarNav();
        setupSidebarNavToggle();
        setupFooter();

        // Resize Footer upon window resize
        $(window).resize(function() {
            setupFooter();
        });
    }	      	
});