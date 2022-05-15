#!/bin/bash

mongo_uri=$(cat services/api/.env | grep MONGO_URI | cut -d "=" -f 2)
final_uri=$(echo "$mongo_uri" | cut -d "?" -f 1)
mongo "$final_uri"