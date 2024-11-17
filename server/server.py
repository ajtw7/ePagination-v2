from flask import Flask, jsonify
from flask_cors import CORS # CORS allows us to make requests from the frontend to the backend



# app instance 
app = Flask(__name__) 
CORS(app) # allow CORS on all routes; passing in app instance


# route to home
@app.route("/api/home", methods=["GET"])
def return_home():
    return jsonify({
      "message" : "HELLO WORLD!",
      "status": "success",
        "data": {
            "user": "John Doe",
            "role": "admin"
        }

    })

# route for search results
@app.route("/api/results", methods=["GET"])
def return_results():
    return jsonify({
        "message": "Search results",
        "status": "success",
    })

if __name__ == '__main__':
    app.run(debug=True, port=8080)  # remove if deploying to production





# notes
# 1. command to activate virtual environment: source venv/bin/activate
# 2. command to deactivate virtual environment: deactivate
# 3. command to install flask: pip install flask
# 4. command to install flask-cors: pip install flask-cors
    # port: 5000 has issues with CORS
# 5. command to run the server: python server.py
# 6. command to install requests: pip install requests
# 7. command to install python-dotenv: pip install python-dotenv
