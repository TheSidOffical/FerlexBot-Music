module.exports = {
    name: 'connectionError',
    execute (queue, error) {
        console.log(`Error emitted from the connection ${error.message}`);
    } 
}