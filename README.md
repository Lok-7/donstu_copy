## Что сделали
Переработали визуал контента двух страниц. Используемые технологии - html, css, чистый JS(vanilla JS).
Только визуал, только внешняя часть, фронтенд. Бэкенд (серверная часть) не трогали.

## Откуда взяли код
За основу разработки взяли шаблон сайта дгту. Получили его, локально сохранив исходный код трех страниц сайта и присоединив ручками необходимые скрипты, стили и шрифты. Сделали перелинковку страниц (прописали на нужные кнопки нужные ссылки). Прототип готов...


## Разработка
Чтобы контент органично вписался в стилистику сайта, старались по максимуму использовать уже имеющиеся на сайте блоки и элементы. 

Шаблон страницы остался неизменным. Переработке подлежала только контентная часть (все, что не шапка, не футер, не боковое меню и не правая колонка - это контентная часть https://i.imgur.com/XvZlzvR.png)

Для блока с почетными педагогами переиспользовали шаблон плитки с преподами деканата. Просто замена текста и путей к картинкам. Сложнее было подобрать нужный компонент под задачу...

Для вставки видео использовали HTML-элемент `video`:
```html c элементами управления
  <video class="video" poster="poster.png" controls > 
      <source src="video.mp4" type="video/mp4">
  </video>
```
Стили для видео позволяют ему быть адаптивным и пропорцинально уменьшаться при изменении разрешения экрана:
```css
.video {
  max-width: 100%;
}
```

Таймлайн состоит из двух частей.
1. Блока с горизональным скроллом, где располагаются точки с датами. Это кликабельные элементы, при взаимодействии с которыми переключаются блоки контента.
2. Контент

Пример таймлайна из двух элементов:
```html
    <div class="timeline-wrapper">
         <div class="timeline">
             <div class="timeline__point timeline__point_active" data-year="1969" data-distance="3">
                 <span class="timeline__dot"></span>
                 <div class="timeline__label">1969</div>
             </div>
             <div class="timeline__point" data-year="1969" data-distance="3">
                 <span class="timeline__dot"></span>
                 <div class="timeline__label">1969</div>
             </div>
         </div>
          <div class="detail info-person">
              <div class="detail__desc detail__desc_open" data-year="1969">
                <details name="education">
                    <summary class="title">Заголовок</summary>
                     <div class="desc">Контент вкладки 1</div>
                </details>
             </div>
             <div class="detail__desc" data-year="1969">
                <details name="education">
                    <summary class="title">Заголовок</summary>
                     <div class="desc">Контент владки 2</div>
                </details>
             </div>
         </div>
     </div>
```
Точка при наведении и с классом `timeline__point_active` выделяется цветом, под таймлайном отображается контент с классом `detail__desc_open`.  Остальные блоки контента скрыты с помощью свойства `display:none`.

Если упрощать, то этот таймлайн - это модифицированные табы, где вкладками являются точки таймлайна.

В разметке точек таймлайна и блоков можно заметить два атрибута - `data-year` и `data-distance`. Они выполняют следующие роли:
- `data-year` связывает точку на таймлайне и соответствующий ей блок контента
- `data-distance` - расстояние между соседними точками таймлайна. Это разность между датой следующей точки и датой текущей. Они используются для динамической установки расстояния между точками. Это делает следующий JS-код:
```js
const years = document.querySelectorAll(".timeline__point");
for (year of years) {
    year.style.marginRight = `calc(${year.dataset.distance} * var(--unit-size))`;
}
```
Это вообще очень маленький и удаленький код. Здесь расстояние между соседними точками таймлайна устанавливается через css-свойство `margin-right`, вычисляемое динамически с помощью css-функции `calc`. Это расстояние равно произведению значения атрибута `data-distance` на некоторое значение `var(--unit-size)` . 

`--unit-size` - это кастомное css-свойство (некоторые называют это еще css-переменная). В нем мы храним некоторый коэффициент пропорциональности для расчета расстояния между точками таймлайна. Коэффициент подобран ~~методом проб и ошибок~~ эмпирически. Благодаря нему очень удобно делать адаптив таймлайна всего в несколько строк кода:
```css
.timeline {
  --unit-size: 25px;
}
@media (max-width: 560px) {
  .timeline {
    --unit-size: 10px;
  }
}
```
Интерактивность таймлайна работает за счет такого скрипта
```js
const years = document.querySelectorAll(".timeline__point");
for (year of years) {
    year.addEventListener('click', showCurrentYearContent);
}
function showCurrentYearContent(e){
    let year = e.currentTarget.dataset.year;
    document.querySelector('.timeline__point_active').classList.remove('timeline__point_active');
    document.querySelector(".detail__desc_open").classList.remove("detail__desc_open");
    document.querySelector(`.detail__desc[data-year="${year}"]`).classList.add("detail__desc_open");
    e.currentTarget.classList.add('timeline__point_active');
}
```
На каждую точку добавляется обработчик клика. При клике по элементу получаем значение его атрибута `data-year`, выключаем все элементы таймлайна, которые были активны и устанавливаем активными новую кликнутую дату и соответствующий ей блок контента с таким же `data-year`.

Функционал бокового перетаскивание на области таймлайна был добавлен на сайт при помощи JS-библиотеки `dragscroll.js` (https://github.com/asvd/dragscroll). Это очень маленькая и простая в использовании библиотека, освобождающая от заботы писать логику перетаскивания самостоятельно...  Установка описана в документации: чтобы на блоке работало перетаскивание, необходимо:
- подключить скрипт `dragscroll.js` на сайт (скачать и вставить на страницу `<script src="dragscroll.js"></script>` или подключить по ссылке из CDN)
- добавить к блоку класс `dragscroll`
- установить для блока `overflow:hidden`
```html
    <div class="timeline-wrapper dragscroll">
        //timeline dots
    </div>
    <style>
      .dragscroll {
        overflow: hidden;
        cursor: grab;
      }
    </style> 
```

