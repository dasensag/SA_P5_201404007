const request =  require('supertest')
const server =  require('../app')
describe('Post endpoints', () => {
    it('Post', async (done) => {
        const res =  await  request(server)
        .post('/order');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('order_id');
        done();
    })
})
afterAll(async  done  => {
    // close server conection
    server.close();
    done();
});