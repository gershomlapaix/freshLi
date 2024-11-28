document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fullName = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phone').value;
    const role = document.getElementById('user-type').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const data = {
        fullName,
        username: generateUsername(fullName),
        email,
        phoneNumber,
        role,
        password
    };    

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
            
            if(data.role === 'farmer') {
                window.location.href = 'farmer.html';
            }
            else {
                window.location.href = 'buyer.html';
            }

        } else {
            const errorResult = await response.json();
            alert('Registration failed: ' + errorResult.message);
        }
    } catch (error) {
        // Handle any network errors
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});

function generateUsername(fullName) {
    return fullName.toLowerCase().replace(/\s/g, '');
}
