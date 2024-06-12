document.addEventListener('DOMContentLoaded', () => {
    fetch('data/menu.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log('Menu data fetched successfully'); // Debugging line
            return response.json();
        })
        .then(data => {
            console.log('Menu data:', data); // Debugging line
            displayMenu(data);
        })
        .catch(error => console.error('Error fetching menu data:', error));
});

function displayMenu(data) {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = '';  // Clear previous content if any

    Object.keys(data).forEach(category => {
        console.log(`Processing category: ${category}`); // Debugging line
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'menu-category';
        categoryDiv.innerHTML = `<h3>${category}</h3>`;

        data[category].sort((a, b) => a.price - b.price);

        data[category].forEach(item => {
            console.log(`Adding item: ${item.name}, Price: ${item.price}`); // Debugging line
            const itemDiv = document.createElement('div');
            itemDiv.className = 'menu-item';
            itemDiv.innerHTML = `
                <span>${item.name}</span>
                <span>S/ ${item.price.toFixed(2)}</span>
                <button onclick="addToOrder('${item.name}', ${item.price})">Añadir</button>
            `;
            categoryDiv.appendChild(itemDiv);
        });

        menuContainer.appendChild(categoryDiv);
    });
}
