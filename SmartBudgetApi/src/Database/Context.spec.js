import Context from './Context';
import User from './Schemes/UserScheme';

let context;
const oauthId = 'FAKE-OAUTH-ID';
const uri = process.env.DATABASE_URI;

describe('data-storage-api context', function() {
    before(() => {
        context = new Context({
            uri,
            schemes: {
                User
            }
        });
    });

    after(() => {
        context.close((err) => {
            if (err) {
                console.error('Error trying to close connection!', err);
                return;
            }
            console.log('Context connection closed successfully!');
        });
    });

    this.timeout(10000);

    const email = 'daniloster@gmail.com';
    const password = 'secret';

    describe('promise', () => {
        it('should have the common promise as promise', () => {
            const query = context.User.findOne({ email });
            expect(query.exec().constructor).to.equal(Promise);
        });
    });



    describe('find', () => {
        it('should return 1 for find with restriction', (done) => {
            context.User.findOne({ email: 'test1@mgail.com' })
                .then((data) => {
                    expect(data.name).to.equal('Danilo Castro');
                    done();
                })
                .catch((err) => {
                    expect(err).to.not.be.defined;
                    done();
                });
        });

        it('should return 1 for find with restriction', (done) => {
            context.User.find({ email: 'test1@mgail.com' })
                .then((data) => {
                    expect(data.length).to.equal(1);
                    done();
                })
                .catch((err) => {
                    expect(err).to.not.be.defined;
                    done();
                });
        });

        it('should return 2 for find', (done) => {
            context.User.find()
                .then((data) => {
                    expect(data.length).to.equal(2);
                    done();
                })
                .catch((err) => {
                    expect(err).to.not.be.defined;
                    done();
                });
        });
    });

    describe('saving', () => {
        it('Creating a user', (done) => {
            const user = context.User.$parse({
                name: 'Danilo',
                shortname: 'Dan',
                email,
                birthday: new Date(1984, 2, 5, 6, 33, 12),
                oauthId,
                roles: ['read', 'admin'],
                password
            });
            user.save().then((savedUser) => {
                expect(savedUser.id).to.be.defined;
                const passwordLength = '$2a$10$bu69sHnqbSjyx1qPaERJJukV6U0PNJ5lFduLXSwUr8mDeKuaQTCbm'.length;
                expect(savedUser.password.length).to.equal(passwordLength);
                done();
            }).catch((err) => {
                expect(err).to.not.be.defined;
                done();
            });
        });
    });

    describe('authentication', () => {
        it('should authenticate the user correctly', (done) => {
            const user = context.User.$parse({
                name: 'Danilo',
                shortname: 'Dan',
                email,
                birthday: new Date(1984, 2, 5, 6, 33, 12),
                oauthId,
                roles: ['read', 'admin'],
                password
            });
            user.save().then(() => {
                context.User.getAuthenticated(email, password)
                    .then((authenticatedUser) => {
                        expect(authenticatedUser.id).to.be.defined;
                        done();
                    })
                    .catch((error) => {
                        expect(err).to.not.be.defined;
                        done();
                    });
            }).catch((err) => {
                expect(err).to.not.be.defined;
                done();
            });
        });

        it('should block user after five incorrect authetication attempts', (done) => {
            const customEmail = 'daniloster+1@gmail.com';
            const UserModel = context.User;
            const user = UserModel.$parse({
                name: 'Danilo',
                shortname: 'Dan',
                email: customEmail,
                birthday: new Date(1984, 2, 5, 6, 33, 12),
                oauthId,
                roles: ['read', 'admin'],
                password
            });
            user.save().then((savedUser) => {
                UserModel.getAuthenticated(customEmail, '1fgd').catch(() => {
                    UserModel.getAuthenticated(customEmail, '1wedf').catch(() => {
                        UserModel.getAuthenticated(customEmail, '1dsfv').catch(() => {
                            UserModel.getAuthenticated(customEmail, '1fgfud').catch(() => {
                                UserModel.getAuthenticated(customEmail, '1sda').catch((err) => {
                                    expect(err.error.reason).to.equal(
                                        UserModel.FailedLogin.MAX_ATTEMPTS
                                    );
                                    done();
                                });
                            });
                        });
                    });
                });
            }).catch((err) => {
                expect(err).to.not.be.defined;
                done();
            });
        });
    });
});
