document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch user data (profile and products)
        const token = localStorage.getItem('authToken'); // Assuming token is saved in localStorage
        if (!token) {
            window.location.href = 'login.html'; // Redirect if not logged in
            return;
        }

        // Fetch farmer profile and products
        const productsResponse = await fetch('http://localhost:5000/api/products/farmer', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!productsResponse.ok) {
            alert('Error fetching farmer data');
            return;
        }

        const { data: products } = await productsResponse.json();

        // // Update profile section
        // document.getElementById('avatar').src = user.avatar || 'default-avatar.jpg'; // Replace with actual avatar URL
        // document.getElementById('name').textContent = `Name: ${user.fullName}`;
        // document.getElementById('phone').textContent = `Phone: ${user.phoneNumber}`;

        // // Update product count
        document.getElementById('product-count').textContent = `Total Products: ${products.length}`;

        // // Display the products list
        const productsList = document.getElementById('products-list');
        productsList.innerHTML = ''; // Clear any previous content

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            // Add product name and price (you can add more details if needed)
            productItem.innerHTML = `
                <span>${product.name}</span>
                <span>${product.price} RWF / ${product.unit}</span>
            `;
            productsList.appendChild(productItem);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching farmer data.');
    }
});
