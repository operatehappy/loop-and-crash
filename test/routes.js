'use strict'

// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should()

chai.use(chaiHttp)

describe('Routes', () => {
  describe('/', () => {
    it('GET / should be HTML', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res)
          res.should.be.html // eslint-disable-line
          res.should.have.status(200)

          done()
        })
    })
  })

  describe('/style.css', () => {
    it('GET /style.css should be CSS', (done) => {
      chai.request(server)
        .get('/style.css')
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res)
          res.should.have.header('content-type', 'text/css; charset=utf-8')
          res.should.have.status(200)

          done()
        })
    })
  })

  // describe('GET /crash', () => {
  //   it('should respond with HTTP Status Code 503', (done) => {
  //     chai.request(server)
  //     .get('/crash')
  //     .end((err, res) => {
  //       res.should.be.text.header('content-type', 'text/plain; charset=utf-8');
  //       res.should.have.status(503);
  //
  //       done();
  //     });
  //   });
  // });

  // TODO: test /endless-loop

  describe('/show-get-params', () => {
    it('GET /show-get-params should have URL Query parameters', (done) => {
      chai.request(server)
        .get('/show-get-params')
        .query({ foo: 'bar' })
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res)
          res.should.have.header('content-type', 'application/json; charset=utf-8')
          res.should.have.status(200)

          done()
        })
    })
  })

  describe('/status-code', () => {
    it('GET /status-code should be HTML', (done) => {
      chai.request(server)
        .get('/status-code')
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res)
          res.should.be.html // eslint-disable-line
          res.should.have.status(200)

          done()
        })
    })

    it('GET /status-code/200 should respond with HTTP Status Code 200', (done) => {
      chai.request(server)
        .get('/status-code/200')
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res)
          res.should.have.header('content-type', 'text/plain; charset=utf-8')
          res.should.have.status(200)

          done()
        })
    })

    it('GET /status-code/400 should respond with HTTP Status Code 500', (done) => {
      chai.request(server)
        .get('/status-code/500')
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res)
          res.should.have.header('content-type', 'text/plain; charset=utf-8')
          res.should.have.status(500)

          done()
        })
    })

    it('GET /status-code/500 should respond with HTTP Status Code 400', (done) => {
      chai.request(server)
        .get('/status-code/400')
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res)
          res.should.have.header('content-type', 'text/plain; charset=utf-8')
          res.should.have.status(400)

          done()
        })
    })
  })

  describe('/delay', () => {
    it('GET /delay should be HTML', (done) => {
      chai.request(server)
        .get('/delay')
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res)
          res.should.be.html // eslint-disable-line
          res.should.have.status(200)

          done()
        })
    })

    it('GET /delay/1 should be plain-text', (done) => {
      chai.request(server)
        .get('/delay/1')
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res)
          res.should.have.header('content-type', 'text/plain; charset=utf-8')
          res.should.have.status(200)

          done()
        })
    })
  })

  describe('/info', () => {
    it('GET /info should be JSON', (done) => {
      chai.request(server)
        .get('/info')
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res)
          res.should.have.header('content-type', 'application/json; charset=utf-8')
          res.should.have.status(200)
          res.body.should.exist // eslint-disable-line

          done()
        })
    })

    it('GET /info?interfaces=1 should include network interface(s) information', (done) => {
      chai.request(server)
        .get('/info')
        .query({ interfaces: 1 })
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res)
          res.should.have.header('content-type', 'application/json; charset=utf-8')
          res.should.have.status(200)
          res.body.network.should.exist // eslint-disable-line
          res.body.network.interfaces.should.exist // eslint-disable-line

          done()
        })
    })

    it('GET /info?environment=1 should include environment information', (done) => {
      chai.request(server)
        .get('/info')
        .query({ environment: 1 })
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res)
          res.should.have.header('content-type', 'application/json; charset=utf-8')
          res.should.have.status(200)
          res.body.environment.should.exist // eslint-disable-line

          done()
        })
    })
  })
})
