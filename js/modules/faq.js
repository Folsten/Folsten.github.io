
function faq_init(){const faq_content=document.querySelector('.faq-section .content');faq_content.addEventListener('click',function(){if(event.target.classList.contains("question")||event.target.parentNode.classList.contains("question")){var parent=event.target.classList.contains("question")?event.target:event.target.parentNode;var qa_block=parent.parentNode;var find_active_arrow=faq_content.querySelector('.active-arrow');if(find_active_arrow&&find_active_arrow!=parent.querySelector('.la-angle-right')){find_active_arrow.classList.remove('active-arrow');}
var find_active_answer=faq_content.querySelector('.active-answer');if(find_active_answer&&find_active_answer!=qa_block.querySelector('.answer')){find_active_answer.classList.remove('active-answer');}
parent.querySelector('.la-angle-right').classList.toggle('active-arrow');qa_block.querySelector('.answer').classList.toggle('active-answer');}})};