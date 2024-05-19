from config import app, db
from models import User, Entry
from random import choice as rc
from faker import Faker

fake = Faker()

if __name__ == "__main__":
	with app.app_context():
		print('Deleting all records...')
		User.query.delete()
		Entry.query.delete()

		print('Creating users...')

		users = []
		usernames = ['Paul', 'Bee', 'Emily', 'Angel']

		for username in usernames:
			user = User(username = username)
			user.password_hash = 'password'
			users.append(user)

		db.session.add_all(users)
		db.session.commit()

		print('Creating entries...')
		entries = []
		for i in range(20):
			post = fake.paragraph(nb_sentences=5)

			entry = Entry(
				title = fake.sentence(),
				post = post
			)

			entry.user = rc(users)
			entries.append(entry)
		
		db.session.add_all(entries)
		db.session.commit()

		print('Seeding complete')

	


