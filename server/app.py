from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from models import User, Entry
from config import app, db, api


class Signup(Resource):
	def post(self):
		request_json = request.get_json()

		username = request_json.get('username')
		password = request_json.get('password')

		user = User(
		username = username
		)

		user.password_hash = password
		
		try:
			db.session.add(user)
			db.session.commit()

			session['user_id'] = user.id
			return user.to_dict(), 201
		except IntegrityError:
			return {'error': '422 Unprocessable Entity'}, 422
    
class CheckSession(Resource):
	def get(self):
		if session.get('user_id'):
			user = User.query.filter(User.id == session['user_id']).first()
			return user.to_dict(), 200
		return {'error': '401 Unauthorized'}, 401

class Login(Resource):
	def post(self):
		request_json = request.get_json()

		username = request_json.get('username')
		password = request_json.get('password')

		user = User.query.filter(User.username == username).first()
		if user:
			if user.authenticate(password):
				session['user_id'] = user.id
				return user.to_dict(), 200
		return {'error': '401 Unauthorized'}, 401

class Logout(Resource):
	def delete(self):
		session['user_id'] = None
		return {}, 204
	
class Entries(Resource):
	def get(self):
		user = User.query.filter(User.id == session['user_id']).first()
		return [entry.to_dict() for entry in user.entries], 200
	
	def post(self):
		request_json = request.get_json()

		title = request_json['title']
		post = request_json['post']

		try:
			entry = Entry(
				title = title, 
				post = post,
				user_id = session['user_id']
			)
			db.session.add(entry)
			db.session.commit()
			return entry.to_dict(), 201
		except IntegrityError:
			return {'error': '422 Unprocessable Entity'}, 422

class EntriesById(Resource):
	def get(self, id):
		user = User.query.filter(User.id == session['user_id']).first()
		if user:
			entry = Entry.query.filter((Entry.id == id) & (Entry.user_id == user.id)).first()
			if entry:
				return entry.to_dict(), 200
			else:
				return {'error': '404 Not Found'}, 404
		else:
			return {'error': '401 Unauthorized'}, 401
		
	def patch(self, id):
		user = User.query.filter(User.id == session['user_id']).first()
		if user:
			entry = Entry.query.filter((Entry.id == id) & (Entry.user_id == user.id)).first()
			if not entry:
				return {'error': '404 Not Found'}, 404
			try:
				data = request.get_json()
				protected_attrs = {'id', 'user_id'}
				for attr in data:
					if attr not in protected_attrs:
						setattr(entry, attr, data[attr])
				
				db.session.add(entry)
				db.session.commit()
				return entry.to_dict(), 202
			
			except:
				return 'Failed to update entry', 400
		else:
			return {'error': '401 Unauthorized'}, 401
	
	def delete(self, id):
		user = User.query.filter(User.id == session['user_id']).first()
		if user:
			entry = Entry.query.filter((Entry.id == id) & (Entry.user_id == user.id)).first()
			if not entry:
				return {'error': '404 Not Found'}, 404
			
			db.session.delete(entry)
			db.session.commit()

			return ('Entry sucessfully deleted', 204)

api.add_resource(Signup, '/api/signup')
api.add_resource(CheckSession, '/api/check_session')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(Entries, '/api/entries')
api.add_resource(EntriesById, '/api/entries/<int:id>')


if __name__ == "__main__":
	app.run(port=5555, debug=True)
