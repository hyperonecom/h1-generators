#!/bin/sh
set -eux
python -m pip install -r ../../clients/python/requirements.txt
python -m pip install git+git://github.com/hyperonecom/h1-credentials-helper-python.git

python test.py