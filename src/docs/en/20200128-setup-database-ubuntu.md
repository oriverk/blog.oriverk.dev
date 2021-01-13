---
create: '2020-01-28'
update: '2020-03-17'
author: Kawano Yudai
title: 'Ubuntu: Build Database environment'
tags: [postgresql, mysql]
---

from [Gist: oriverk/InstallDB2Ubuntu.md ](https://gist.github.com/oriverk/aa5ded308dfb5e143e388a74915e2093)

## PostgreSQL

```sh
sudo apt install postgresql libpq-dev

# set postgreSQL
# make admin
sudo -u postgres createuser admin -s
# login postgresql with admin
sudo -u postgres psql
```

```sql
-- in postgresql
\password admin
\q
```

```sh
# login posgresql
rails dbconsole
```

### update psql upto 12.0 for ubuntu18.04
```sh
# add repositry
## make /etc/apt/sources.list.d/pgdg.list
## write repositry
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

## add certification key
sudo apt install curl ca-certificates
curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# update repositry
sudo apt update && sudo apt upgrade

# install
sudo apt install postgresql-12

# confirmation
sudo su - postgres
psql
# -> psql (12.0 (Ubuntu 12.0-2.pgdg18.04+1))
```

## MySQL
```sh
sudo apt -y install mysql-server libmysqlclient-dev
# set password
sudo mysql_secure_installation
```

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'TegetegePassword';
flush privileges;
```

## Heroku
```sh
sudo snap install heroku --classic
heroku login --interactive
```