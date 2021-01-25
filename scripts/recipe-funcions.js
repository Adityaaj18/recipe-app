'use strict'

// Read existing notes from localStorage
const getSavedRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')
   
    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    } 
}



// var x = 0
// var ingredients = Array() 
// function add_element_to_array()
// {
// ingredients[x] = document.getElementById("input").value;
// recipes.push({
//     ingredient: ingredients
// })
// saveRecipes(recipes)
// // alert("Element: " + array[x] + " Added at index " + x);
// x++;
// document.getElementById("input").value = "";
// }

//remove ingredients
const removeIngredient = function (id) {
    const ingredientIndex = ingredients.findIndex(function (ingredient) {
        return ingredient.id === id
    })

    if (ingredientIndex > -1) {
        ingredients.splice(ingredientIndex, 1)
    }
}

//toggle the complete value for a given todo
const toggleIngredient = (id) => {
    const ingredient = ingredients.find((ingredient) => ingredient.id === id)
    if(ingredient){
        ingredient.completed = !ingredient.completed
    }
}



//save recipes to localstorage
const saveRecipes = (recipes, ingredients) => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
    // localStorage.setItem('ingredients', JSON.stringify(ingredients))
}

//delete recipe
const deleteRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)
    
    if(recipeIndex > -1){
        recipes.splice(recipeIndex, 1)
    }
}

//generate DOM structure for recipe
const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // Setup the recipe title text
    if (recipe.title.length > 0) {
        textEl.textContent = recipe.title
    } else {
        textEl.textContent = 'Unnamed recipe'
    }
    recipeEl.appendChild(textEl)

       // Setup the link
       recipeEl.setAttribute('href', `/details.html#${recipe.id}`)

       // Setup the status message
    statusEl.textContent = generateLastEdited(recipe.updatedAt)
    // statusEl.classList.add('list-item__subtitle')
    recipeEl.appendChild(statusEl)

       return recipeEl
}

//generate ingredient DOM
// const generateIngredientDOM = function (ingredient) {
//     const ingredientEl = document.createElement('label')
//     const containerEl = document.createElement('div')
//     const checkbox = document.createElement('input')
//     const ingredientText = document.createElement('span')
//     const removeButton = document.createElement('button')

//     // Setup todo checkbox
//     checkbox.setAttribute('type', 'checkbox')
//     checkbox.checked = ingredient.completed
//     containerEl.appendChild(checkbox)
//     checkbox.addEventListener('change', () => {
//         toggleIngredient(ingredient.id)
//         saveIngredients(ingredients)
//         renderIngredients(ingredients, filters)
//     })

//     // Setup the todo text
//     ingredientText.textContent = ingredient.text
//     containerEl.appendChild(ingredientText)

//      //setup container
//      ingredientEl.classList.add('list-item')
//      containerEl.classList.add('list-item__conainer')
//      ingredientEl.appendChild(containerEl) 

               

//     // Setup the remove button
//     removeButton.textContent = 'remove'
//     removeButton.classList.add('button','button--text')
//     ingredientEl.appendChild(removeButton)
//     removeButton.addEventListener('click', function () {
//         removeIngredient(ingredient.id)
//         saveIngredients(ingredients)
//         renderIngredients(ingredients, filters)
//     })



//     return ingredientEl
// }

//render ingredients
const renderIngredients = recipe => {
    const div = document.querySelector("#list_ingredients")

    // ! Clear the DOM when it first render
    div.innerHTML = ""

    recipe.ingredients.forEach(reci => {
        const ingredientDiv = document.createElement("div")
        const pElement = document.createElement("span")
        const removeButton = document.createElement("i")
        const checkbox = document.createElement("input")

        //add atrribute to DIV
        ingredientDiv.setAttribute("id","ingredient-div")

        //setup checkbox
        checkbox.setAttribute("type","checkbox")
        checkbox.setAttribute("id","check")
        ingredientDiv.appendChild(checkbox)

        //setup checkbox status
        checkbox.checked = reci.haveIt

        //wire up checkbox when user selects it
        checkbox.addEventListener('click', e => {
            reci.haveIt = e.target.checked
            saveRecipes(recipes)
        })
        //setup ingredient title
        pElement.setAttribute("id","ingredient-span")
        pElement.textContent = reci.name
        ingredientDiv.appendChild(pElement)

        //setup remove button
        removeButton.setAttribute("id","removeIngredient")
        removeButton.innerHTML = " X"
        ingredientDiv.appendChild(removeButton)
        removeButton.addEventListener('click', e => {
            const ingredientIndex = recipe.ingredients.findIndex(ing => {
                return ing.name === reci.name
            })
            if(ingredientIndex > -1){
                recipe.ingredients.splice(ingredientIndex,1)
            }
            saveRecipes(recipes)
            renderIngredients(recipe)
        })

        //Append
        div.appendChild(ingredientDiv)
    })

}


// Sort your recipes by one of three ways
const sortRecipes = (recipes, sortBy) => {
    if (sortBy === 'byEdited') {
        return recipes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return recipes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return recipes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return recipes
    }
}

// Render application recipes
const renderRecipes = (recipes, filters) => {
    const recipesEl = document.querySelector('#recipes')
    recipes = sortRecipes(recipes, filters.sortBy)
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    recipesEl.innerHTML = ''

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const recipeEl = generateRecipeDOM(recipe)
            recipesEl.appendChild(recipeEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No recipes to show'
        // emptyMessage.classList.add('empty-message')
        recipesEl.appendChild(emptyMessage)
    }
}



// Generate the last edited message
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}


// Get the DOM elements for list summary
const generateSummaryDOM = function (incompleteTodos) {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')

    incompleteTodos.length === 1 ? summary.textContent = `You need ${incompleteTodos.length} more ingredients ` : summary.textContent = `You need ${incompleteTodos.length} more ingredients `
   
    return summary
}