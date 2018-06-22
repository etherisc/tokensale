function assertRevert(error) {
    const revertFound = error.message.search('revert') >= 0;
    assert(revertFound, `Expected "revert", got ${error} instead`);
}

module.exports = { assertRevert, };
