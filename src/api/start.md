---
order: 1
title: Быстрый старт
---

# Быстрый старт

Здесь вы сможете найти руководство по stockapi

API поддерживает `GET` и `POST` запросы. Для `POST` запроса необходим `MASTER_KEY`. Но вы этот ключ не получите, так что зачилльтесь

В ответ на любой запрос получаем JSON

[API доступно по ссылке](https://stockapi.netlify.app/api/)

`GET https://stockapi.netlify.app/api/<METHOD>?<PARAMS>`

`POST https://stockapi.netlify.app/api/<METHOD>`

Чтобы совершить `POST` запрос, необходимо указать в `Headers` ключ `master_key`

Также необходимо передать `BODY PARAMS` в формате `x-form-www-urlencoded`
