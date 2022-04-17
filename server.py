from flask import Flask, request
import cv2
import driver

app = Flask(__name__)

# API Route
@app.route("/driver")
def driver():
    return driver()

if __name__ == "__main__":
    app.run(debug=True)

