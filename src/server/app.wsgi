#! /usr/bin/python3.6
import logging
import sys
import os

os.chdir("/var/www/sirius-backend-v6/")

logging.basicConfig(level=logging.INFO, stream=sys.stderr)
#logging.basicConfig(filename='example.log', encoding='utf-8', level=logging.DEBUG)
logging.info("=============== IN APP.WSGI ================")
logging.info("testing logging.info from var/www/sirius-backend-v6/app.wsgi")
logging.warning("this is a warning from var/www/sirius-backend-v6/app.wsgi")

logging.info(sys.version)
logging.info(sys.version_info)

sys.path.insert(0, '/var/www/sirius-backend-v6/')

# load my app ..
from app import app as application
application.secret_key = 'dave123'
logging.info("================ OUT OF APP.WSGI =================")
