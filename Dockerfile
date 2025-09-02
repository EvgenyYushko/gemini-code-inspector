# Используем легковесный образ Nginx для продакшена
FROM nginx:alpine

# Удаляем стандартную страницу приветствия Nginx
RUN rm -rf /usr/share/nginx/html/*

# Копируем наш файл конфигурации Nginx в контейнер
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем все файлы нашего приложения (HTML, CSS, JS и т.д.) в папку веб-сервера
COPY . /usr/share/nginx/html

# Открываем порт 80, чтобы можно было обращаться к серверу
EXPOSE 80

# Запускаем Nginx при старте контейнера
CMD ["nginx", "-g", "daemon off;"]
