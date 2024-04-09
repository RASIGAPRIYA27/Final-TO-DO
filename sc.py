from flask import Flask, render_template, request
from pymongo import MongoClient

app = Flask(__name__)


# Connect to MongoDB
client = MongoClient("mongodb+srv://rasiga27:rasiammumani272022@cluster0.k3izbfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["SparkCheckDB"]
tasks_collection = db["Tasks"]
notes_collection = db["Notes"]

@app.route('/')
def home():
    return render_template('sparkcheck.html')

@app.route('/save_task', methods=['POST'])
def save_task():
    task_input = request.form.get('task')
    tasks_collection.insert_one({'task': task_input})
    return {'message': 'Task saved successfully'}

@app.route('/save_notes', methods=['POST'])
def save_notes():
    notes_input = request.form.get('notes')
    notes_collection.insert_one({'notes': notes_input})
    return {'message': 'Notes saved successfully'}

if __name__ == '__main__':
    app.run(debug=True)