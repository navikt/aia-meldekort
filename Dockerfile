FROM nginx:1.25-alpine
COPY nginx.conf /etc/nginx/nginx.conf

COPY /dist /usr/share/nginx/html/esm
ADD /dist/.vite /usr/share/nginx/html/esm

ADD /storybook-static /usr/share/nginx/html

EXPOSE 8080
