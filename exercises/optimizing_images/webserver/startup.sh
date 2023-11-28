pip install -r requirements.txt

cp -r src /app/src
cp -r static /app/static
cd /app

# Setup step -- needs to run once before deployment
python src/setup_script.py;

python src/server.py;
