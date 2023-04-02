FROM php:8.1.9-fpm

ARG user
ARG uid

RUN apt-get update && apt-get install -y \
        git \
        file \
        libcurl4-gnutls-dev \
        libjpeg62-turbo-dev \
        libfreetype6-dev \
        libonig-dev \
        libgmp-dev \
		libmagickwand-dev \
        libmcrypt-dev\
        libmhash-dev \
        libpng-dev \
        libxml2-dev \
		libzip-dev \
        re2c \
        zlib1g-dev \
        zip \
        curl \
        unzip

# ENV PHP_OPCACHE_VALIDATE_TIMESTAMPS="0" \
#    PHP_OPCACHE_MAX_ACCELERATED_FILES="10000" \
#    PHP_OPCACHE_MEMORY_CONSUMPTION="192" \
#    PHP_OPCACHE_MAX_WASTED_PERCENTAGE="10"

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

#RUN pecl install xdebug
#RUN docker-php-ext-enable xdebug
RUN docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd
# RUN docker-php-ext-install opcache pdo_mysql mbstring exif pcntl bcmath gd
# COPY docker/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

WORKDIR /var/www

USER $user
