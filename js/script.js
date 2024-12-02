'use strict' 

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

/**
 * End Glitch
 */

/////////////////////////////////////////////////////////////////////////

/**
 * API Usage - CTF Challenge Calendar
 */

// Constants
const limit = 5;
const currentUnix = Math.floor(Date.now() / 1000); 
const futureUnix = currentUnix + 2 * 7 * 24 * 60 * 60; 
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const baseURL = `${proxyUrl}https://ctftime.org/api/v1/events/?limit=${limit}`; 

// Container for displaying CTFs
const ctfs = document.getElementById("ctfs");

// Fetch CTF data
async function getCTFs() {
  try {
    const response = await fetch(baseURL);
    if (!response.ok) {
      throw Error(`Error: ${response.url} ${response.statusText}`);
    }
    const data = await response.json();

    const filteredData = data.filter(
      ctf =>
        Math.floor(new Date(ctf.start).getTime() / 1000) >= currentUnix &&
        Math.floor(new Date(ctf.start).getTime() / 1000) <= futureUnix
    );

    processResponse(filteredData);
  } catch (error) {
    console.log(error);
    console.log("test"); 
    ctfs.innerHTML = "<p>Error fetching CTF data. Please try again later. If you haven't already try requesting a demo from the proxy: <a href='https://cors-anywhere.herokuapp.com/corsdemo'>https://cors-anywhere.herokuapp.com/corsdemo</a></p>";
  }
}

// Process and display CTFs
function processResponse(data) {
  if (data.length === 0) {
    ctfs.innerHTML = "<p>No CTF events found for the next two weeks.</p>";
    return;
  }

  data.forEach(ctf => {
    const ctfDiv = document.createElement("div");
    ctfDiv.classList.add("ctf");
    ctfDiv.innerHTML = `
        <h3><a href="${ctf.url}" target="_blank">${ctf.title}</a></h3>
        <p><strong>Description:</strong> ${ctf.description || "N/A"}</p>
        <p><strong>Start:</strong> ${new Date(ctf.start).toLocaleString()}</p>
        <p><strong>Link:</strong> <a href="${ctf.url}" target="_blank">${ctf.url}</a></p>
    `;
    ctfs.appendChild(ctfDiv);
  });
}

if (ctfs) {
  getCTFs();
}

/**
 * End API Usage - CTF Challenge Calendar
 */