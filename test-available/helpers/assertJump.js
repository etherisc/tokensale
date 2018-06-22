
/**
 * Check if a "throw" has accurred.
 * @param  {error} error the error to check
 */
function assertJump(error) {

    assert.isAbove(error.message.search('invalid opcode'), -1, 'Invalid opcode error must be returned');

}

module.exports = { assertJump, };
