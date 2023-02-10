const form = document.querySelector('.form')
console.log("works this is from the frontend file")
form.addEventListener("submit", createNewProduct)
function createNewProduct (event) {
    event.preventDefault()
    console.log("works")
    const name = document.querySelector('#product-name-field').value
    const expiry = document.querySelector('#expire-date-input').value
    const category = document.querySelector('#category-input').value
    const description = document.querySelector('#description-input').value
    const img = document.querySelector('#img-input').value
    const user = document.querySelector('#user-input').value
    const newProd = {
            product_name: name,
            category: category,
            expire_date: expiry,
            description: description,
            image: img,
            user_id: user
    }
    
    if (newProd) {
         fetch('/product/newproduct', {
        method: "POST",
        body: JSON.stringify(newProd),
        headers: {
            'Content-Type': 'application/json',
          },
    })
    console.log(newProd)
    } else {
        alert("Failed to create product")
    }
   
}