module.exports = {
    devServer: {
        port: 8100,
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                ws: true,
                changeOrigin: true,
            },
        },
    },

    transpileDependencies: [
      'vuetify'
    ]
};
