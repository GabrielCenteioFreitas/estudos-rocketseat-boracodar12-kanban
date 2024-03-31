fetch('./src/cards.json')
  .then(response => response.json())
  .then(cards => {

  for (const board of Object.keys(cards)) {
    for (const card of Object.values(cards[board])) {
      const template_card = document.querySelector("template#cards").content.firstElementChild.cloneNode(true);
      
      template_card.querySelector("h3").textContent = card.title;
      template_card.querySelector("p").textContent = card.description;
      for (const tag of card.tags) {
        const template_tag = template_card.querySelector(".tag").content.firstElementChild.cloneNode(true);
        template_tag.textContent = tag;
        template_card.querySelector(".tags").appendChild(template_tag);
      }
    
      document.querySelector(`#${board}`).appendChild(template_card);
    }
  }
  
})