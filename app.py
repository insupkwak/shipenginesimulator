from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('test.html')

if __name__ == '__main__':
    try:
        app.run(host='0.0.0.0', debug=False)
    except Exception as e:
        print("An error occurred while running the server:", e)