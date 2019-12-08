#!/bin/bash
VERBOSE=false # show curl command if true
PRETTY=true   # show pretty json if true
COLOR=true    # show colored text if true

source curltool.sh
USERNAME="test"
PASSWORD=`echo "1234" | md5`
USER='{"username":"'$USERNAME'","password":"'$PASSWORD'"}'

echo "Test start at "$(date)
#run METHOD PATH DATA
run POST /users ${USER}               # 가입
run POST /users/token ${USER}         # 로그인(토큰발급)
run GET /users '{"username":"test"}'  # 특정 유저 정보

echo "Succeed:${SUCCESS}, Failed:${FAIL}"
