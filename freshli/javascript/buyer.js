document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
    }

    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', logout);

    async function logout() {
        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
    }

    // State management
    let currentProducts = [];
    let currentProfile = null;

    // Fetch and display profile
    async function loadProfile() {
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
    }

    // Fetch and display products
    async function loadProducts() {
        try {
            const response = await fetch("http://localhost:5000/api/products", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { data } = await response.json();
            currentProducts = data;

            const productsGrid = document.getElementById('productsGrid');
            productsGrid.innerHTML = '';

            currentProducts.forEach(product => {
                const card = createProductCard(product);
                productsGrid.appendChild(card);
            });

            // Also update the product select in the modal
            updateProductSelect();
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

    // Create product card
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
                <div class="product-image">
                    ${product.image_url ?
                `<img src="${product.image_url}" alt="${product.name}">` :
                `<i class="fas fa-box fa-3x"></i>`}
                </div>
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <p>${product.description || 'No description available'}</p>
                    <p class="product-price">rwf ${parseFloat(product.price).toFixed(2)} per ${product.unit}</p>
                    <p>Stock: ${product.quantity} ${product.unit}</p>
                    <button class="buy-btn">
                        Buy Now
                    </button>
                </div>
            `;

        const buyButton = card.querySelector('.buy-btn');
        buyButton.addEventListener('click', function () {
            openTransactionModal(product.id);
        });

        return card;
    }

    // Fetch and display transactions
    async function loadTransactions() {
        try {
            const response = await fetch("http://localhost:5000/api/transaction/buyer", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );

            const { data: allTransactions } = await response.json();

            const tbody = document.getElementById('transactionsBody');
            tbody.innerHTML = '';

            allTransactions?.forEach(transaction => {
                const row = createTransactionRow(transaction);
                tbody.appendChild(row);
            });
        } catch (error) {
            console.error('Error loading transactions:', error);
        }
    }

    // Create transaction row
    function createTransactionRow(transaction) {
        const row = document.createElement('tr');
        const date = new Date(transaction.created_at).toLocaleDateString();

        row.innerHTML = `
                <td>${date}</td>
                <td>${transaction.name}</td>
                <td>${transaction.quantity}</td>
                <td>rwf ${parseFloat(transaction.total).toFixed(2)}</td>
                <td><span class="status-badge status-${transaction.status.toLowerCase()}">
                    ${transaction.status}
                </span></td>
            `;

        return row;
    }

    // Modal functionality
    const modal = document.getElementById('transactionModal');
    const closeBtn = document.querySelector('.close-btn');

    function openTransactionModal(productId) {
        modal.style.display = 'block';
        if (productId) {
            document.getElementById('productSelect').value = productId;
            updateTotal();
        }
    }

    closeBtn.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    // Update product select in modal
    function updateProductSelect() {
        const select = document.getElementById('productSelect');
        select.innerHTML = '';

        currentProducts.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = `${product.name} - rwf ${parseFloat(product.price).toFixed(2)}/${product.unit}`;
            select.appendChild(option);
        });
    }

    // Calculate and update total
    function updateTotal() {
        const productId = document.getElementById('productSelect').value;
        const quantity = document.getElementById('quantity').value;
        const product = currentProducts.find(p => p.id === parseInt(productId));

        if (product && quantity) {
            const total = product.price * quantity;
            document.getElementById('total').value = total.toFixed(2);
        }
    }

    // Form submission
    document.getElementById('transactionForm').onsubmit = async function (e) {
        e.preventDefault();

        const productId = document.getElementById('productSelect').value;
        const quantity = document.getElementById('quantity').value;
        const total = document.getElementById('total').value;

        try {
            const response = await fetch("http://localhost:5000/api/transaction", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: parseInt(productId),
                    quantity: parseInt(quantity),
                    total: parseFloat(total)
                })
            });            

            if (response.ok) {
                modal.style.display = 'none';
                loadTransactions();
                loadProducts();
            } else {
                throw new Error('Transaction failed');
            }
        } catch (error) {
            console.error('Error creating transaction:', error);
            alert('Failed to create transaction. Please try again.');
        }
    };

    // Event listeners
    document.getElementById('productSelect').onchange = updateTotal;
    document.getElementById('quantity').onchange = updateTotal;
    document.getElementById('quantity').oninput = updateTotal;

    // Initial load
    loadProfile();
    loadProducts();
    loadTransactions();
})