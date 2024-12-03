// Function to fetch data from Google Sheets through backend
function fetchContent() {
    fetch('https://syntropy.vercel.app/api/server')  // Make a request to backend API
        .then(response => response.json())
        .then(data => {
            const rows = data.data;

            // Loop through each row and populate the content
            rows.forEach(row => {
                const pageName = row[0];
                const content = row[1];
                const description = row[2];
                const imageURL = row[3];

                // Dynamically handle content for each page
                if (pageName === 'Home') {
                    populatePage('homepage', content, description, imageURL);
                } else if (pageName === 'About Us') {
                    populatePage('about', content, description, imageURL);
                } else if (pageName === 'Services') {
                    populatePage('services', content, description, imageURL);
                } else if (pageName === 'Contact Us') {
                    populatePage('contact', content, description, imageURL);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching Google Sheets data:', error);

            // Set a default error message for all pages
            ['homepage', 'about', 'services', 'contact'].forEach(page => {
                populatePage(page, 'Sorry, content failed to load.', 'Sorry, content failed to load.', '');
            });
        });
}

// Helper function to populate content for a page
function populatePage(pagePrefix, content, description, imageURL) {
    const titleElement = document.getElementById(`${pagePrefix}-title`);
    const descriptionElement = document.getElementById(`${pagePrefix}-description`);
    const imageElement = document.getElementById(`${pagePrefix}-image`);

    if (titleElement) titleElement.innerText = content; // Populate title
    if (descriptionElement) descriptionElement.innerText = description; // Populate description
    if (imageElement) imageElement.src = imageURL; // Populate image
}

// Fetch the content when the page loads
document.addEventListener('DOMContentLoaded', fetchContent);

// Changes nav bar to white and nav link items to black on scroll
window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 0) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Swiper js
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  
  function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("active");
  }
