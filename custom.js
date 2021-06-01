const timeline =  document.querySelector('.timeline');
const years = document.querySelectorAll(".timeline__point");
// пропорциональность таймлайна
const unit = getComputedStyle(timeline).getPropertyValue('--unit-size');

for (year of years) {
    year.style.marginRight = `calc(${year.dataset.distance} * var(--unit-size))`;
}
for(point of years){
    point.addEventListener('click', timelineDetail)
}
//логика табов, скрещенная с таймлайном
function timelineDetail(e){
    
        let year = e.currentTarget.dataset.year;
        document.querySelector('.timeline__point_active').classList.remove('timeline__point_active');
        document.querySelector(".detail__desc_open").classList.remove("detail__desc_open");

        document.querySelector(`.detail__desc[data-year="${year}"]`).classList.add("detail__desc_open");
        e.currentTarget.classList.add('timeline__point_active');
    
}
