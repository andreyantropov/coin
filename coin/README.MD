## Скрипты проекта

Этот проект использует npm-скрипты для автоматизации различных задач. Вот описание доступных скриптов:

Разработка:

 `dev`: Запускает сервер разработки с использованием webpack. Включает горячую перезагрузку для удобства.
 `build`: Собирает проект в режим production, оптимизированный для производительности.

Тестирование:

 `lint`: Проверяет код в папке `./src/js/` на соответствие стандартам ESLint.
 `test:unit`: Запускает модульные тесты с помощью Jest.
 `test:e2e`: Открывает Cypress для запуска сквозных тестов. Важно: Для корректной работы test:e2e необходимы два аккаунта с id: 
     74213041477477406320783754
     78810415847736171135741812

    На аккаунте 74213041477477406320783754  должна быть сумма не менее 1000.

Дополнительные:

 `fix`: Исправляет найденные ESLint ошибки в папке `./src/js/`.

Использование скриптов:

Чтобы запустить скрипт, введите в консоли команду `npm run <имя_скрипта>`. 

Пример:

`npm run dev` запустит сервер разработки.

В проект были внесены следующие улучшения:

 Адаптивность: Интерфейс проекта теперь адаптивен к различным устройствам, включая мобильные телефоны, планшеты и настольные компьютеры.
 Отображение типа платежной карты:  Реализована функция отображения типа платежной карты (VISA и MASTERCARD)  в проекте. 
 Кэширование:  Реализовано кэширование для списка счетов и меток на карте, что улучшает производительность приложения. 
 Кастомизация перетаскиванием:  Реализована возможность кастомизации элементов интерфейса с помощью перетаскивания.