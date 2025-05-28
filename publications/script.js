/*---------------------------------------*\ 
    AUTHOR: A.M.M. Elsayed   
    * ALL RIGHTS RESERVED *
\*---------------------------------------*/

// Store publications data globally
let publicationsData = [];

// Fetch and store JSON data
function fetchJSONData() {
    fetch('publications/publications.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            publicationsData = data; // Store data globally
            displayPublications(publicationsData); // Display all publications initially
        })
        .catch(error => console.error('Error loading publications:', error));
}

// Display publications without filtering or highlighting
function displayPublications(data) {
    const publicationsList = document.getElementById('publications-list');
    publicationsList.innerHTML = ''; // Clear existing content
    data.forEach(pub => {
        const pubElement = document.createElement('div');
        pubElement.classList.add('publication');
        pubElement.innerHTML = `
            <div class="content">
                <p style="color: navy;"><em><b>${pub.paper_type}</b></em></p>
                <h2>${pub.title}</h2>
                <p><em>${pub.date}, ${pub.journal}</em></p>
                <p id="abstract"><b>Abstract:</b> ${pub.description}</p>
                <p id="doi-link"><b>DOI:</b> <a href="${pub.link}" target="_blank">${pub.link}</a></p>
            </div>
            <img src="${pub.image_soruce}" class="publication-image">
        `;
        publicationsList.appendChild(pubElement);
    });
}

// Capture search input
const searchInput = document.querySelector('.search-input');

// Add real-time search with debouncing
let debounceTimeout;
searchInput.addEventListener('input', function() {
    clearTimeout(debounceTimeout); // Clear any previous timeout
    debounceTimeout = setTimeout(performSearch, 300); // Wait 300ms before searching
});

// Perform the search
function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === '') {
        displayPublications(publicationsData); // Show all if search is empty
        return;
    }

    // Filter and sort publications by match count
    const filteredData = publicationsData
        .map(pub => {
            let matchCount = 0;
            const fields = ['paper_type', 'title', 'date', 'journal', 'description', 'link'];
            fields.forEach(field => {
                if (pub[field].toLowerCase().includes(searchTerm)) {
                    matchCount++;
                }
            });
            return { pub, matchCount };
        })
        .filter(item => item.matchCount > 0) // Keep only publications with matches
        .sort((a, b) => b.matchCount - a.matchCount) // Sort by match count (descending)
        .map(item => item.pub); // Extract the publication objects

    displayPublicationsWithHighlights(filteredData, searchTerm);
}

// Display publications with highlighted matches
function displayPublicationsWithHighlights(data, searchTerm) {
    const publicationsList = document.getElementById('publications-list');
    publicationsList.innerHTML = ''; // Clear existing content
    data.forEach(pub => {
        const pubElement = document.createElement('div');
        pubElement.classList.add('publication');
        pubElement.innerHTML = `
            <div class="content">
                <p style="color: navy;"><em><b>${highlightText(pub.paper_type, searchTerm)}</b></em></p>
                <h2>${highlightText(pub.title, searchTerm)}</h2>
                <p><em>${highlightText(pub.date, searchTerm)}, ${highlightText(pub.journal, searchTerm)}</em></p>
                <p id="abstract"><b>Abstract:</b> ${highlightText(pub.description, searchTerm)}</p>
                <p id="doi-link"><b>DOI:</b> <a href="${pub.link}" target="_blank">${highlightText(pub.link, searchTerm)}</a></p>
            </div>
            <img src="${pub.image_soruce}" class="publication-image">
        `;
        publicationsList.appendChild(pubElement);
    });
}

// Highlight matching text
function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi'); // Case-insensitive matching
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Initialize by fetching data
fetchJSONData();