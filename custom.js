const timeline =  document.querySelector('.timeline');
const years = timeline.querySelectorAll(".timeline__point");
for (year of years) {
    // пропорциональность таймлайна
    year.style.marginRight = `calc(${year.dataset.distance} * var(--unit-size))`;
    year.addEventListener('click', showCurrentYearContent);
}

//логика табов, скрещенная с таймлайном
function showCurrentYearContent(e){
        let year = e.currentTarget.dataset.year;
        document.querySelector('.timeline__point_active').classList.remove('timeline__point_active');
        document.querySelector(".detail__desc_open").classList.remove("detail__desc_open");
        document.querySelector(`.detail__desc[data-year="${year}"]`).classList.add("detail__desc_open");
        e.currentTarget.classList.add('timeline__point_active');
}
