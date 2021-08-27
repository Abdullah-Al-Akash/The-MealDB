const searchFood = () => {
        const searchField = document.getElementById('search-field');
        const searchText = searchField.value;
        searchField.value = '';

        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        fetch(url)
                .then(res => res.json())
                .then(data => displayFood(data.meals))
}

//Display Search Food
const displayFood = meals => {
        const foodContainer = document.getElementById('food-container');
        foodContainer.textContent = '';
        meals.forEach(meal => {
                // console.log(meal);
                const div = document.createElement('div');
                div.classList.add('meal');
                div.innerHTML = `
                        <div onclick="loadMealDetails('${meal.idMeal}')" class="col">
                                <div class="card h-100">
                                        <img src=${meal.strMealThumb} class="card-img-top p-4 rounded" alt="...">
                                        <div class="card-body">
                                                <h5 class="card-title">${meal.strMeal}</h5>
                                                <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                                        </div>
                                </div>
                        </div>
                `
                foodContainer.appendChild(div);
        })
}

// Load Meal Details:
const loadMealDetails = (id) => {
        // console.log(id);
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(url)
                .then(res => res.json())
                .then(data => displayMealDetails(data.meals[0]))
}

//Display Meal Details:
const displayMealDetails = (meal) => {
        // If There is no Meal:
        if (meal.length == 0) {
                alert('There is no');
        }

        const mealDetail = document.getElementById('meal-details');
        mealDetail.innerText = '';
        const div = document.createElement('div');
        div.innerHTML = `
                        <div class= "card mx-auto w-25">
                        <img src="${meal.strMealThumb}" class="card-img-top p-4" alt="...">
                                <div class="card-body">
                                        <h5 class="card-title">${meal.strMeal}</h5>
                                        <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                                        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">How to Cook</a>
                                </div>
        </div>
        `
        mealDetail.appendChild(div);

}