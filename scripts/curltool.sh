#!/bin/bash
BASEURL="http://127.0.0.1:8080"
PRETTY_CMD='python -m json.tool'
FAIL=0
SUCCESS=0

if [[ $COLOR == 'true' ]]; then
    DEFAULT="\033[39m"
    CYAN="\033[35m"
    RED="\033[31m"
    GREEN="\033[32m"
fi

function run {
    local METHOD="$1"
    local PATHNAME="$2"
    local DATA="$3"
    local TOK=
    if [ $PATHNAME == /users/token ]; then
        RESULT="$(curl -X "${METHOD}" -d ${DATA} -H 'Content-Type:application/json'$TOK ${BASEURL}${PATHNAME} 2>/dev/null | tee /tmp/jwttoken.tmp)"
        TOKEN="$(cat /tmp/jwttoken.tmp | cut -d '"' -f 10)"
    else
        if [[ -z $TOKEN ]]; then
            TOK=""
        else
            TOK=" -H 'Authorization: Bearer "$TOKEN"'"
        fi
        RESULT="$(curl -X "${METHOD}" -d ${DATA} -H 'Content-Type:application/json' ${TOK} ${BASEURL}${PATHNAME} 2>/dev/null)"
    fi

    echo -e "${CYAN}${METHOD} ${PATHNAME} ${DATA}${DEFAULT}"
    if [[ $VERBOSE == 'true' ]]; then
        local CMD="curl -X "${METHOD}" -d ${DATA} -H 'Content-Type:application/json'$TOK ${BASEURL}${PATHNAME}"
        echo ${CMD}
    fi

    if [[ $RESULT == '{"code":0'* ]]; then
        SUCCESS=`expr $SUCCESS + 1`
        #echo -e "\033[32m${RESULT}\033[39m" | python -m json.tool
        if [[ $PRETTY == 'true' ]]; then
            echo -e "${GREEN}$(echo -e ${RESULT} | $PRETTY_CMD)${DEFAULT}"
        else 
            echo -e "${GREEN}$(echo -e ${RESULT})${DEFAULT}"
        fi
    else
        FAIL=`expr $FAIL + 1`
        #echo -e "\033[31m${RESULT}\033[39m" | python -m json.tool
        if [[ $PRETTY == 'true' ]]; then
            echo -e "${RED}$(echo -e ${RESULT} | $PRETTY_CMD)${DEFAULT}"
        else 
            echo -e "${RED}$(echo -e ${RESULT})${DEFAULT}"
        fi
    fi
    echo
}

# example
#run POST /users {"username":"test1","password":"1234"}
