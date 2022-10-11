describe('null', () => {

  it('notNull?', async () => {
    const name: string = 'name';
    let result = name ? 'notNull' : 'null';
    expect(result).toBe('notNull');
  });

  it('null?', async () => {
    const name: string = null;
    let result = name ? 'notNull' : 'null';
    expect(result).toBe('null');
  });
});