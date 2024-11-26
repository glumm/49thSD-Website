'uses strict' 

/**
 * Dark Mode Toggle
**/
const darkModeToggle = document.getElementById('darkmode-toggle');
const body = document.body;

// darkModeToggle.addEventListener('change', () => {
//     document.body.classList.toggle('dark-mode');   
// });

if(localStorage.getItem('dark-mode') === 'enabled'){
    body.classList.add('dark-mode');
    darkModeToggle.checked = true; 
}

darkModeToggle.addEventListener('change', () => {
    if(darkModeToggle.checked){
        body.classList.add('dark-mode');
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('dark-mode', 'disabled');
    }
});
/**
 * End Dark Mode Toggle
**/

/////////////////////////////////////////////////////////////////////////

/**
 * Accordion Toggle for Announcements & Events Page
**/
const showMore = document.getElementById("show-more");

showMore.addEventListener("change", () => {
    const announcements = document.querySelectorAll(".announcement");
    announcements.forEach((announcement, index) => {
        if (index >= 3) {
            announcement.classList.toggle("hide");
        }
    });
});
/**
 * End Accordion
**/

/////////////////////////////////////////////////////////////////////////

/**
 * Glitch Animation for title text
 */
const letters = "!@#$%^&*()_+[]{}|;:,.<>?/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

let interval = null;

const title = document.getElementById("title")

if(title){
  title.onmouseover = event => {  //switch to .querySelector(h1) to display on all pages
    let iteration = 0;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return event.target.dataset.value[index];
          }
        
          return letters[Math.floor(Math.random() * 26)]
        })
        .join("");
      
      if(iteration >= event.target.dataset.value.length){ 
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 25);
  }
}

