#!/usr/bin/env bash

sshpass -p $PASS sudo scp -o StrictHostKeyChecking=no ./build/ /var/www/sirius/
