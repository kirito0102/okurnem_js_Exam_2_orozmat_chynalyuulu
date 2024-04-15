async function searchCocktails(query) {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        return data.drinks; 
    } catch (error) {
        console.error('Ошибка при запросе к API:', error);
    }
}


function displayResults(cocktails) {
    const resultsDiv = document.getElementById('cocktail-results');
    resultsDiv.innerHTML = ''; 
    cocktails.forEach(cocktail => {
        const cocktailDiv = document.createElement('div');
        cocktailDiv.classList.add('cocktail');

        const cocktailImg = document.createElement('img');
        cocktailImg.src = cocktail.strDrinkThumb;
        cocktailImg.alt = cocktail.strDrink;
        cocktailDiv.appendChild(cocktailImg);

        const cocktailName = document.createElement('p');
        cocktailName.textContent = cocktail.strDrink;
        cocktailDiv.appendChild(cocktailName);

      
        cocktailDiv.addEventListener('click', () => {
            showModal(cocktail);
        });

        resultsDiv.appendChild(cocktailDiv);
    });
}


function showModal(cocktail) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    const cocktailInfo = document.createElement('div');
    cocktailInfo.innerHTML = `
        <h2>${cocktail.strDrink}</h2>
        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
        <p>${cocktail.strInstructions}</p>
    `;

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(cocktailInfo);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
    modal.style.display = 'block';
}


document.getElementById('cocktail-search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();

    if (query) {
        const cocktails = await searchCocktails(query);
        displayResults(cocktails);
    }
});