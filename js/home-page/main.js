
window.onload=function(){faq_init();contact_us_modal_init();mobile_menu_init();const server_filters=document.querySelector('.server-filters');server_filters.addEventListener('click',function(){if(event.target.hasAttribute("data-filter")){server_filters.querySelector('.selected-filter').classList.remove('selected-filter');event.target.classList.add('selected-filter');}})
var containerEl=document.querySelector('.products');var mixer=mixitup(containerEl,{load:{filter:'.na'}});Modernizr.on('webp',function(result){const all_backgrounds=document.querySelectorAll('[data-image="true"]');if(result){all_backgrounds.forEach(element=>{element.classList.add('webp');})}else{all_backgrounds.forEach(element=>{element.classList.add('no-webp');})}});}