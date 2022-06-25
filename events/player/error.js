module.exports = {
    name: 'error',
    execute (queue, error) {
        console.log(`Error emitted from the queue ${error.message}`);
    } 
}