#! /bin/bash
SESSION=devkiwi
OLD_TMUX_SESSION=`ps -ef | grep tmux | grep $SESSION | head -n 1 | cut -d'-' -f 4 | cut -d' ' -f 2`

if [ "$OLD_TMUX_SESSION" = "$SESSION" ]; then
	tmux a
	exit 0
fi
tmux new-session -d -s $SESSION

tmux new-window -t $SESSION:1 -n "mongodb"
tmux send-keys  -t $SESSION:1 "mongod --config /usr/local/etc/mongod.conf" ENTER

tmux new-window -t $SESSION:2 -n "redis"
tmux send-keys  -t $SESSION:2 "redis-server" ENTER

tmux new-window -t $SESSION:3 -n "kiwi"
tmux selectp -t 0
tmux splitw -h -p 60
tmux selectp -t 0
tmux splitw -v -p 50
tmux selectp -t 0
tmux send-keys  -t $SESSION:3 "export KIWI_DEVELOPMENT=true" ENTER
tmux send-keys  -t $SESSION:3 "node ../app.js" ENTER
tmux selectp -t 1
tmux send-keys  -t $SESSION:3 "tail -f ../access.log" ENTER
tmux selectp -t 2
tmux send-keys  -t $SESSION:3 "./dummy_client.sh"

tmux select-window -t $SESSION:3

tmux -2 attach-session -t $SESSION
