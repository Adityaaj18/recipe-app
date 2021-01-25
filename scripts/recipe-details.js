'use strict'

const titleElement = document.querySelector('#recipe-title')
const bodyElement = document.querySelector('#recipe-body')
const removeElement = document.querySelector('#delete-recipe')
const dateElement = document.querySelector('#last-updated')

const filters = {
    searchText: '',
    hideCompleted: false
}


const recipeId = location.hash.substring(1)
let recipes = getSavedRecipes()
let recipe = recipes.find ((recipe) => recipe.id === recipeId)
console.log(recipe);


if(!recipe){
    location.assign('/index.html')
}

titleElement.value = recipe.title
bodyElement.value = recipe.body
dateElement.textContent = generateLastEdited(recipe.updatedAt)

// ! Edit title and save groceries array
titleElement.addEventListener('input', (e) => {
    recipe.title = e.target.value
    recipe.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(recipe.updatedAt)
    saveRecipes(recipes)
    
})

// ! Edit textarea and save groceries array
bodyElement.addEventListener('input', (e) => {
    recipe.body = e.target.value
    recipe.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(recipe.updatedAt)
    saveRecipes(recipes)
})





renderIngredients(recipe)

//ingredient input field
document.querySelector('#new-ingredient').addEventListener('submit', function(e){
        const text = e.target.elements.text.value.trim()
         e.preventDefault()
        
        if(text.length > 0){
            recipe.ingredients.push({
                name: text,
                haveIt: false
            })
            saveRecipes(recipes)
            renderIngredients(recipe)
            e.target.elements.text.value = ''
        }
    })

    
// const addIngredient = (id) => {

// }




removeElement.addEventListener('click', (e) => {
    deleteRecipe(recipe.id)
    saveRecipes(recipes)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        recipes = JSON.parse(e.newValue)
        recipe = recipes.find((recipe) => recipe.id === recipeId)

        if (!recipe) {
            location.assign('/index.html')
        }

        titleElement.value = recipe.title
        bodyElement.value = recipe.body
        dateElement.textContent = generateLastEdited(recipe.updatedAt)
    }
})

