'use strict'

let recipes = getSavedRecipes()  

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderRecipes(recipes, filters)


    document.querySelector('#create-recipe').addEventListener('click', (e) => {
        const id = uuidv4()
        const timestamp = moment().valueOf()

        recipes.push({
            id:id,
            title: '',
            body:'',
            createdAt: timestamp,
            updatedAt: timestamp,
            ingredients: []
            
        })
         saveRecipes(recipes)
        location.assign(`/details.html#${id}`)
    })



document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderRecipes(recipes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderRecipes(recipes, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        recipes = JSON.parse(e.newValue)
        renderRecipes(recipes, filters)
    }
})