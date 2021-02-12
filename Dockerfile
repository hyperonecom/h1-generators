FROM node:14
RUN apt-get update && apt-get install -y default-jre \
    build-essential checkinstall libreadline-gplv2-dev \
    libncursesw5-dev libssl-dev libsqlite3-dev tk-dev \
    libgdbm-dev libc6-dev libbz2-dev libffi-dev zlib1g-dev \
    cd /opt && \
    wget https://www.python.org/ftp/python/3.8.7/Python-3.8.7.tgz && \
    tar xzf Python-3.8.7.tgz && \
    cd /opt/Python-3.8.7 && \
    ./configure --enable-optimizations && \
    make altinstall && \
    rm -r /opt/Python-3.8.7 \
    rm /usr/bin/python && \
    ls -lah /usr/bin/python* && \
    ln -s $(which python3.8) /usr/bin/python
# TODO: make golang works
ENTRYPOINT ["/bin/bash", "-c"]
WORKDIR /src
CMD ["yarn start ts && yarn start python"]