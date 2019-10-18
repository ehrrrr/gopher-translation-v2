const request = require('supertest');
const app = require('../app');

describe('POST /word', function() {
	it('responds with json', function(done) {
		request(app)
			.post('/word')
			.send({ ['english-word']: 'hello' })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				done();
			});
	});
});

describe('POST /sentence', function() {
	it('responds with json', function(done) {
		request(app)
			.post('/sentence')
			.send({ ['english-sentence']: 'Hello world!' })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				done();
			});
	});
});

describe('GET /history', function() {
	it('responds with json', function(done) {
		request(app).get('/history').expect('Content-Type', /json/, done);
	});
});
