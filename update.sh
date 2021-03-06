echo "Updating server..."

set -x

if [ $# -eq 0 ]
  then
    	echo "No arguments supplied!"
	exit
fi

#pm2 stop $1
#git checkout -f config.json
git pull origin
npm install
#npm run startProd
export NODE_ENV=production
#pm2 start $1
pm2 reload $1

echo "Done!"
