const baseUrl = 'http://localhost:8080'; // Altere se sua API estiver em outra porta

const apiResponseDiv = document.getElementById('apiResponse');

async function sendRequest(method, url, data = null) {
    try {
        // Alterne para a aba de resposta automaticamente ao enviar uma requisição
        showTab('response');

        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, application/xml'
            },
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        let result;

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            result = await response.json();
        } else if (contentType && contentType.includes('application/xml')) {
            result = await response.text(); // Para XML, exiba como texto
        } else {
            result = await response.text();
        }

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}\nResponse: ${JSON.stringify(result, null, 2) || result}`);
        }

        apiResponseDiv.textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        apiResponseDiv.textContent = `Erro: ${error.message}`;
        console.error('Erro na requisição:', error);
    }
}

// --- Lógica das Abas ---
function showTab(tabId) {
    // Remove a classe 'active' de todos os botões e conteúdos
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Adiciona a classe 'active' ao botão e conteúdo da aba selecionada
    document.querySelector(`.tab-button[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Adiciona event listeners aos botões das abas
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;
        showTab(tabId);
    });
});

// Inicializa a primeira aba como ativa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    showTab('users'); // Mostra a aba de usuários por padrão
});


// --- User Endpoints (sem alterações na lógica de requisição) ---

document.getElementById('createUserForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = document.getElementById('createUserId').value;
    const name = document.getElementById('createUserName').value;
    const email = document.getElementById('createUserEmail').value;
    const password = document.getElementById('createUserPassword').value;
    const phoneNumber = document.getElementById('createUserPhoneNumber').value;
    const city = document.getElementById('createUserCity').value;

    const userDTO = { name, email, password, phoneNumber, city };
    if (id) userDTO.id = id;

    await sendRequest('POST', `${baseUrl}/users`, userDTO);
});

document.getElementById('findUserByIdForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = document.getElementById('findUserId').value;
    await sendRequest('GET', `${baseUrl}/users/${id}`);
});

document.getElementById('updateUserForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = document.getElementById('updateUserId').value;
    const name = document.getElementById('updateUserName').value;
    const email = document.getElementById('updateUserEmail').value;
    const password = document.getElementById('updateUserPassword').value;
    const phoneNumber = document.getElementById('updateUserPhoneNumber').value;
    const city = document.getElementById('updateUserCity').value;

    const userDTO = { id, name, email, password, phoneNumber, city };
    await sendRequest('PUT', `${baseUrl}/users/${id}`, userDTO);
});

document.getElementById('deleteUserForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = document.getElementById('deleteUserId').value;
    await sendRequest('DELETE', `${baseUrl}/users/${id}`);
});

document.getElementById('searchUsersForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('searchUserName').value;
    const email = document.getElementById('searchUserEmail').value;
    const phoneNumber = document.getElementById('searchUserPhoneNumber').value;
    const page = document.getElementById('searchUserPage').value;
    const size = document.getElementById('searchUserSize').value;

    const queryParams = new URLSearchParams();
    if (name) queryParams.append('name', name);
    if (email) queryParams.append('email', email);
    if (phoneNumber) queryParams.append('phone_number', phoneNumber);
    queryParams.append('page', page);
    queryParams.append('size', size);

    await sendRequest('GET', `${baseUrl}/users/search?${queryParams.toString()}`);
});

// --- Item Endpoints (sem alterações na lógica de requisição) ---

document.getElementById('createItemForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = document.getElementById('createItemId').value;
    const name = document.getElementById('createItemName').value;
    const description = document.getElementById('createItemDescription').value;
    const amount = parseInt(document.getElementById('createItemAmount').value);
    const price = parseFloat(document.getElementById('createItemPrice').value);
    const soldById = document.getElementById('createItemSoldById').value;
    const category = document.getElementById('createItemCategory').value;


    const itemDTO = { name, description, amount, price, soldById, category };
    if (id) itemDTO.id = id;

    await sendRequest('POST', `${baseUrl}/shop`, itemDTO);
});

document.getElementById('findItemByIdForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = document.getElementById('findItemId').value;
    await sendRequest('GET', `${baseUrl}/shop/${id}`);
});

document.getElementById('updateItemForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = document.getElementById('updateItemId').value;
    const name = document.getElementById('updateItemName').value;
    const description = document.getElementById('updateItemDescription').value;
    const amount = parseInt(document.getElementById('updateItemAmount').value);
    const price = parseFloat(document.getElementById('updateItemPrice').value);
    const soldById = document.getElementById('updateItemSoldById').value;
    const category = document.getElementById('updateItemCategory').value;

    const itemDTO = { id, name, description, amount, price, soldById, category };
    await sendRequest('PUT', `${baseUrl}/shop/${id}`, itemDTO);
});

document.getElementById('deleteItemForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = document.getElementById('deleteItemId').value;
    await sendRequest('DELETE', `${baseUrl}/shop/${id}`);
});

document.getElementById('searchItemsForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('searchItemName').value;
    const description = document.getElementById('searchItemDescription').value;
    const priceLess = document.getElementById('searchItemPriceLess').value;
    const priceGreater = document.getElementById('searchItemPriceGreater').value;
    const page = document.getElementById('searchItemPage').value;
    const size = document.getElementById('searchItemSize').value;
    const userName = document.getElementById('searchItemUserName').value;
    const category = document.getElementById('searchItemCategory').value;


    const queryParams = new URLSearchParams();
    if (name) queryParams.append('name', name);
    if (description) queryParams.append('description', description);
    if (priceLess) queryParams.append('priceLess', priceLess);
    if (priceGreater) queryParams.append('priceGreater', priceGreater);
    if (userName) queryParams.append('user-name', userName);
    if (category) queryParams.append('category', category);

    queryParams.append('page', page);
    queryParams.append('size', size);

    await sendRequest('GET', `${baseUrl}/shop/search?${queryParams.toString()}`);
});