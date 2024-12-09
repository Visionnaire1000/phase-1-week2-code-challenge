
document.addEventListener("DOMContentLoaded", () => {
    const itemInput = document.getElementById("item-input");
    const addButton = document.getElementById("add-button");
    const clearButton = document.getElementById("clear-button");
    const shoppingList = document.getElementById("shopping-list");
  
    let items = JSON.parse(localStorage.getItem("shoppingList")) || [];
  
    const renderList = () => {
      shoppingList.innerHTML = "";
      items.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item.text;
        if (item.purchased) li.classList.add("purchased");
  
        li.addEventListener("click", () => togglePurchased(index));
        li.addEventListener("dblclick", () => editItem(index));
  
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", (e) => {
          e.stopPropagation();
          deleteItem(index);
        });
  
        li.appendChild(deleteButton);
        shoppingList.appendChild(li);
      });
    };
  
    const addItem = () => {
      const text = itemInput.value.trim();
      if (text) {
        items.push({ text, purchased: false });
        itemInput.value = "";
        saveAndRender();
      }
    };
  
    const togglePurchased = (index) => {
      items[index].purchased = !items[index].purchased;
      saveAndRender();
    };
  
    const deleteItem = (index) => {
      items.splice(index, 1);
      saveAndRender();
    };
  
    const editItem = (index) => {
      const newText = prompt("Edit item:", items[index].text);
      if (newText !== null && newText.trim() !== "") {
        items[index].text = newText.trim();
        saveAndRender();
      }
    };
  
    const clearList = () => {
      items = [];
      saveAndRender();
    };
  
    const saveAndRender = () => {
      localStorage.setItem("shoppingList", JSON.stringify(items));
      renderList();
    };
  
    addButton.addEventListener("click", addItem);
    clearButton.addEventListener("click", clearList);
  
    renderList();
  });
  