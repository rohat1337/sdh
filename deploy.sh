#!/usr/bin/env bash

sudo sshpass -p $PASS sudo scp -o StrictHostKeyChecking=no ./build/ /var/www/sirius/
