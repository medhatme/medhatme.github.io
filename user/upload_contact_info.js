
/*---------------------------------------*\ 
    AUTHOR: A.M.M. Elsayed   
    * ALL RIGHTS RESERVED *
\*---------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  fetch('user/user_info.json')
    .then(response => {
      if (!response.ok) {
        console.error('Response not OK');
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Loaded data:', data);
      // Set contact details and icons
      document.getElementById('email').innerText = data.email;
      document.getElementById('phone').innerText = data.phone;
      
      document.getElementById('email-icon').src = data.icons.email;
      document.getElementById('phone-icon').src = data.icons.phone;
    })
    .catch(error => console.error('Error loading contact info:', error));
});

