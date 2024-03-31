fetch('./src/cards.json')
  .then(response => response.json())
  .then(cards => {

  for (const board of Object.keys(cards)) {
    for (const card of Object.values(cards[board])) {
      const template_card = document.querySelector("template#cards").content.firstElementChild.cloneNode(true);
      
      template_card.querySelector("h3").textContent = card.title;
      template_card.querySelector("h3").title = card.title;
      template_card.querySelector("p").textContent = card.description;
      template_card.querySelector("p").title = card.description;
      for (const tag of card.tags) {
        const template_tag = template_card.querySelector(".tag").content.firstElementChild.cloneNode(true);
        template_tag.textContent = tag;
        template_card.querySelector(".tags").appendChild(template_tag);
      }
    
      document.querySelector(`#${board}`).appendChild(template_card);
    }
  }

  // Drag event
  const drag_cards = document.querySelectorAll(".card");
  const dropzones = document.querySelectorAll(".cards-container");
  
  drag_cards.forEach(drag_card => {
    drag_card.addEventListener("dragstart", dragstart);
    drag_card.addEventListener("dragend", dragend);
  })
  
  function dragstart() {
    dropzones.forEach(dropzone => {dropzone.classList.add("bg-violet-100")})

    this.classList.add("opacity-50");
  }
  function dragend() {
    dropzones.forEach(dropzone => {dropzone.classList.remove("bg-violet-100")})

    this.classList.remove("opacity-50");
  }
  
  dropzones.forEach(dropzone => {
    dropzone.addEventListener("dragover", dragover)
    dropzone.addEventListener("dragleave", dragleave)
    dropzone.addEventListener("drop", drop)
  })
  function dragover(event) {
    this.classList.add("bg-violet-200");

    const cardBeingDragged = document.querySelector(".opacity-50");
    this.appendChild(cardBeingDragged);

    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }
  function dragleave() {
    this.classList.remove("bg-violet-200");    
  }
  function drop() {
    this.classList.remove("bg-violet-200");    
  }
})

// Menu mobile
function openMenu() {

  if (window.outerWidth < 1024) {
    if (!document.querySelector("aside ul li p").classList.contains("block")) {
      document.querySelector("aside").classList.add("absolute", "z-1");
      document.querySelectorAll("aside ul li p").forEach(item => {
        item.classList.add("block");
        item.classList.remove("hidden");
      })
    } else {
      document.querySelector("aside").classList.remove("absolute", "z-1");
      document.querySelectorAll("aside ul li p").forEach(item => {
        item.classList.remove("block");
        item.classList.add("hidden");
      })
    }
  }
}