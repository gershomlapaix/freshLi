document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken'); // Assuming token is saved in localStorage
    if (!token) {
        window.location.href = 'login.html'; // Redirect if not logged in
        return;
    }

    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', logout);

    async function logout() {
        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
    }

    // Modal functionality
    const modal = document.getElementById('productModal');
    const openModalBtn = document.getElementById('add-product-btn');
    const closeModalBtn = document.querySelector('.close-btn');

    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);

    function openModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.getElementById('productForm').reset();
    }

    // Close modal when clicking outside
    window.onclick = function (event) {
        if (event.target === modal) {
            closeModal();
        }
    }

    // Form submission
    document.getElementById('productForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        // Create FormData object for file upload
        const formData = new FormData();
        formData.append('name', document.getElementById('productName').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('price', document.getElementById('price').value);
        formData.append('quantity', document.getElementById('quantity').value);
        formData.append('unit', document.getElementById('unit').value);
        formData.append('categoryId', document.getElementById('category').value);

        // const imageFile = document.getElementById('image').files[0];
        // if (imageFile) {
        //     formData.append('image', imageFile);
        // }

        try {
            const response = await fetch('http://localhost:5000/api/farmer/add-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Product added successfully:', result);

                closeModal();

                loadProducts();
            } else {
                throw new Error('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product. Please try again.');
        }
    });

    // Optional: Add loading spinner during form submission
    function showLoading() {
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Adding...';
    }

    function hideLoading() {
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Add Product';
    }

    try {
        const profileResponse = await fetch('http://localhost:5000/api/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const user = await profileResponse.json();

        // Update profile section
        document.getElementById('name').textContent = `Name: ${user?.fullName}`;
        document.getElementById('phone').textContent = `Email: ${user?.email}`;
        document.getElementById('email').textContent = `Phone: ${user?.phone_number}`;

        loadProducts()

        // Fetch transactions
        const transactionResponse = await fetch('http://localhost:5000/api/transaction/farmer', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!transactionResponse.ok) {
            alert('Error fetching transactions');
            return;
        }

        const transactionData = await transactionResponse.json();
        const transactions = transactionData.data;

        // Display transactions in the table
        const transactionsTableBody = document.querySelector('#transactions-table tbody');
        transactionsTableBody.innerHTML = '';

        transactions.forEach(transaction => {
            const row = document.createElement('tr');

            row.innerHTML = `
            <td>${transaction.name}</td>
            <td>rwf ${transaction.price}</td>
            <td>${transaction.quantity}</td>
            <td>rwf ${transaction.total}</td>
            <td>${transaction.status}</td>
            <td>
            ${transaction.status === 'PENDING' ? `
                <button class="action-btn complete" data-transaction-id="${transaction.id}">Complete</button>
                <button class="action-btn cancel" data-transaction-id="${transaction.id}">Cancel</button>
                ` : ''}
            </td>
        `;

            transactionsTableBody.appendChild(row);

            const completeButton = row.querySelector('.complete');
            const cancelButton = row.querySelector('.cancel');

            // Add click event listener for "Complete"
            if (completeButton) {
                console.log('completeButton', transaction);

                completeButton.addEventListener('click', async () => {
                    await updateTransactionStatus(transaction.id, 'COMPLETE');
                });
            }

            // Add click event listener for "Cancel"
            if (cancelButton) {
                cancelButton.addEventListener('click', async () => {
                    await updateTransactionStatus(transaction.id, 'CANCEL');
                });
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }

    // Function to update the status of a transaction
    async function updateTransactionStatus(transactionId, status) {
        try {
            // Make the API call to complete or cancel the transaction
            const response = await fetch(`http://localhost:5000/api/transaction/${transactionId}/${status.toLowerCase()}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Successfully updated transaction status
                alert(data.message);
                // Optionally, you can reload the table or update the row status here
                location.reload(); // Reload the page to get the updated transaction status
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error updating the transaction status.');
        }
    }

    async function loadProducts() {
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

        document.getElementById('product-count').textContent = `Total Products: ${products.length}`;

        const productsList = document.getElementById('products-list');
        productsList.innerHTML = '';

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            // Add product name and price (you can add more details if needed)
            productItem.innerHTML = `
                <span>${product.name}: </span>
                <span class="price"> ${product.price} RWF / ${product.unit}</span>
            `;
            productsList.appendChild(productItem);
        });
    }

});