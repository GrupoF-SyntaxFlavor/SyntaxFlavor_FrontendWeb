# Use the official nginx image as the base image
FROM nginx:alpine

# Copy the contents of the out/ folder to the nginx html directory
COPY ./out/ /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]