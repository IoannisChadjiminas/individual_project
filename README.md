# dissertation_imperial
git clone https://github.com/IoannisChadjiminas/dissertation_imperial.git
npm init .
npm install
python3 -m venv myenv
source myenv/bin/activate
pip install -r requirements.txt

// For local deploypment
// don't forget to activate psql! -- or create new psql in a new PC and change the appropriate settings.
./node_modules/.bin/webpack --config webpack.local.config.js
heroku local web

//For heroku production
./node_modules/.bin/webpack --config webpack.local.prod.config
Change settings.py -- DEBUG = False, SECRET_KEY = os.environ()
heroku open
