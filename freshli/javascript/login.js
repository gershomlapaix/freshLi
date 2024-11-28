// Attach an event listener to the form
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const path = window.location.href
    const currentPath = path.split('/').pop();
  
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Prepare the data to send in the request
    const data = {
      email: email,
      password: password
    };
  
    try {
      // Send POST request to the backend API
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      // Check if the login was successful
      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('authToken', result.token);
  
        if (currentPath === 'farmer.html') {
          window.location.href = 'farmer-dashboard.html';
        } else {
          window.location.href = 'buyer-dashboard.html';
        }
      } else {
        const errorResult = await response.json();
        alert('Login failed: ' + errorResult.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  });
  