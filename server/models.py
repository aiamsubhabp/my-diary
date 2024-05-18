from sqlalchemy_serializer import SerializerMixin
from config import db, metadata, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-entries.user', '-_password_hash')

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, unique = True, nullable = False)
    _password_hash = db.Column(db.String)

    entries = db.relationship('Entry', back_populates = 'users')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'User {self.username}, ID: {self.id}'
    
class Entry(db.Model, SerializerMixin):
    __tablename__ = 'entries'

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable = False)
    post = db.Column(db.String, nullable = False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates = 'recipes')

    def __repr__(self):
        return f'<Entry {self.id}: {self.title}'
