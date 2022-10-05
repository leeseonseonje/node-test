describe('AsyncTest', () => {

    it('await', async () => {
        await now('1', 1000);
        await now('2', 1000);
        await now('3', 1000);
    });

    it('PromiseAll', async () => {
        await Promise.all([
        now('1', 1000),
        now('2', 1000),
        now('3', 1000),
        ]);
    });

    it('PromiseAllError', async () => {
        await Promise.all([
            now(1, 1000),
            now(2, 100),
            now('3', 2000),
        ]);
    });

    it('PromiseAllSettled', async () => {
        await Promise.allSettled([
            now(1, 1000),
            now(2, 100),
            now('3', 2000),
        ]);
    });
});

async function now(text, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() =>
            typeof text === 'string' ? resolve('true') : reject('false'),
                time
        );
    });
}