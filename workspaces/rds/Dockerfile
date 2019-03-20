FROM mariadb:10.3.8

RUN apt-get update && apt-get install locales -y && localedef -i ja_JP -c -f UTF-8 -A /usr/share/locale/locale.alias ja_JP.UTF-8

ENV LANG ja_JP.utf8

ADD ./my.cnf /etc/mysql/my.cnf

RUN chmod 644 /etc/mysql/my.cnf
