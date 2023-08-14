import bunyan from 'bunyan'

// use CLI > bunyan app.log
const logger = bunyan.createLogger({
    name: "localdex_backend",
    streams: [
        {
            level: "info",  // min level
            path: "app.log",
        },
    ],
});

export default logger