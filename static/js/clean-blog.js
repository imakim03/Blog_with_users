(function($) {
  "use strict"; // Start of use strict

  // Floating label headings for the contact form
  $("body").on("input propertychange", ".floating-label-form-group", function(e) {
    $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
  }).on("focus", ".floating-label-form-group", function() {
    $(this).addClass("floating-label-form-group-with-focus");
  }).on("blur", ".floating-label-form-group", function() {
    $(this).removeClass("floating-label-form-group-with-focus");
  });

  // Show the navbar when the page is scrolled up
  var MQL = 992;

  //primary navigation slide-in effect
  if ($(window).width() > MQL) {
    var headerHeight = $('#mainNav').height();
    $(window).on('scroll', {
        previousTop: 0
      },
      function() {
        var currentTop = $(window).scrollTop();
        //check if user is scrolling up
        if (currentTop < this.previousTop) {
          //if scrolling up...
          if (currentTop > 0 && $('#mainNav').hasClass('is-fixed')) {
            $('#mainNav').addClass('is-visible');
          } else {
            $('#mainNav').removeClass('is-visible is-fixed');
          }
        } else if (currentTop > this.previousTop) {
          //if scrolling down...
          $('#mainNav').removeClass('is-visible');
          if (currentTop > headerHeight && !$('#mainNav').hasClass('is-fixed')) $('#mainNav').addClass('is-fixed');
        }
        this.previousTop = currentTop;
      });
  }

})(jQuery); // End of use strict

// contact form
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var formData = new FormData(this);
  var xhr = new XMLHttpRequest();

  xhr.open("POST", "https://formspree.io/f/xnqezzyo");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          var messageDiv = document.getElementById("confirm_msg");
          if (xhr.status === 200) {
              messageDiv.style.color = "green";
              messageDiv.textContent = "Your message has been sent, thank you for contacting me!";
          } else {
              messageDiv.style.color = "red";
              messageDiv.textContent = "There was an error sending your message. Please try again later.";
          }
      }
  };
  xhr.send(formData);
});
