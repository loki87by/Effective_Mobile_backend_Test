# Effective_Mobile Test tasks for backend vacancy

## Technical description

### _Задание 1_

Нужно реализовать 2 сервиса.

#### Один сервис остатков товаров в магазине

У товара могут быть следующие поля:

- PLU - артикул товара
- Название товара
- Количество товара на полке
- Количество товара в заказе
- Для какого магазина данных остаток

Данные денормализованы, их нужно привести к 2-3 нормальной форме.
Должны быть следующие endpoint:

- Создание товара
- Создание остатка
- Увеличение остатка
- Уменьшение остатка
- Получение остатков по фильтрам
  1 plu
  2 shop_id
  3 количество остатков на полке (с-по)
  4 количество остатков в заказе (с-по)
- Получение товаров по фильтрам
  1 name
  2 plu

#### Другой сервис истории действий с товарами

В сервис “истории действий с товарами” нужно отправлять все события, которые происходят с товарами или остатками. Общение сервисов может происходить любым способом. Сервис “истории действий с товарами или остатками” должен иметь endpoint, который отдаст историю действий с фильтрами по:

- shop_id
- plu
- date (с-по)
- action
  и постраничной навигацией. Фреймворк так же может быть любой, но не nest. Один из сервисов должен быть на JS, для второго можно использовать TS. СУБД - postgresql

### _Задание 2_

Нужно написать сервис, который работает с пользователями. В бд может быть более 1 миллиона пользователей (набить данными бд нужно самостоятельно. Например, написать миграцию, которая это сделает). Каждый пользователь имеет поля:

- Имя
- Фамилия
- Возраст
- Пол
- проблемы: boolean // есть ли проблемы у пользователя

Нужно сделать endpoint, который проставить флаг проблемы у пользователей в false и посчитает, сколько пользователей имело true в этом флаге. **Этот сервис нужно реализовать на nestjs.**
