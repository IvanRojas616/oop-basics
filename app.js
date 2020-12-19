//alert("Works");
class Product
{
    constructor(name, price, year)
    {
        this.name = name;
        this.price = price;
        this.year = year;

    }
}

class UI
{
    addProduct(product)
    {
        const productList = document.getElementById("product-list");
        const elementHTML = document.createElement('div');
        elementHTML.innerHTML = `
            <div class="card text-center mb-4">
               <div class="card-body">
                <strong>Product: </strong> ${product.name}
                <strong>Price: </strong> ${product.price}
                <strong>Year: </strong> ${product.year}
                <a href="#" class="btn btn-danger ml-2" name="delete"> Delete </a>
              </div>
            </div>
        `;

        productList.appendChild(elementHTML);
        this.clean();
    }

    deleteProduct(targetElement)
    {
        if(targetElement.name === "delete" )
        {
            let toDelete = targetElement.parentElement.parentElement.parentElement;
            toDelete.remove();
            this.showMessage("Product Deleted",'success');
        }

    }

    showMessage(text, cssClass)
    {
        const div = document.createElement('div');
        div.className  = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(text));
        //Show in the DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },1500);
    }

    clean()
    {
        document.getElementById("productForm").reset();
    }
}


//DOM EVENTS
document.getElementById("productForm")
    .addEventListener("submit", function(e){
        let name = document.getElementById("nameProduct").value;
        let price = document.getElementById("price").value;
        let year = document.getElementById("year").value;

        const product = new Product(name,price,year);
        const ui = new UI();
        if (name === "" | price === "" | year === "") 
        {
            ui.showMessage("Invalid Fields !!!", 'danger');
        }
        else
        {
        ui.addProduct(product);
        ui.showMessage("Registered Product",'success');
        }
        e.preventDefault();   
});

document.getElementById("product-list").addEventListener('click', function(e)
    {
        const ui = new UI;
        ui.deleteProduct(e.target);
    });
