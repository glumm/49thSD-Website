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
// const limit = 8; 
// const baseURL = "https://ctftime.org/api/v1/events/?limit=${limit}";

// const ctfs = document.getElementById("ctfs");

// async function getCTFs() {
//   try {
//     const response = await fetch(baseURL);
//     if(!response.ok){
//       throw Error(`Error: ${response.url} ${response.statusText}`);
//     }
//     const data = await response.json();
//     processResponse(data.response);
//   } catch (error) {
//     console.log(error);
//   }
// }

// function processResponse(data) {
//   data.forEach(ctf => {
//     const ctfDiv = document.createElement("div");
//     ctfDiv.classList.add("ctf");
//     ctfDiv.innerHTML = `
//         <h3>${ctf.title}</h3>
//         <p>${ctf.description}</p>
//         <p>${ctf.start}</p>
//         <p>${ctf.url}</p>
//     `;
//     ctfs.appendChild(ctfDiv);
//   });
// }

// Constants
const limit = 3;
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

    // Filter based on Unix epoch time
    const filteredData = data.filter(
      ctf =>
        Math.floor(new Date(ctf.start).getTime() / 1000) >= currentUnix &&
        Math.floor(new Date(ctf.start).getTime() / 1000) <= futureUnix
    );

    // Process and display the filtered data
    processResponse(filteredData);
  } catch (error) {
    console.log(error);
    ctfs.innerHTML = "<p>Error fetching CTF data. Please try again later.</p>";
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

// Load CTFs when the script runs
getCTFs();